#!/usr/bin/env bash

declare -a dirs=("bs-seq" "hi-c" "rna-seq" "wgs")

for i in "public/examples/${dirs[@]}"; do
    echo "--------------------------------------------------"
    echo "Creating report for $i"
    echo "--------------------------------------------------"
    cd $i
    rm -rf multiqc_report.html multiqc_report.zip multiqc_data
    unzip data.zip
    multiqc . --disable-ngi -t default
    zip -r multiqc_report.zip multiqc_report.html multiqc_data
    rm -r data/ multiqc_data/ __MACOSX/
    cd ../
done

echo "--------------------------------------------------"
echo "Creating report for ngi-rna"
echo "--------------------------------------------------"
cd ngi-rna
rm -rf *multiqc_report.html multiqc_report.zip *multiqc_data
unzip data.zip
multiqc . --test-db ngi_db_data.json
zip -r multiqc_report.zip *multiqc_report.html *multiqc_data
rm -r data/ Test_NGI_Project_multiqc_data/ __MACOSX/
cd ../

echo "--------------------------------------------------"
echo "Opening completed reports"
echo "--------------------------------------------------"
open */*multiqc_report.html
