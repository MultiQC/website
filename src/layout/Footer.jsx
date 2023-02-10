import React from "react";
import { GitHubIcon, Link, LinkedInIcon, TwitterIcon } from "website-components";

import HeroBackgroundSrc from "../images/background.png";

const Footer = () => {
  return (
    <>
      <footer className="relative mt-auto text-white" style={{ backgroundImage: `url(${HeroBackgroundSrc})` }}>
        <div className="container-lg">
          <div className="border-t border-white opacity-40" />
          <div className="flex h-12 items-center justify-between">
            <div className="flex items-center">
              <div className="typo-small mr-4 text-white">Created by Phil Ewels:</div>
              <div className="mr-4">
                <Link to="https://github.com/ewels" className="hover:text-blue-600" noBorder>
                  <GitHubIcon className="h-5 w-5" />
                </Link>
              </div>
              <div className="mr-4">
                <Link to="https://twitter.com/tallphil" className="hover:text-blue-600" noBorder>
                  <TwitterIcon className="h-5 w-5" />
                </Link>
              </div>
              <div className="mr-4">
                <Link to="https://se.linkedin.com/in/philewels" className="hover:text-blue-600" noBorder>
                  <LinkedInIcon className="h-5 w-5" />
                </Link>
              </div>
              <div className="mr-4">
                <Link to="https://se.linkedin.com/in/philewels" className="typo-small hover:text-blue-600" noBorder>
                  ResearchGate
                </Link>
              </div>
            </div>
            <div>
              <Link to="https://seqera.io/" noBorder className="typo-small">
                &copy; 2022 Seqera Labs
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
