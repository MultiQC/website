---
title: RNA-Seq
description: This report was generated using logs from an analysis accidentally run on ChIP-Seq data from the BI Human Reference Epigenome Mapping Project.
type: Analysis Types
embed: /examples/rna-seq/multiqc_report.html
zip: /examples/rna-seq/multiqc_report.zip
data: /examples/rna-seq/data.zip
---

This report was generated using logs from an analysis accidentally run on ChIP-Seq data from the BI Human Reference Epigenome Mapping Project: ChIP-Seq in human subject dataset ([SRP001534](http://trace.ncbi.nlm.nih.gov/Traces/sra/?study=SRP001534)).

Initial QC was done using [FastQC](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/), followed by trimming with [TrimGalore](http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/)! (a wrapper around [cutadapt](https://github.com/marcelm/cutadapt)). Reads were aligned using [STAR](https://github.com/alexdobin/STAR) and overlaps counted with [featureCounts](http://bioinf.wehi.edu.au/featureCounts/).

You can download this report and / or the logs used to generate it, to try running MultiQC yourself.
