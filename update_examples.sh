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
    zip -r multiqc_report.zip multiqc_report.html multiqc_data
    rm -r data/ multiqc_data/
    cd ../
done

echo "--------------------------------------------------"
echo "Creating report for ngi-rna"
echo "--------------------------------------------------"
cd ngi-rna
rm -rf *multiqc_report.html multiqc_report.zip *multiqc_data
unzip -q data.zip
multiqc . --test-db ngi_db_data.json
# plugin changed the name of the report, don't want to break links
mv test_ngi_project_pipeline_multiqc_report.html test_ngi_project_multiqc_report.html
zip -r multiqc_report.zip *multiqc_report.html *multiqc_data
rm -r data/ test_ngi_project_multiqc_data/
cd ../

echo "--------------------------------------------------"
echo "Opening completed reports"
echo "--------------------------------------------------"
cd jupyter
rm -rf *multiqc_report.html multiqc_report.zip *multiqc_report_data
unzip -q data.zip
jupyter execute notebook.ipynb
jupyter nbconvert --to html notebook.ipynb
zip -r multiqc_report.zip *notebook.html multiqc_report.html *multiqc_report_data
rm -r data/ multiqc_report_data/
cd ../

open */*multiqc_report.html
