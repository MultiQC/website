import classnames from "classnames";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { Button, DocsIcon, Link, List } from "website-components";

import Hero from "../layout/Hero";
import Seo from "../components/Seo";

const ExampleReportsPage = () => {
  const data = useStaticQuery(graphql`
    query {
      analysisReports: allExampleReport(filter: { type: { eq: "Analysis Types" } }) {
        nodes {
          title
          description
          path
          type
        }
      }
      customReports: allExampleReport(filter: { type: { eq: "MultiQC Customisation" } }) {
        nodes {
          title
          description
          path
          type
        }
      }
    }
  `);

  const analysisReports = data.analysisReports.nodes;
  const customReports = data.customReports.nodes;

  return (
    <>
      <Seo title="Example Reports MultiQC" />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-7">
              <h1 className="typo-h2">Example reports</h1>
              <p className="typo-blockquote mt-4 lg:mt-8">
                MultiQC collects numerical stats from each module at the top the report, so that you can track how your
                data behaves as it proceeds through your analysis.
              </p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-lg py-20">
        <h2 className="typo-h3">Analysis Types</h2>
        <div className="row">
          {analysisReports.map((report) => (
            <div className="col-full md:col-6 mt-8">
              <div className="flex flex-col h-full rounded-md bg-white shadow-xl py-6 sm:py-8 px-4 sm:px-8">
                <h3 className="typo-h4 mb-4">
                  <Link to={report.path} noBorder>
                    {report.title}
                  </Link>
                </h3>
                <p className="typo-body mb-4 flex-1">{report.description}</p>
                <div>
                  <Button to={report.path} variant="primary" size="sm" arrow>
                    See report details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="typo-h3 mt-20">MultiQC Customisation</h2>
        <div className="row">
          {customReports.map((report) => (
            <div className="col-full md:col-6 mt-8 h-full">
              <div className="flex flex-col h-full rounded-md bg-white shadow-xl py-6 sm:py-8 px-4 sm:px-8">
                <h3 className="typo-h4 mb-4">
                  <Link to={report.path} noBorder>
                    {report.title}
                  </Link>
                </h3>
                <p className="typo-body mb-4 flex-1">{report.description}</p>
                <div>
                  <Button to={report.path} variant="primary" size="sm" arrow>
                    See report details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExampleReportsPage;
