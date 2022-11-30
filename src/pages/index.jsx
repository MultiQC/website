import React, { useState } from 'react';

import {
  Accordion,
  Button,
  GitHubIcon,
  Link,
} from 'website-components';

import Seo from '../components/Seo';
import Tabs from '../components/Tabs';
import YoutubeIframe from '../components/YoutubeIframe';

const HomePage = ({ location }) => {
  const [videoLanguage, setVideoLanguage] = useState('en');
  const [videoEng, setVideoEng] = useState(0);
  const [videoEsp, setVideoEsp] = useState(0);

  return (
    <>
      <Seo
        title="MultiQC"
      />
      <div className="relative bg-gray-800 text-white py-16 md:py-24">
        <div className="container-lg">
          <div className="row">
            <div className="col-full lg:col-8">
              <h1 className="typo-h4 mb-4">
                Aggregate results from bioinformatics analyses across many samples into a single report
              </h1>
              <p className="typo-blockquote">
                MultiQC searches a given directory for analysis logs and compiles a HTML report. It's a general use
                tool, perfect for summarising the output from numerous bioinformatics tools.
              </p>
              <div className="row mt-8">
                <div className="col-full lg:col-6 hidden lg:block">
                  {videoLanguage === 'en' && (
                    <>
                      {videoEng === 0 && (
                        <YoutubeIframe id="BbScv9TcaMg" />
                      )}
                      {videoEng === 1 && (
                        <YoutubeIframe id="Gg5neIPuiVo" />
                      )}
                      {videoEng === 2 && (
                        <YoutubeIframe id="cktKbESOOno" />
                      )}
                      {videoEng === 3 && (
                        <YoutubeIframe id="qPbIlO_KWN0" />
                      )}
                    </>
                  )}
                  {videoLanguage === 'es' && (
                    <>
                      {videoEsp === 0 && (
                        <YoutubeIframe id="WX_qVhJ32g0" />
                      )}
                      {videoEsp === 1 && (
                        <YoutubeIframe id="E_NJCxwXAGQ" />
                      )}
                      {videoEsp === 2 && (
                        <YoutubeIframe id="0MfW7Y8Ocak" />
                      )}
                    </>
                  )}
                </div>
                <div className="col-full lg:col-6">
                  <Tabs current={videoLanguage} setCurrent={setVideoLanguage}>
                    <Tabs.Item index="en">
                      English 🇬🇧
                    </Tabs.Item>
                    <Tabs.Item index="es">
                      Español 🇪🇸
                    </Tabs.Item>
                  </Tabs>
                  <div className="mt-4">
                    {videoLanguage === 'en' && (
                      <Tabs current={videoEng} setCurrent={setVideoEng} vertical>
                        <Tabs.Item index={0}>
                          Introduction to MultiQC (1:19)
                        </Tabs.Item>
                        <Tabs.Item index={1}>
                          Installing MultiQC (4:33)
                        </Tabs.Item>
                        <Tabs.Item index={2}>
                          Running MultiQC (5:21)
                        </Tabs.Item>
                        <Tabs.Item index={3}>
                          Using MultiQC Reports (6:06)
                        </Tabs.Item>
                      </Tabs>
                    )}
                    {videoLanguage === 'es' && (
                      <Tabs current={videoEsp} setCurrent={setVideoEsp} vertical>
                        <Tabs.Item index={0}>
                          Introducción a MultiQC (1:43)
                        </Tabs.Item>
                        <Tabs.Item index={1}>
                          Instalación de MultiQC (4:19)
                        </Tabs.Item>
                        <Tabs.Item index={2}>
                          ¿Cómo ejecutar MultiQC? (5:53)
                        </Tabs.Item>
                      </Tabs>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-full lg:col-4 mt-4 lg:mt-0">
              <Button to="https://www.github.com/ewels/MultiQC" variant="primary" size="md" className="w-full">
                <GitHubIcon className="h-6 w-6 mr-4" />
                GitHub
              </Button>
              <div className="mt-4">
                <Button to="https://pypi.org/project/multiqc/" variant="primary" size="md" className="w-full">
                  Python Package Index
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/docs/" variant="primary" size="md" className="w-full">
                  Documentation
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#supported-tools" variant="primary" size="md" className="w-full">
                  114 supported tools
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#publication" variant="primary" size="md" className="w-full">
                  Publication / citation
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#publication" variant="primary" size="md" className="w-full">
                  Get help on Gitter
                </Button>
              </div>
              <div className="mt-4">
                <Button to="/#publication" variant="primary" size="md" className="w-full">
                  Quick install
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-lg py-20">
        <div className="row">
          <div className="col-full">
            <h2 className="typo-h3">Example reports</h2>
            <div className="mt-8">
              <Accordion>
                <Accordion.Item
                  className="border border-gray-800"
                  iconClassName="text-blue-600"
                >
                  <Accordion.Summary>
                    <span className="typo-intro">
                      RNA-Seq
                    </span>
                  </Accordion.Summary>
                  <Accordion.Detail>
                    <p className="typo-body mb-4">
                      This report was generated using logs from an analysis accidentally run on ChIP-Seq data from the BI
                      Human Reference Epigenome Mapping Project: ChIP-Seq in human subject dataset (
                      <Link to="http://trace.ncbi.nlm.nih.gov/Traces/sra/?study=SRP001534" className="text-blue-600">
                        SRP001534
                      </Link>
                      ).
                    </p>
                    <p className="typo-body mb-4">
                      Initial QC was done using
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" className="text-blue-600">
                        FastQC
                      </Link>
                      , followed by trimming with
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/" className="text-blue-600">
                        TrimGalore!
                      </Link>
                      {' '}
                      (a wrapper around
                      {' '}
                      <Link to="https://github.com/marcelm/cutadapt" className="text-blue-600">
                        cutadapt
                      </Link>
                      ). Reads were aligned using
                      {' '}
                      <Link to="https://github.com/alexdobin/STAR" className="text-blue-600">
                        STAR
                      </Link>
                      {' '}
                      and overlaps counted with
                      {' '}
                      <Link to="http://bioinf.wehi.edu.au/featureCounts/" className="text-blue-600">
                        featureCounts
                      </Link>
                      .
                    </p>
                    <p className="typo-body mb-4">
                      You can download this report and / or the logs used to generate it, to try running MultiQC yourself.
                    </p>
                    <Button to="/" variant="secondary" size="sm" className="mr-4">
                      Download report
                    </Button>
                    <Button to="/" variant="secondary" size="sm">
                      Download logs
                    </Button>
                  </Accordion.Detail>
                </Accordion.Item>
                <Accordion.Item
                  className="border border-gray-800"
                  iconClassName="text-blue-600"
                >
                  <Accordion.Summary>
                    <span className="typo-intro">
                      Whole-Genome Sequencing
                    </span>
                  </Accordion.Summary>
                  <Accordion.Detail>
                    <p className="typo-body mb-4">
                      The data from this report comes from an analysis of HapMap trio samples, run by the
                      {' '}
                      <Link to="https://www.scilifelab.se/platforms/ngi/" className="text-blue-600">
                        National Genomics Infrastructre
                      </Link>
                      {' '}
                      (NGI) at SciLifeLab, Sweden. Initial quality control was done using
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" className="text-blue-600">
                        FastQC
                      </Link>
                      {' '}
                      and
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/fastq_screen/" className="text-blue-600">
                        FastQ Screen
                      </Link>
                      . Reads were processed with
                      {' '}
                      <Link to="https://www.broadinstitute.org/gatk/" className="text-blue-600">
                        GATK
                      </Link>
                      {' '}
                      and the aligned reads analysed using
                      {' '}
                      <Link to="http://broadinstitute.github.io/picard/" className="text-blue-600">
                        Picard
                      </Link>
                      . Downstream QC was done using
                      {' '}
                      <Link to="http://qualimap.bioinfo.cipf.es/" className="text-blue-600">
                        Qualimap BamQC
                      </Link>
                      {' '}
                      and
                      {' '}
                      <Link to="http://snpeff.sourceforge.net/" className="text-blue-600">
                        SnpEff
                      </Link>
                      .
                    </p>
                    <p className="typo-body mb-4">
                      You can download this report and / or the logs used to generate it, to try running MultiQC
                      yourself. Note that the example report has some user-specific config settings, seen in the
                      {' '}
                      <Link to="https://multiqc.info/examples/wgs/multiqc_config.yaml" className="text-blue-600">
                        multiqc_config.yaml
                      </Link>
                      {' '}
                      file.
                    </p>
                    <Button to="/" variant="secondary" size="sm" className="mr-4">
                      Download report
                    </Button>
                    <Button to="/" variant="secondary" size="sm">
                      Download logs
                    </Button>
                  </Accordion.Detail>
                </Accordion.Item>
                <Accordion.Item
                  className="border border-gray-800"
                  iconClassName="text-blue-600"
                >
                  <Accordion.Summary>
                    <span className="typo-intro">
                      Methylation (Bisulfite)
                    </span>
                  </Accordion.Summary>
                  <Accordion.Detail>
                    <p className="typo-body mb-4">
                      The example methylation report is based on analysis of data from the GEO NCBI project
                      {' '}
                      <Link to="http://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE47966" className="text-blue-600">
                        GSE47966
                      </Link>
                      , from the 2013 Lister
                      {' '}
                      <i>
                        et. al.
                      </i>
                      {' '}
                      paper
                      {' '}
                      <i>
                        Global epigenomic reconfiguration during mammalian brain development
                      </i>
                      .
                    </p>
                    <p className="typo-body mb-4">
                      Raw data was run through
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" className="text-blue-600">
                        FastQC
                      </Link>
                      {' '}
                      and trimmed using
                      {' '}
                      <Link
                        to="http://www.bioinformatics.babraham.ac.uk/projects/trim_galore/"
                        className="text-blue-600"
                      >
                        Trim Galore!
                      </Link>
                      {' '}
                      (a wrapper around
                      {' '}
                      <Link to="https://github.com/marcelm/cutadapt" className="text-blue-600">
                        Cutadapt
                      </Link>
                      ). Reads were aligned, deduplicated and cytosine methylation statuses called using
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/bismark/" className="text-blue-600">
                        Bismark
                      </Link>
                      .
                    </p>
                    <p className="typo-body mb-4">
                      You can download this report and / or the logs used to generate it, to try running MultiQC
                      yourself.
                    </p>
                    <Button to="/" variant="secondary" size="sm" className="mr-4">
                      Download report
                    </Button>
                    <Button to="/" variant="secondary" size="sm">
                      Download logs
                    </Button>
                  </Accordion.Detail>
                </Accordion.Item>
                <Accordion.Item
                  className="border border-gray-800"
                  iconClassName="text-blue-600"
                >
                  <Accordion.Summary>
                    <span className="typo-intro">
                      Genome Structure (Hi-C)
                    </span>
                  </Accordion.Summary>
                  <Accordion.Detail>
                    <p className="typo-body mb-4">
                      This Hi-C MultiQC report was generated using Hi-C data from
                      {' '}
                      <Link to="mailto:louise.harewood@cruk.cam.ac.uk" className="text-blue-600">
                        Louise Harewood
                      </Link>
                      {' '}
                      at
                      {' '}
                      <Link to="http://www.cambridgecancer.org.uk/" className="text-blue-600">
                        CRUK Cambridge Institute
                      </Link>
                      . Reads were run through
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/fastqc/" className="text-blue-600">
                        FastQC
                      </Link>
                      {' '}
                      and then processed using
                      {' '}
                      <Link to="http://www.bioinformatics.babraham.ac.uk/projects/hicup/" className="text-blue-600">
                        HiCUP
                      </Link>
                      {' '}
                      (Hi-C User Pipeline).
                    </p>
                    <p className="typo-body mb-4">
                      You can download this report and / or the logs used to generate it, to try running MultiQC
                      yourself. Note that the example report has some user-specific config settings, seen in
                      the
                      {' '}
                      <Link to="/" className="text-blue-600">
                        multiqc_config.yaml
                      </Link>
                      {' '}
                      file.
                    </p>
                    <Button to="/" variant="secondary" size="sm" className="mr-4">
                      Download report
                    </Button>
                    <Button to="/" variant="secondary" size="sm">
                      Download logs
                    </Button>
                  </Accordion.Detail>
                </Accordion.Item>
                <Accordion.Item
                  className="border border-gray-800"
                  iconClassName="text-blue-600"
                >
                  <Accordion.Summary>
                    <span className="typo-intro">
                      Customised with MultiQC_NGI Plugin
                    </span>
                  </Accordion.Summary>
                  <Accordion.Detail>
                    <p className="typo-body mb-4">
                      This MultiQC report was generated in combination with the
                      {' '}
                      <Link to="https://github.com/ewels/MultiQC_NGI" className="text-blue-600">
                        MultiQC_NGI
                      </Link>
                      {' '}
                      plugin. This plugin adds a few new functionalities to MultiQC which are specific to the
                      {' '}
                      <Link to="https://www.scilifelab.se/platforms/ngi/" className="text-blue-600">
                        SciLifeLab National Genomics Infrastruture
                      </Link>
                      . A new report template (
                      <strong>
                        ngi
                      </strong>
                      ) styles reports with our logo. A new module (
                      <strong>
                        NGI-RNAseq
                      </strong>
                      ) adds sample similarity plots generated from custom code in our
                      {' '}
                      <Link to="https://github.com/SciLifeLab/NGI-RNAseq" className="text-blue-600">
                        RNA pipeline
                      </Link>
                      . It also loads intersting data fields from our LIMS (eg. RIN score) and puts these into the
                      report. Finally, it saves the parsed biofinformatics summary results back in the LIMS for
                      multi-project meta analyses.
                    </p>
                    <p className="typo-body mb-4">
                      You can download this report and / or the logs used to generate it, to try running MultiQC
                      yourself. The
                      {' '}
                      <Link to="https://github.com/ewels/MultiQC_NGI" className="text-blue-600">
                        MultiQC_NGI
                      </Link>
                      {' '}
                      package must be installed. Note that the example report has some user-specific config settings,
                      seen in the
                      {' '}
                      <Link to="https://multiqc.info/examples/ngi-rna/multiqc_config.yaml" className="text-blue-600">
                        multiqc_config.yaml
                      </Link>
                      {' '}
                      file. It can also be run with the
                      {' '}
                      <b>
                        --test-db
                      </b>
                      {' '}
                      parameter, using
                      {' '}
                      <Link to="https://multiqc.info/examples/ngi-rna/ngi_db_data.json" className="text-blue-600">
                        the example data provided
                      </Link>
                      .
                    </p>
                    <Button to="/" variant="secondary" size="sm" className="mr-4">
                      Download report
                    </Button>
                    <Button to="/" variant="secondary" size="sm">
                      Download logs
                    </Button>
                  </Accordion.Detail>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
