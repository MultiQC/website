import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import React from "react";

import CustomMDXProvider from "../components/CustomMDXProvider";
import Seo from "../components/Seo";

import Hero from "../layout/Hero";

import PropTypes from "../utils/PropTypes";

const ModulePage = ({ data, pageContext }) => {
  const { module } = data;

  return (
    <>
      <Seo title={"MultiQC Module: " + module.title} description={module.description} />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full">
              <h1 className="typo-h2">Module: {module.title}</h1>
              <p className="typo-blockquote mt-4 lg:mt-8">{module.description}</p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg py-10 sm:py-20">
        <div className="row">
          <div className="col-full">
            <div>
              <CustomMDXProvider>
                <MDXRenderer>{module.content.body}</MDXRenderer>
              </CustomMDXProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

ModulePage.propTypes = {
  data: PropTypes.shape(PropTypes.object.isRequired),
};

ModulePage.defaultProps = {
  data: null,
};

export default ModulePage;

export const pageQuery = graphql`
  query ($slug: String!) {
    module: module(slug: { eq: $slug }) {
      slug
      title
      description
      url
      content {
        body
      }
    }
  }
`;
