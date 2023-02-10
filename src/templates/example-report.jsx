import classnames from "classnames";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

import { Button, Link, List } from "website-components";

import CustomMDXProvider from "../components/CustomMDXProvider";
import DocsNavigation from "../components/DocsNavigation";
import ExamplesBrowser from "../components/ExamplesBrowser";
import Seo from "../components/Seo";

import Hero from "../layout/Hero";

import PropTypes from "../utils/PropTypes";

const ExampleReport = ({ data, location }) => {
  const { report } = data;

  return (
    <>
      <Seo title={report.title} description={report.description} />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-6">
              <h1 className="typo-h2">{report.title}</h1>
              <p className="typo-blockquote mt-4 lg:mt-8">{report.description}</p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg mt-10 md:mt-20">
        <div className="row">
          <div className="col-full">
            <CustomMDXProvider>
              <MDXRenderer>{report.content.body}</MDXRenderer>
            </CustomMDXProvider>
            <p className="my-6 text-center">
              <Button to={report.embed} variant="secondary" size="sm" className="mr-2">
                Open report in new tab
              </Button>
              <Button to={report.zip} variant="secondary" size="sm" className="mr-2">
                Download full report output
              </Button>
              <Button to={report.data} variant="secondary" size="sm" className="mr-2">
                Download input data
              </Button>
            </p>
            <div className="mt-8">
              <ExamplesBrowser items={[report]} />
            </div>
          </div>
        </div>
      </div>
      <div className="container-lg py-10 md:py-20 text-center">
        <Button to="/example-reports/" variant="secondary" size="md" arrow>
          See all example reports
        </Button>
      </div>
    </>
  );
};

ExampleReport.propTypes = {
  data: PropTypes.shape(PropTypes.object.isRequired),
};

ExampleReport.defaultProps = {
  data: null,
};

export default ExampleReport;

export const pageQuery = graphql`
  query ($slug: String!) {
    report: exampleReport(slug: { eq: $slug }) {
      title
      description
      path
      zip
      embed
      data
      content {
        body
      }
    }
  }
`;
