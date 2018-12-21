#!/usr/bin/env bash

declare -a dirs=("bs-seq" "hi-c" "rna-seq" "wgs")

for i in "${dirs[@]}"; do
    cd $i
    rm -rf multiqc_report.html multiqc_report.zip multiqc_data
    multiqc . --disable-ngi
    zip -r multiqc_report.zip multiqc_report.html multiqc_data
    cd ../
done

cd ngi-rna
rm -rf *multiqc_report.html multiqc_report.zip *multiqc_data
multiqc . --test-db ngi_db_data.json
zip -r multiqc_report.zip *multiqc_report.html *multiqc_data
cd ../

open */*multiqc_report.html
