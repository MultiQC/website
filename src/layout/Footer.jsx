import React from 'react';
import {
  GitHubIcon,
  Link,
  LinkedInIcon,
  SeqeraIcon,
  SlackIcon,
  TwitterIcon,
  YoutubeRectangleIcon
} from 'website-components';

import HeroBackgroundSrc from '../images/background.png';

const Footer = () => {
  return (
    <>
      <footer className="text-white mt-auto relative" style={{ backgroundImage: `url(${HeroBackgroundSrc})` }}>
        <div className="container-lg">
          <div className="border-white border-t opacity-40" />
          <div className="flex justify-between items-center h-12">
            <div className="flex items-center">
              <div className="typo-small text-white mr-4">
                Created by Phil Ewels:
              </div>
              <div className="mr-4">
                <Link to="https://github.com/ewels" className="hover:text-blue-600" noBorder>
                  <GitHubIcon className="w-5 h-5" />
                </Link>
              </div>
              <div className="mr-4">
                <Link to="https://twitter.com/tallphil" className="hover:text-blue-600" noBorder>
                  <TwitterIcon className="w-5 h-5" />
                </Link>
              </div>
              <div className="mr-4">
                <Link to="https://se.linkedin.com/in/philewels" className="hover:text-blue-600" noBorder>
                  <LinkedInIcon className="w-5 h-5" />
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
