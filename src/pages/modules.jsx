import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import {
  Button,
  DocsIcon,
  Link,
} from 'website-components';

import Hero from '../layout/Hero';
import Seo from '../components/Seo';

const ModulesPage = () => {
  const data = useStaticQuery(graphql`
    query {
      modules: allModule(sort: {fields: title}) {
        nodes {
          slug
          title
          description
        }
      }
    }
  `);

  const modules = data.modules.nodes;

  return (
    <>
      <Seo
        title="MultiQC Modules"
      />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-6">
              <h1 className="typo-h2">
                MultiQC Modules
              </h1>
              <p className="typo-blockquote mb-4 mt-4 lg:mt-8">
                MultiQC currently supports 114 bioinformatics tools, listed below. If you would like another to be
                added, please open an issue.
              </p>
              <div className="mt-4 lg:mt-8">
                <Button
                  to="https://github.com/ewels/MultiQC/issues"
                  variant="primary"
                  size="md"
                  arrow
                >
                  Open an issue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg py-20">
        <div className="flex items-center">
          <DocsIcon className="h-6 w-6 mr-3 text-gray-500" />
          <p className="typo-blockquote">
            Click the tool name to go to the MultiQC documentation for that tool.
          </p>
        </div>
        <table className="mt-8">
          <thead>
            <tr>
              <td className="w-1/4">
                <span className="typo-intro">
                  Tool Name
                </span>
              </td>
              <td>
                <span className="typo-intro">
                  Description
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr>
                <td>
                  <Link to={module.slug} className="typo-body text-blue-600">
                    {module.title}
                  </Link>
                </td>
                <td>
                  <p className="typo-body">
                    {module.description}
                  </p>
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
