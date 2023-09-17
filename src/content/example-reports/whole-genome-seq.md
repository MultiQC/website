---
title: Whole-Genome Seq
description: The data from this report comes from an analysis of HapMap trio samples, run by the National Genomics Infrastructre (NGI) at SciLifeLab, Sweden.
type: Analysis Types
embed: /examples/wgs/multiqc_report.html
zip: /examples/wgs/multiqc_report.zip
data: /examples/wgs/data.zip
---

The data from this report comes from an analysis of HapMap trio samples, run by the [National Genomics Infrastructre](https://www.scilifelab.se/platforms/ngi/) (NGI) at SciLifeLab, Sweden. Initial quality control was done using [FastQC](http://www.bioinformatics.babraham.ac.uk/projects/fastqc/) and [FastQ Screen](http://www.bioinformatics.babraham.ac.uk/projects/fastq_screen/). Reads were processed with [GATK](https://www.broadinstitute.org/gatk/) and the aligned reads analysed using [Picard](http://broadinstitute.github.io/picard/). Downstream QC was done using [Qualimap BamQC](http://qualimap.bioinfo.cipf.es/) and [SnpEff](http://snpeff.sourceforge.net/).

You can download this report and / or the logs used to generate it, to try running MultiQC yourself. Note that the example report has some user-specific config settings, seen in the [multiqc_config.yaml](/examples/wgs/multiqc_config.yaml) file.
