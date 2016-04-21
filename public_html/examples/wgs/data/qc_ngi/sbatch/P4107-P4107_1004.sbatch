#!/bin/bash -l

#SBATCH -A a2014205
#SBATCH -p core
#SBATCH -n 16
#SBATCH -t 1-00:00:00
#SBATCH -J qc_P4107-P4107_1004
#SBATCH -o /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/qc_ngi/logs/P4107-P4107_1004_sbatch.out
#SBATCH -e /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/qc_ngi/logs/P4107-P4107_1004_sbatch.err

#SBATCH --qos seqver


echo -ne '\n\nExecuting command lines at '
date
# Run the actual commands
module load bioinfo-tools
module load FastQC
fastqc -t 16 -o /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/qc_ngi/P4107_1004/fastqc /proj/a2014205/nobackup/NGI/analysis_ready/DATA/P4107/P4107_1004/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1004_S4_L005_R1_001.fastq.gz /proj/a2014205/nobackup/NGI/analysis_ready/DATA/P4107/P4107_1004/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1004_S4_L005_R2_001.fastq.gz
module load bioinfo-tools
module load bowtie2
module load fastq_screen
fastq_screen --aligner bowtie2 --outdir /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/qc_ngi/P4107_1004/fastq_screen --subset 200000 --threads 1 --conf /proj/a2014205/ngi_resources/fastq_screen.nestor.conf --paired /proj/a2014205/nobackup/NGI/analysis_ready/DATA/P4107/P4107_1004/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1004_S4_L005_R1_001.fastq.gz /proj/a2014205/nobackup/NGI/analysis_ready/DATA/P4107/P4107_1004/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1004_S4_L005_R2_001.fastq.gz
echo -ne '\n\nFinished execution at '
date