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

const DocPage = ({ data, location }) => {
  const { doc, docs } = data;

  return (
    <>
      <Seo
        title={doc.title}
        description={doc.description}
      />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full">
              <h1 className="typo-h2">
                {doc.title}
              </h1>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg py-10 md:py-20">
        <div className="row">
          <div className="col-full lg:col-9 lg:order-2">
            <h1 className="typo-h2 text-blue-600 mb-4">
              {doc.title}
            </h1>
            <p className="typo-blockquote">
              {doc.description}
            </p>
            <div className="mt-5 md:mt-10">
              <CustomMDXProvider>
                <MDXRenderer>
                  {doc.content.body}
                </MDXRenderer>
              </CustomMDXProvider>
            </div>
            <div className="mt-5 md:mt-10">
              <List className="my-4" iconClassName="text-blue-600">
                {docs.nodes.map((d) => (
                  <List.Item className={
                    classnames('typo-body',
                      {
                        'hidden': !d.path.includes(doc.path) || d.path == doc.path,
                      }
                    )}
                  >
                    <Link to={d.path}>
                      {d.title}
                    </Link>
                  </List.Item>
                ))}
              </List>
            </div>
          </div>
          <div className="col-full lg:col-3 lg:order-1">
            <DocsNavigation docs={docs.nodes} location={location} />
          </div>
        </div>
      </div>
    </>
  );
};

DocPage.propTypes = {
    data: PropTypes.shape(PropTypes.object.isRequired),
};

DocPage.defaultProps = {
    data: null,
};

export default DocPage;

export const pageQuery = graphql`
  query($slug: String!) {
    docs: allDoc(sort: {fields: order}) {
      nodes {
        path
        isSection
        title
      }
    }
    doc: doc(slug: { eq: $slug }) {
      path
      title
      description
      content {
        body
      }
    }
  }
`;
