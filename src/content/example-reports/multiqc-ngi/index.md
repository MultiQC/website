---
title: MultiQC_NGI
description: This MultiQC report was generated in combination with the MultiQC_NGI plugin.
embed: /examples/ngi-rna/Test_NGI_Project_multiqc_report.html
zip: /examples/ngi-rna/multiqc_report.zip
data: /examples/ngi-rna/data.zip
---
This MultiQC report was generated in combination with the [MultiQC_NGI](https://github.com/ewels/MultiQC_NGI) plugin. This plugin adds a few new functionalities to MultiQC which are specific to the [SciLifeLab National Genomics Infrastruture](https://www.scilifelab.se/platforms/ngi/). A new report template (**ngi**) styles reports with our logo. A new module (**NGI-RNAseq**) adds sample similarity plots generated from custom code in our [RNA pipeline](https://github.com/SciLifeLab/NGI-RNAseq). It also loads intersting data fields from our LIMS (eg. RIN score) and puts these into the report. Finally, it saves the parsed biofinformatics summary results back in the LIMS for multi-project meta analyses.

You can download this report and / or the logs used to generate it, to try running MultiQC yourself. The [MultiQC_NGI](https://github.com/ewels/MultiQC_NGI) package must be installed. Note that the example report has some user-specific config settings, seen in the [multiqc_config.yaml](/examples/ngi-rna/multiqc_config.yaml) file. It can also be run with the **--test-db** parameter, using [the example data provided](/examples/ngi-rna/ngi_db_data.json).
