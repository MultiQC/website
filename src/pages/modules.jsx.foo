import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { DocsIcon, Link } from "website-components";

import Seo from "../components/Seo";
import Hero from "../layout/Hero";

const ModulesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      modules: allModule(sort: { fields: title }) {
        nodes {
          slug
          path
          title
          description
        }
      }
    }
  `);

  const modules = data.modules.nodes;

  return (
    <>
      <Seo title="Supported Tools" />
      <Hero>
        <div className="container-lg relative">
          <h1 className="typo-h2">Supported Tools</h1>
          <p className="typo-blockquote mb-4 mt-4 lg:mt-8">
            MultiQC currently has modules to support 114 different bioinformatics tools, listed below.
          </p>
        </div>
      </Hero>
      <div className="container-lg py-20">
        <div className="flex items-center">
          <DocsIcon className="mr-3 h-6 w-6 text-gray-500" />
          <p className="typo-blockquote">Click the tool name to go to the MultiQC documentation for that tool.</p>
        </div>
        <p className="mt-2">
          Missing something? If you would like another to be added, please{" "}
          <Link to="https://github.com/ewels/MultiQC/issues/new?labels=module%3A+new&template=module-request.yml">
            open an issue
          </Link>
          .
        </p>
        <table className="mt-8">
          <thead>
            <tr>
              <td className="w-1/4">
                <span className="typo-intro">Tool Name</span>
              </td>
              <td>
                <span className="typo-intro">Description</span>
              </td>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr>
                <td>
                  <Link to={module.path} className="typo-body text-blue-600">
                    {module.title}
                  </Link>
                </td>
                <td>
                  <p className="typo-body">{module.description}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ModulesPage;
