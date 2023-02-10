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
                Details about how to cite the MultiQC publication.
              </p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg mt-20">
        <div className="row">
          <div className="col-full">
            <p className="typo-h4 mb-3">
              Please consider citing MultiQC if you use it in your analysis.
            </p>
            <p className="typo-blockquote mb-6">
              Citing MultiQC supports the project by demonstrating usage within the community.
            </p>
            <div className="row">
              <div className="col-full md:col-6 lg:col-8 mb-8">
                <p className="typo-intro">
              MultiQC: Summarize analysis results for multiple tools and samples in a single report
            </p>
            <p className="typo-body ">
              Philip Ewels, Måns Magnusson, Sverker Lundin and Max Käller.
            </p>
            <p className="typo-body">
              <span className="italic">Bioinformatics</span> (2016)
              <br />

                </p>
              </div>
              <div className="col-full md:col-6 lg:col-4 mb-8">
                <p><Button to="http://dx.doi.org/10.1093/bioinformatics/btw354" variant="primary" size="md" arrow>
                  View the publication
                </Button></p>
                <dl className="row mt-4">
                  <dt className="font-bold col-2"><abbr title="Digital object identifier">DOI:</abbr></dt>
                  <dd className="col-10">
                    <Link to="http://dx.doi.org/10.1093/bioinformatics/btw354" className="text-blue-600">
                      10.1093/bioinformatics/btw354
                    </Link>
                  </dd>
                  <dt className="font-bold col-2"><abbr title="PubMed ID">PMID</abbr>:</dt>
                  <dd className="col-10">
                    <Link to="http://www.ncbi.nlm.nih.gov/pubmed/27312411" className="text-blue-600">
                27312411
              </Link>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        <span className="__dimensions_badge_embed__" data-doi="10.1093/bioinformatics/btw354" data-legend="always" data-style="large_circle"></span>
        <script src="https://badge.dimensions.ai/badge.js"></script>
      </div>
      <div className="container-lg my-8">
        <h2 className="typo-h3 my-4">
          Abstract
        </h2>

                  <p className="typo-body my-4">
                    <span className="font-semibold">Motivation:</span> Fast and accurate quality control is essential for studies involving next-generation sequencing
                    data. Whilst numerous tools exist to quantify QC metrics, there is no common approach to flexibly
                    integrate these across tools and large sample sets. Assessing analysis results across an entire
                    project can be time consuming and error prone; batch effects and outlier samples can easily be
                    missed in the early stages of analysis.
                  </p>
                  <p className="typo-body my-4">
                    <span className="font-semibold">Results:</span> We present MultiQC, a tool to create a single report visualising output from multiple tools across
                    many samples, enabling global trends and biases to be quickly identified. MultiQC can plot data
                    from many common bioinformatics tools and is built to allow easy extension and customization.
                  </p>
                  <p className="typo-body my-4">
                    <span className="font-semibold">Availability:</span> MultiQC is available with an GNU GPLv3 license on GitHub, the Python Package Index and Bioconda.
                    Documentation and example reports available at
                    {' '}
                    <Link to="https://multiqc.info/" className="text-blue-600">
                      https://multiqc.info/
                    </Link>
                  </p>
          <p className="typo-small my-12 text-gray-600">
              This is an Open Access article distributed under the terms of
              the <Link to="http://creativecommons.org/licenses/by/4.0/" className="text-blue-600">
                Creative Commons Attribution License
              </Link>, which permits unrestricted reuse, distribution, and reproduction in any medium, provided the original
              work is properly cited.
        </p>
      </div>
    </>
  );
};

export default CitationPage;
