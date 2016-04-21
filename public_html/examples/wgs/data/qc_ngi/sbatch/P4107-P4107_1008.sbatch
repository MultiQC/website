#!/bin/bash -l

#SBATCH -A a2014205
#SBATCH -p core
#SBATCH -n 16
#SBATCH -t 1-00:00:00
#SBATCH -J qc_P4107-P4107_1008
#SBATCH -o /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/qc_ngi/logs/P4107-P4107_1008_sbatch.out
#SBATCH -e /proj/a2014205/nobackup/NGI/analysis_ready/ANALYSIS/P4107/qc_ngi/logs/P4107-P4107_1008_sbatch.err

#SBATCH --qos seqver


echo -ne '\n\nExecuting command lines at '
date
# Run the actual commands
echo -ne '\n\nFinished execution at '
date