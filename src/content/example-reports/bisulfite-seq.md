---
title: Bisulfite Seq
description: MultiQC report from an analysis of DNA methylation using bisulfite sequencing.
type: Analysis Types
embed: /examples/bs-seq/multiqc_report.html
zip: /examples/bs-seq/multiqc_report.zip
data: /examples/bs-seq/data.zip
---

The example methylation report is based on analysis of data from the GEO NCBI project [GSE47966](http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE47966), from the 2013 Lister _et. al._ paper _Global epigenomic reconfiguration during mammalian brain development_.

Raw data was run through [FastQC](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/) and trimmed using [Trim Galore!](http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/) (a wrapper around [Cutadapt](https://github.com/marcelm/cutadapt)). Reads were aligned, deduplicated and cytosine methylation statuses called using [Bismark](http://www.bioinformatics.babraham.ac.uk/projects/bismark/).

You can download this report and / or the logs used to generate it, to try running MultiQC yourself:
