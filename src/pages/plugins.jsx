import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage as Image, getImage } from 'gatsby-plugin-image';
import React from 'react';

import {
  Button,
  GitHubIcon,
  Link,
} from 'website-components';

import Hero from '../layout/Hero';
import Seo from '../components/Seo';

const PluginsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      multiqcLogo: file(relativePath: {eq: "plugins/multiqc.png"}) {
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
          )
        }
      }
      clarifyLogo: file(relativePath: {eq: "plugins/clarity.png"}) {
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
          )
        }
      }
      bcbioLogo: file(relativePath: {eq: "plugins/bcbio.png"}) {
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
          )
        }
      }
      ngiLogo: file(relativePath: {eq: "plugins/ngi.png"}) {
        childImageSharp {
          gatsbyImageData(
            placeholder: NONE
          )
        }
      }
    }
  `);

  return (
    <>
      <Seo
        title="MultiQC Plugins"
      />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-6">
              <h1 className="typo-h2">
                MultiQC Plugins
              </h1>
              <p className="typo-blockquote mt-4 lg:mt-8">
                MultiQC plugins that you can use to extend MultiQC functionality.
              </p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg mt-20 md:mt-0 md:py-20">
        <div className="row">
          <div className="col-full md:col-10">
            <p className="typo-body mb-4">
              MultiQC is built in such a way that externally managed Python packages can tie in to its functionality. This
              allows separate plugin tools to extend its capabilities, adding new modules, report templates and doing useful
              things with the parsed data.
            </p>
            <p className="typo-body">
              The below list highlights a few such plugins - some may be useful to you if they interact with external tools
              which you use (eg.
              {' '}
              <span className="font-medium">
                MultiQC_Clarity
              </span>
              ), others may be helpful as reference for writing your own plugin.
            </p>
          </div>
        </div>
      </div>
      <div className="container-lg mt-20 md:mt-0 md:py-20">
        <div className="row">
          <div className="col-full md:col-5 md:ml-1/12 md:order-2">
            <div className="py-24 px-4 text-center rounded-md shadow">
              <Image
                image={getImage(data.multiqcLogo)}
                className="h-16"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-full md:col-6 md:order-1 mt-10 md:mt-0">
            <h2 className="typo-h3 mb-4">
              Example MultiQC Plugin
            </h2>
            <p className="typo-intro mb-4">
              A miniature example of a MultiQC plugin.
            </p>
            <p className="typo-body mb-4">
              This example repository contains the following code to help you get started with writing your own MultiQC
              plugin.
            </p>
            <Button to="https://github.com/MultiQC/example-plugin" variant="primary" size="sm">
              <GitHubIcon className="h-6 w-6 mr-3" />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
      <div className="container-lg mt-20 md:mt-0 md:py-20">
        <div className="row">
          <div className="col-full md:col-5">
            <div className="py-20 px-4 text-center rounded-md shadow">
              <Image
                image={getImage(data.clarifyLogo)}
                className="h-24"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-full md:col-6 md:ml-1/12">
            <h2 className="typo-h3 mb-4 mt-10 md:mt-0">
              MultiQC_Clarity
            </h2>
            <p className="typo-intro mb-4">
              MultiQC_Clarity is a plugin for MultiQC, able to insert project-level and sample-level metadata from the
              BaseSpace Clarity LIMS into MultiQC Reports.
            </p>
            <p className="typo-body mb-4">
              MultiQC_Clarity connects to your Clarity LIMS installation using the API. MultiQC runs as normal, generating
              a list of sample names based on the contents of the files found. These sample names are passed to the
              MultiQC_Clarity plugin, which searches your Clarity LIMS installation for matching sample names. If exact
              matches are found, then the metadata configured in the config file is retrieved and entered into the report.
            </p>
            <Button to="https://github.com/MultiQC/MultiQC_Clarity" variant="primary" size="sm">
              <GitHubIcon className="h-6 w-6 mr-3" />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
      <div className="container-lg mt-20 md:mt-0 md:py-20">
        <div className="row">
          <div className="col-full md:col-5 md:ml-1/12 md:order-2">
            <div className="py-20 px-4 text-center rounded-md shadow">
              <Image
                image={getImage(data.bcbioLogo)}
                className="h-24"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-full md:col-6 md:order-1 mt-10 md:mt-0">
            <h2 className="typo-h3 mb-4">
              MultiQC_bcbio
            </h2>
            <p className="typo-body mb-4">
              Plugin for multiqc tool to add in-house QC metrics about coverage, variants and general values generated by
              {' '}
              <Link to="https://github.com/chapmanb/bcbio-nextgen" className="text-blue-600">
                bcbio-nextgen
              </Link>
              {' '}
              pipeline.
            </p>
            <Button to="https://github.com/MultiQC/MultiQC_Clarity" variant="primary" size="sm">
              <GitHubIcon className="h-6 w-6 mr-3" />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
      <div className="container-lg py-20">
        <div className="row">
          <div className="col-full md:col-5">
            <div className="py-20 px-4 text-center rounded-md shadow">
              <Image
                image={getImage(data.ngiLogo)}
                className="h-24"
                objectFit="contain"
              />
            </div>
          </div>
          <div className="col-full md:col-6 md:ml-1/12 mt-10 md:mt-0">
            <h2 className="typo-h3 mb-4">
              MultiQC_NGI
            </h2>
            <p className="typo-intro mb-4">
              MultiQC_NGI adds custom functionality for the National Genomics Infrastructure at SciLifeLab in Sweden.
            </p>
            <p className="typo-body mb-4">
              Extends MultiQC with additional custom plugins and themes, allows interaction with an in-house database.
              Not much use for others outside of our institute directly, but can be helpful as a guide for how such
              plugins can be written.
            </p>
            <Button to="https://github.com/ewels/MultiQC_NGI" variant="primary" size="sm">
              <GitHubIcon className="h-6 w-6 mr-3" />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PluginsPage;
