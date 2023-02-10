import React from 'react';

import {
  Button,
} from 'website-components';

import Hero from '../layout/Hero';
import Seo from '../components/Seo';


const Error404Page = () => {
  return (
      <>
          <Seo
        title="Error 404: Page Not Found"
      />
      <Hero>
        <div className="container-lg relative">
          <div className="row">
            <div className="col-full lg:col-6">
              <h1 className="typo-h2">
                Error 404: Page Not Found
              </h1>
              <p className="typo-blockquote mt-4 lg:mt-8">
                The page you were looking for has been moved or removed.
              </p>
            </div>
          </div>
        </div>
          </Hero>
          <div className="container-lg py-20">
              <p className="typo-h4 mb-6">
                  Apologies, the link you followed is broken and the page cannot be found.
              </p>
              <p className="typo-body mb-3">
                  If you believe this is an error, please report it on the website repository:
              </p>
              <p><Button to="https://github.com/ewels/MultiQC_website/issues/new" variant="primary" size="md" arrow>
                  Open an issue on GitHub
                </Button></p>
          </div>
          </>
  );
};

export default Error404Page;
