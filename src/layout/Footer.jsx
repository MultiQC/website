import { GatsbyImage as Image, getImage } from "gatsby-plugin-image";
import PropTypes from "prop-types";
import React from "react";

import { GitHubIcon, Link, LinkedInIcon, TwitterIcon } from "website-components";

const propTypes = {
  logoImage: PropTypes.object.isRequired,
  jobsCount: PropTypes.number,
  linksDomain: PropTypes.string,
};

const defaultProps = {
  logoImage: null,
  jobsCount: 0,
  linksDomain: "https://seqera.io",
};

const Footer = ({ logoImage, jobsCount, linksDomain }) => {
  return (
    <>
      <footer className="bg-blue-800 py-16 text-gray-200">
        <div className="container-lg">
          <div className="row">
            {logoImage && (
              <div className="col-full">
                <Image image={getImage(logoImage)} alt="Seqera Labs logo" className="h-6 md:h-7" />
              </div>
            )}
          </div>

          <div className="mt-10 border-t border-white opacity-40" />
          <div className="row mt-5">
            <div className="col-full md:col-5 mt-8">
              <h2 className="typo-h6 text-white">Seqera Labs, S.L.</h2>
              <div className="row">
                <div className="col-full md:col-6 mt-4">
                  <p className="typo-small">
                    HQ office address:
                    <br />
                    Carrer de Marià Aguiló, 28
                    <br />
                    Barcelona, 08005
                  </p>
                </div>
                <div className="col-full md:col-6 mt-4">
                  <p className="typo-small">
                    Legal office address:
                    <br />
                    Carrer Ramon Turro, 142
                    <br />
                    Barcelona, 08005
                  </p>
                </div>
              </div>
            </div>
            <div className="col-full md:col-5 mt-8 ml-auto flex flex-col">
              <div className="mb-4 flex md:justify-end">
                <div className="mr-4">
                  <Link to="https://twitter.com/seqeralabs" noBorder>
                    <TwitterIcon className="h-6 w-6 text-gray-200 duration-200 hover:text-white" />
                  </Link>
                </div>
                <div className="mr-4">
                  <Link to="https://github.com/seqeralabs" noBorder>
                    <GitHubIcon className="h-6 w-6 text-gray-200 duration-200 hover:text-white" />
                  </Link>
                </div>
                <div>
                  <Link to="https://www.linkedin.com/company/14065390/" noBorder>
                    <LinkedInIcon className="h-6 w-6 text-gray-200 duration-200 hover:text-white" />
                  </Link>
                </div>
              </div>
              <div className="typo-small mt-auto md:text-right">
                <small className="typo-small">&copy; Seqera Labs</small>
                {" | "}
                <Link to={`${linksDomain}/privacy-policy/`} noBorder>
                  Privacy Policy
                </Link>
                {" | "}
                <Link to="mailto:info@seqera.io">info@seqera.io</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

Footer.propTypes = propTypes;
Footer.defaultProps = defaultProps;

export default Footer;
