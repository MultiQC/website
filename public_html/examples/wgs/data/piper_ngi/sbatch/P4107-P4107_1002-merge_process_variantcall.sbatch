#!/bin/bash -l

#SBATCH -A a2014205
#SBATCH -p core
#SBATCH -n 16
#SBATCH -t 7-00:00:00
#SBATCH -J piper_P4107-P4107_1002-merge_process_variantcall
#SBATCH -o /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/logs/P4107-P4107_1002-merge_process_variantcall_sbatch.out
#SBATCH -e /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/logs/P4107-P4107_1002-merge_process_variantcall_sbatch.err

#SBATCH --qos seqver



# Load required modules for Piper
module load java/sun_jdk1.7.0_25
module load R/2.15.0
echo -ne '\n\nCopying fastq files at '
date
mkdir -p $SNIC_TMP/DATA/P4107/P4107_1002/A/160217_ST-E00201_0063_AHJHNYCCXX
rsync -rptoDLv /proj/a2014205/nobackup/NGI/analysis_ready/DATA/P4107/P4107_1002/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1002_S2_L003_R1_001.fastq.gz $SNIC_TMP/DATA/P4107/P4107_1002/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1002_S2_L003_R1_001.fastq.gz
rsync -rptoDLv /proj/a2014205/nobackup/NGI/analysis_ready/DATA/P4107/P4107_1002/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1002_S2_L003_R2_001.fastq.gz $SNIC_TMP/DATA/P4107/P4107_1002/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1002_S2_L003_R2_001.fastq.gz
echo -ne '\n\nExecuting command lines at '
date
# Run the actual commands
setupFileCreator --output /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/setup_xml_files/C.Natanaelsson_16_01-P4107_1002-merge_process_variantcall-setup.xml --project_name P4107 --sequencing_platform Illumina --sequencing_center NGI-S --uppnex_project_id a2014205 --reference /proj/a2014205/piper_references/gatk_bundle/2.8/b37/human_g1k_v37.fasta --qos seqver --input_fastq $SNIC_TMP/DATA/P4107/P4107_1002/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1002_S2_L003_R1_001.fastq.gz --input_fastq $SNIC_TMP/DATA/P4107/P4107_1002/A/160217_ST-E00201_0063_AHJHNYCCXX/P4107_1002_S2_L003_R2_001.fastq.gz
piper -S /proj/a2014205/software/piper/qscripts/DNABestPracticeVariantCalling.scala --xml_input /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/setup_xml_files/C.Natanaelsson_16_01-P4107_1002-merge_process_variantcall-setup.xml --global_config /proj/a2014205/software/piper_bin/workflows/uppmax_global_config.xml --number_of_threads 16 --scatter_gather 1 --job_scatter_gather_directory $SNIC_TMP/scatter_gather -jobRunner Shell --job_walltime 345600 --disableJobReport -run --output_directory $SNIC_TMP/ANALYSIS/P4107/piper_ngi --variant_calling --analyze_separately --retry_failed 2 --keep_pre_bqsr_bam

PIPER_RETURN_CODE=$?
echo -ne '\n\nCopying back the resulting analysis files at '
date
mkdir -p /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/
rsync -rptoDLv $SNIC_TMP/ANALYSIS/P4107/piper_ngi// /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi//

RSYNC_RETURN_CODE=$?
if [[ $RSYNC_RETURN_CODE == 0 ]]
then
  if [[ $PIPER_RETURN_CODE == 0 ]]
  then
    echo '0'> /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/logs/P4107-P4107_1002-merge_process_variantcall.exit
  else
    echo '1'> /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/logs/P4107-P4107_1002-merge_process_variantcall.exit
  fi
else
  echo '2'> /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/piper_ngi/logs/P4107-P4107_1002-merge_process_variantcall.exit
fi