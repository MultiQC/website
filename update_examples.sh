#!/usr/bin/env bash

declare -a dirs=("bs-seq" "hi-c" "rna-seq" "wgs")

for i in "public/examples/${dirs[@]}"; do
    echo "--------------------------------------------------"
    echo "Creating report for $i"
    echo "--------------------------------------------------"
    cd $i
    rm -rf multiqc_report.html multiqc_report.zip multiqc_data
    unzip -q data.zip
    multiqc . --disable-ngi -t default
    zip -q -r multiqc_report.zip multiqc_report.html multiqc_data
    rm -r data/ multiqc_data/
    cd ../
done
cd ../../

echo "--------------------------------------------------"
echo "Creating report for ngi-rna"
echo "--------------------------------------------------"
cd public/examples/ngi-rna
rm -rf *multiqc_report.html multiqc_report.zip *multiqc_data
unzip -q data.zip
multiqc . --test-db ngi_db_data.json
# plugin changed the name of the report, don't want to break links
mv P1234-test_ngi_project_multiqc_report.html test_ngi_project_multiqc_report.html
zip -q -r multiqc_report.zip *multiqc_report.html *multiqc_report_data
rm -r data/ *multiqc_report_data
cd ../

echo "--------------------------------------------------"
echo "Creating Jupyter example"
echo "--------------------------------------------------"
cd jupyter
rm -rf multiqc_report.zip multiqc_report.html multiqc_report_data
# Get the notebook from a separate repo
wget https://github.com/MultiQC/example-notebook/raw/master/multiqc_example.ipynb -O notebook.ipynb
# Hack the notebook a bit:
# 1. We don't need to re-install MultiQC as it's in our environment
sed -i '' 's/\%pip install/\# \%pip install/g' notebook.ipynb  # remove the pip install command
sed -i '' 's/\%reset/\# \%reset/g' notebook.ipynb  # remove the kernel restart command
# 2. GitHub doesn't render interactive plots, but the website does
sed -i '' 's/, flat=True//g' notebook.ipynb  # remove the flat=True parameters
sed -i '' 's/(flat=True)/()/g' notebook.ipynb  # remove the flat=True parameters
sed -i '' '/The rendered plot is a static image/d' notebook.ipynb  # remove the explanation about flat=True
unzip -q data.zip
jupyter execute notebook.ipynb --inplace  # Run the notebook
sed -i '' 's/\# \%pip install/\%pip install/g' notebook.ipynb  # remove the pip install command
sed -i '' 's/\# \%reset/\%reset/g' notebook.ipynb  # remove the kernel restart command
jupyter nbconvert --to html notebook.ipynb  # Convert it to HTML
zip -q -r multiqc_report.zip notebook.ipynb multiqc_report.html multiqc_report_data
rm -r data/ multiqc_report_data/ notebook.ipynb gc_content.*
cd ../

echo "--------------------------------------------------"
echo "Opening completed reports"
echo "--------------------------------------------------"
open */*multiqc_report.html
cd ../../
