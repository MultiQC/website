import classnames from 'classnames';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import {
  Button,
  DocsIcon,
  Link,
  List,
} from 'website-components';

import Hero from '../layout/Hero';
import Seo from '../components/Seo';

const ExampleReportsPage = () => {
  return (
    <>
      <Seo
        title="Example Reports MultiQC"
      />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-7">
              <h1 className="typo-h2">
                Example reports
              </h1>
            </div>
          </div>
        </div>
      </Hero>
    </>
  );
};

export default ExampleReportsPage;
