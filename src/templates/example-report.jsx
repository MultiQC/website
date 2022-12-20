import classnames from 'classnames';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import React from 'react';

import {
  Link,
  List,
} from 'website-components';

import CustomMDXProvider from '../components/CustomMDXProvider';
import DocsNavigation from '../components/DocsNavigation';
import Seo from '../components/Seo';

import Hero from '../layout/Hero';

import PropTypes from '../utils/PropTypes';

const ExampleReport = ({ data, location }) => {
  const { report } = data;

  return (
    <>
      <Seo
        title={report.title}
        description={report.description}
      />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full">
              <p className="typo-h5 uppercase text-blue-600 mb-4">
                Example Report
              </p>
              <h1 className="typo-h2">
                {report.title}
              </h1>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg py-10 md:py-20">
        <div className="row">
          <div className="col-full lg:col-9 lg:order-2">
            <h1 className="typo-h2 text-blue-600 mb-4">
              {report.title}
            </h1>
            <div className="mt-5 md:mt-10">
              <CustomMDXProvider>
                <MDXRenderer>
                  {report.content.body}
                </MDXRenderer>
              </CustomMDXProvider>
            </div>
          </div>
        </div>
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
  query($slug: String!) {
    report: exampleReport(slug: { eq: $slug }) {
      title
      description
      path
      zip {
        publicURL
      }
      embed {
        publicURL
      }
      data {
        publicURL
      }
      content {
        body
      }
    }
  }
`;
