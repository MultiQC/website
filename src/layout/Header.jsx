import classnames from 'classnames';
import {  navigate } from 'gatsby';
import React, { useState } from 'react';
import {
    Button,
    CloseIcon,
    Link,
    MenuIcon,
} from 'website-components';

import Logo from '../images/logo-light.svg';
import HeroBackgroundSrc from '../images/background.png';

const Header = ({ location }) => {
  const [navOpened, setNavOpened] = useState(false);

  const handleNav = (url) => {
    setNavOpened(false);
    navigate(url);
  };

  return (
    <>
      <header className="absolute z-10 inset-x-0 top-0">
        <div className="container-lg flex flex-wrap items-center justify-between w-full h-16 md:h-24">
          <Link to="/" noBorder className="block uppercase">
            <img src={Logo} className={classnames('h-8 lg:h-10', { 'hidden': location.pathname == '/' },)} alt="MultiQC logo" />
          </Link>
          <div className="lg:flex items-center hidden">
            <Link to="https://github.com/ewels/MultiQC/releases" className="typo-small text-xs text-gray-300 mr-5" noBorder>
              Current version: v1.13
            </Link>
            <Link
              to="/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-0 hover:text-white font-body py-1 px-4 mx-2 rounded-sm mr-px font-light tracking-wide',
                {
                  'text-gray-300': location.pathname != '/',
                  'text-white bg-opacity-30 hover:bg-opacity-50': location.pathname === '/'
                }
              )}
            >
              Home
            </Link>
            <Link
              to="/modules/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-0 hover:text-white font-body py-1 px-4 mx-2 rounded-sm mr-px font-light tracking-wide',
                {
                  'text-gray-300': !location.pathname.includes('/modules/'),
                  'text-white bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('modules/')
                }
              )}
            >
              Tools
            </Link>
            <Link
              to="/docs/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-0 hover:text-white font-body py-1 px-4 mx-2 rounded-sm mr-px font-light tracking-wide',
                {
                  'text-gray-300': !location.pathname.includes('/docs/'),
                  'text-white bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/docs/')
                }
              )}
            >
              Docs
            </Link>
            <Link
              to="/plugins/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-0 hover:text-white font-body py-1 px-4 mx-2 rounded-sm mr-px font-light tracking-wide',
                {
                  'text-gray-300': !location.pathname.includes('/plugins/'),
                  'text-white bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/plugins/')
                }
              )}
            >
              Plugins
            </Link>

            <Link
              to="/logos/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-0 hover:text-white font-body py-1 px-4 mx-2 rounded-sm mr-px font-light tracking-wide',
                {
                  'text-gray-300': !location.pathname.includes('/logos/'),
                  'text-white bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/logos/')
                }
              )}
            >
              Logo
            </Link>
            <Link
              to="/example-reports/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-0 hover:text-white font-body py-1 px-4 mx-2 rounded-sm mr-px font-light tracking-wide',
                {
                  'text-gray-300': !location.pathname.includes('/example-reports/'),
                  'text-white bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/example-reports/')
                }
              )}
            >
              Example reports
            </Link>
          </div>
          <div className="lg:hidden">
            <Button
              onClick={() => { setNavOpened(true); }}
              noShadow
              className="text-white"
            >
              <MenuIcon />
            </Button>
          </div>
        </div>
      </header>
      <div className={classnames(
        'bg-black text-white fixed inset-0 z-20 px-4 transition-all',
        {
          'invisible opacity-0': !navOpened,
          'opacity-100 visible': navOpened,
        },
      )}
      style={{ backgroundImage: `url(${HeroBackgroundSrc})` }}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex justify-between items-center">
            <Link to="/" noBorder className="block uppercase">
                <img src={Logo} className="h-8 lg:h-10" alt="MultiQC Logo" />
            </Link>
            <Button
              onClick={() => { setNavOpened(false); }}
              noShadow
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="flex-1 py-8 overflow-y-auto text-center">
            <div
              className={classnames(
                'py-3 rounded-sm bg-black bg-opacity-0',
                {
                  'bg-opacity-30 hover:bg-opacity-50': location.pathname === '/'
                }
              )}>
              <Button
                  onClick={() => { handleNav('/') }}
                  noShadow
                  className="typo-intro"
              >
                  Home
              </Button>
            </div>
            <div
              className={classnames(
                'mt-4 py-3 rounded-sm bg-black bg-opacity-0',
                {
                  'bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/docs/')
                }
              )}>
              <Button
                  onClick={() => { handleNav('/docs/') }}
                  noShadow
                  className="typo-intro"
              >
                  Docs
              </Button>
            </div>
            <div
              className={classnames(
                'mt-4 py-3 rounded-sm bg-black bg-opacity-0',
                {
                  'bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/plugins/')
                }
              )}>
              <Button
                  onClick={() => { handleNav('/plugins/') }}
                  noShadow
                  className="typo-intro"
              >
                  Plugins
              </Button>
            </div>
            <div
              className={classnames(
                'mt-4 py-3 rounded-sm bg-black bg-opacity-0',
                {
                  'bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/modules/')
                }
              )}>
              <Button
                  onClick={() => { handleNav('/modules/') }}
                  noShadow
                  className="typo-intro"
              >
                  Modules
              </Button>
            </div>
            <div
              className={classnames(
                'mt-4 py-3 rounded-sm bg-black bg-opacity-0',
                {
                  'bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/logos/')
                }
              )}>
              <Button
                  onClick={() => { handleNav('/logos/') }}
                  noShadow
                  className="typo-intro"
              >
                  Logos
              </Button>
            </div>
            <div
              className={classnames(
                'mt-4 py-3 rounded-sm bg-black bg-opacity-0',
                {
                  'bg-opacity-30 hover:bg-opacity-50': location.pathname.includes('/example-reports/')
                }
              )}>
              <Button
                  onClick={() => { handleNav('/example-reports/') }}
                  noShadow
                  className="typo-intro"
              >
                  Example reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
