import classnames from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { Link, List } from "website-components";

import Seo from "../components/Seo";
import Hero from "../layout/Hero";

const DocsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      sections: allDoc(filter: { isSection: { eq: true } }, sort: { fields: order }) {
        nodes {
          path
          title
          description
        }
      }
      docs: allDoc(sort: { fields: order }) {
        nodes {
          path
          title
        }
      }
    }
  `);

  const docs = data.docs.nodes;
  const sections = data.sections.nodes;

  return (
    <>
      <Seo title="MultiQC Documentation" />
      <Hero>
        <div className="container-lg relative">
          <h1 className="typo-h2">Documentation</h1>
          <p className="typo-blockquote mb-4 mt-4 lg:mt-8">
            MultiQC documentation covering usage, customisation and development.
          </p>
        </div>
      </Hero>
      <div className="container-lg my-10 md:my-20">
        <h2 className="typo-h3">Documentation sections</h2>
        <div className="row">
          {sections.map((section) => (
            <div className="col-full md:col-4 mt-10">
              <h2 className="typo-h4 text-blue-600">
                <Link to={section.path} noBorder>
                  {section.title}
                </Link>
              </h2>
              <p className="typo-body mt-4">{section.description}</p>
              <List className="mt-4" iconClassName="text-blue-600">
                {docs.map((doc) => (
                  <List.Item
                    className={classnames("typo-body", {
                      hidden: !doc.path.includes(section.path) || doc.path === section.path,
                    })}
                  >
                    <Link to={doc.path}>{doc.title}</Link>
                  </List.Item>
                ))}
              </List>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DocsPage;
