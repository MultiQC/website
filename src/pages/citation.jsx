import React from 'react';

import {
  Accordion,
  Button,
  Link,
} from 'website-components';

import Hero from '../layout/Hero';
import Seo from '../components/Seo';

const CitationPage = () => {
  return (
    <>
      <Seo
        title="MultiQC Publication Details"
      />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-6">
              <h1 className="typo-h2">
                MultiQC Publication Details
              </h1>
              <p className="typo-blockquote mt-4 lg:mt-8">
                Please consider citing MultiQC if you use it in your analysis.
              </p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-md py-20">
        <div className="row">
          <div className="col-full">
            <h2 className="typo-h5 text-blue-600 uppercase mb-4">
              Citation
            </h2>
            <p className="typo-h4 mb-4">
              Please consider citing MultiQC if you use it in your analysis.
            </p>
            <p className="typo-intro mb-4">
              MultiQC: Summarize analysis results for multiple tools and samples in a single report
            </p>
            <p className="typo-body italic mb-4">
              Philip Ewels, Måns Magnusson, Sverker Lundin and Max Käller
            </p>
            <p className="typo-body">
              Bioinformatics (2016)
              <br />
              doi:
              {' '}
              <Link to="http://dx.doi.org/10.1093/bioinformatics/btw354" className="text-blue-600">
                10.1093/bioinformatics/btw354
              </Link>
              <br />
              PMID:
              {' '}
              <Link to="http://www.ncbi.nlm.nih.gov/pubmed/27312411" className="text-blue-600">
                27312411
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="container-lg py-20">
        <h2 className="typo-h3">
          Abstract
        </h2>
        <div className="row">
          <div className="col-full md:col-6 mt-4">
            <p className="typo-blockquote">
              This is an Open Access article distributed under the terms of the
              {' '}
              <Link to="http://creativecommons.org/licenses/by/4.0/" className="text-blue-600">
                Creative Commons Attribution License
              </Link>
              , which permits unrestricted reuse, distribution, and reproduction in any medium, provided the original
              work is properly cited.
            </p>
            <div className="mt-4 md:mt-8">
              <Button to="http://dx.doi.org/10.1093/bioinformatics/btw354" variant="primary" size="md" arrow>
                Go to publication
              </Button>
            </div>
          </div>
          <div className="col-full md:col-6 mt-4">
            <Accordion>
              <Accordion.Item
                className="border border-gray-800"
                iconClassName="text-blue-600"
              >
                <Accordion.Summary>
                  <span className="typo-intro">
                    Motivation
                  </span>
                </Accordion.Summary>
                <Accordion.Detail>
                  <p className="typo-body">
                    Fast and accurate quality control is essential for studies involving next-generation sequencing
                    data. Whilst numerous tools exist to quantify QC metrics, there is no common approach to flexibly
                    integrate these across tools and large sample sets. Assessing analysis results across an entire
                    project can be time consuming and error prone; batch effects and outlier samples can easily be
                    missed in the early stages of analysis.
                  </p>
                </Accordion.Detail>
              </Accordion.Item>
              <Accordion.Item
                className="border border-gray-800"
                iconClassName="text-blue-600"
              >
                <Accordion.Summary>
                  <span className="typo-intro">
                    Results
                  </span>
                </Accordion.Summary>
                <Accordion.Detail>
                  <p className="typo-body">
                    We present MultiQC, a tool to create a single report visualising output from multiple tools across
                    many samples, enabling global trends and biases to be quickly identified. MultiQC can plot data
                    from many common bioinformatics tools and is built to allow easy extension and customization.
                  </p>
                </Accordion.Detail>
              </Accordion.Item>
              <Accordion.Item
                className="border border-gray-800"
                iconClassName="text-blue-600"
              >
                <Accordion.Summary>
                  <span className="typo-intro">
                    Availability
                  </span>
                </Accordion.Summary>
                <Accordion.Detail>
                  <p className="typo-body">
                    MultiQC is available with an GNU GPLv3 license on GitHub, the Python Package Index and Bioconda.
                    Documentation and example reports available at
                    {' '}
                    <Link to="https://multiqc.info/" className="text-blue-600">
                      https://multiqc.info/
                    </Link>
                  </p>
                </Accordion.Detail>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default CitationPage;
