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

const Header = ({ location }) => {
  const [navOpened, setNavOpened] = useState(false);

  const handleNav = (url) => {
    setNavOpened(false);
    navigate(url);
  };

  return (
    <>
      <header className="relative bg-gray-800 z-10 inset-x-0 top-0">
        <div className="container-lg flex flex-wrap items-center justify-between w-full h-16 md:h-24">
          <Link to="/" noBorder className="block uppercase">
              <img src={Logo} className="h-8 lg:h-10" alt="" />
          </Link>
          <div className="lg:flex items-center hidden">
            <Link
              to="/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-10 font-body py-1 px-4 rounded-sm mr-px font-normal tracking-wide',
                {
                  'text-white': location.pathname != '/',
                  'text-blue-600': location.pathname === '/'
                }
              )}
            >
              Home
            </Link>
            <Link
              to="/docs/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-10 font-body py-1 px-4 rounded-sm mr-px font-normal tracking-wide',
                {
                  'text-white': !location.pathname.includes('/docs/'),
                  'text-blue-600': location.pathname.includes('/docs/')
                }
              )}
            >
              Docs
            </Link>
            <Link
              to="/plugins/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-10 font-body py-1 px-4 rounded-sm mr-px font-normal tracking-wide',
                {
                  'text-white': !location.pathname.includes('/plugins/'),
                  'text-blue-600': location.pathname.includes('/plugins/')
                }
              )}
            >
              Plugins
            </Link>
            <Link
              to="/logo/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-10 font-body py-1 px-4 rounded-sm mr-px font-normal tracking-wide',
                {
                  'text-white': !location.pathname.includes('/logo/'),
                  'text-blue-600': location.pathname.includes('/logo/')
                }
              )}
            >
              Logo
            </Link>
            <Link
              to="/example-reports/"
              noBorder
              className={classnames(
                'bg-black bg-opacity-10 font-body py-1 px-4 rounded-sm mr-px font-normal tracking-wide',
                {
                  'text-white': !location.pathname.includes('/example-reports/'),
                  'text-blue-600': location.pathname.includes('/example-reports/')
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
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex justify-between items-center">
            <Link to="/" noBorder className="block uppercase">
                <img src={Logo} className="h-8 lg:h-10" alt="Nextflow Summit 2022 logo" />
            </Link>
            <Button
              onClick={() => { setNavOpened(false); }}
              noShadow
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="flex-1 py-16 overflow-y-auto text-center">
            <div>
              <Button
                  onClick={() => { handleNav('/') }}
                  noShadow
                  className="typo-intro"
              >
                  Home
              </Button>
            </div>
            <div className="mt-4">
              <Button
                  onClick={() => { handleNav('/docs/') }}
                  noShadow
                  className="typo-intro"
              >
                  Docs
              </Button>
            </div>
            <div className="mt-4">
              <Button
                  onClick={() => { handleNav('/plugins/') }}
                  noShadow
                  className="typo-intro"
              >
                  Plugins
              </Button>
            </div>
            <div className="mt-4">
              <Button
                  onClick={() => { handleNav('/logo/') }}
                  noShadow
                  className="typo-intro"
              >
                  Logo
              </Button>
            </div>
            <div className="mt-4">
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
