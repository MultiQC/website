import React from 'react';

import {
  Link,
  List,
} from 'website-components'

import Seo from '../components/Seo';

import Hero from '../layout/Hero';

const LogosPage = () => {
  return (
    <>
      <Seo
        title="MultiQC Logos"
      />
      <Hero>
        <div className="container-md relative">
          <div className="row">
            <div className="col-full lg:col-6">
              <h1 className="typo-h2">
                Grab some
                <br />
                MultiQC logos!
              </h1>
              <p className="typo-blockquote mt-4 lg:mt-8">
                Perfect for talks, posters, stickers, desktop backgrounds or whatever else you fancy!
              </p>
            </div>
          </div>
        </div>
      </Hero>
      <div className="container-md py-20">
        <h2 className="typo-h3 mb-4">
          Introduction
        </h2>
        <p className="typo-body mb-4">
          The MultiQC logos are available at
          {' '}
          <Link to="https://github.com/MultiQC/logo" className="text-blue-600">
            https://github.com/MultiQC/logo
          </Link>
          {' '}
          and are included below for convenience. You are free to use the MultiQC logos in any way you wish. They are
          available under the
          {' '}
          <Link to="https://choosealicense.com/licenses/mit/" className="text-blue-600">
            MIT licence
          </Link>
          .
        </p>
        <p className="typo-body mb-4">
          If possible, please try to link back to the main MultiQC website when you use a logo:
          {' '}
          <Link to="https://multiqc.info/" className="text-blue-600">
            https://multiqc.info/
          </Link>
        </p>
        <p className="typo-body">
          Need another variant? Let me know on the
          {' '}
          <Link to="https://gitter.im/ewels/MultiQC" className="text-blue-600">
            MultiQC Gitter chat!
          </Link>
        </p>
        <h3 className="typo-h4 mt-8 mb-4">
          Design Details
        </h3>
        <p className="typo-body mb-4">
          <strong>
            Font:
          </strong>
          {' '}
          <span>
            Roboto Medium 500 (available from
            {' '}
            <Link to="https://fonts.google.com/specimen/Roboto" className="text-blue-600">
              Google Fonts
            </Link>
            )
          </span>
        </p>
        <p className="typo-body mb-4">
          <strong>
            Text Colour:
          </strong>
          {' '}
          <span>
            #000000
          </span>
        </p>
        <p className="typo-body mb-4">
          <strong>
            Colour 1:
          </strong>
          {' '}
          <span>
            #BE1622
          </span>
        </p>
        <p className="typo-body mb-4">
          <strong>
            Colour 2:
          </strong>
          {' '}
          <span>
            #009640
          </span>
        </p>
        <p className="typo-body mb-4">
          <strong>
            Colour 3:
          </strong>
          {' '}
          <span>
            #1D71B8
          </span>
        </p>
        <h3 className="typo-h4 mt-8 mb-4">
          MultiQC Logo
        </h3>
        <div className="row mb-4">
          <div className="col-full sm:col-6">
            <div className="bg-gray-200 p-10">
              <img src="/logos/multiqc_logo.png" />
            </div>
          </div>
        </div>
        <List iconClassName="text-blue-600">
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo.png">
              PNG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo.svg">
              SVG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo.ai">
              Illustrator CS5
            </Link>
          </List.Item>
        </List>
        <h3 className="typo-h4 mt-8 mb-4">
          MultiQC Logo (dark background)
        </h3>
        <div className="row mb-4">
          <div className="col-full sm:col-6">
            <div className="bg-gray-800 p-10">
              <img src="/logos/multiqc_logo_darkbg.png" />
            </div>
          </div>
        </div>
        <List iconClassName="text-blue-600">
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_darkbg.png">
              PNG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_darkbg.svg">
              SVG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_darkbg.ai">
              Illustrator CS5
            </Link>
          </List.Item>
        </List>
        <h3 className="typo-h4 mt-8 mb-4">
          MultiQC Square Thumb
        </h3>
        <div className="row mb-4">
          <div className="col-6 sm:col-3">
            <div className="bg-gray-200 p-10">
              <img src="/logos/multiqc_logo_square.png" />
            </div>
          </div>
        </div>
        <List iconClassName="text-blue-600">
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_square.png">
              PNG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_square.svg">
              SVG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_square.ai">
              Illustrator CS5
            </Link>
          </List.Item>
        </List>
        <h3 className="typo-h4 mt-8 mb-4">
          MultiQC Circle Thumb
        </h3>
        <div className="row mb-4">
          <div className="col-6 sm:col-3">
            <div className="bg-gray-200 p-10">
              <img src="/logos/multiqc_logo_circle.png" />
            </div>
          </div>
        </div>
        <List iconClassName="text-blue-600">
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_circle.png">
              PNG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_circle.svg">
              SVG
            </Link>
          </List.Item>
          <List.Item className="typo-body text-blue-600">
            <Link to="/logos/multiqc_logo_circle.ai">
              Illustrator CS5
            </Link>
          </List.Item>
        </List>
      </div>
    </>
  );
};

export default LogosPage;
