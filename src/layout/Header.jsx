import classnames from "classnames";
import { navigate } from "gatsby";
import React, { useState } from "react";
import { Button, CloseIcon, Link, MenuIcon } from "website-components";

import HeroBackgroundSrc from "../images/background.png";
import Logo from "../images/logo-light.svg";

const Header = ({ location }) => {
  const [navOpened, setNavOpened] = useState(false);

  const handleNav = (url) => {
    setNavOpened(false);
    navigate(url);
  };

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="container-lg flex h-16 w-full flex-wrap items-center justify-between md:h-24">
          <Link to="/" noBorder className="block uppercase">
            <img
              src={Logo}
              className={classnames("h-8 lg:h-10", { hidden: location.pathname == "/" })}
              alt="MultiQC logo"
            />
          </Link>
          <div className="hidden items-center lg:flex">
            <Link
              to="https://github.com/ewels/MultiQC/releases"
              className="typo-small mr-5 text-xs text-gray-300"
              noBorder
            >
              Current version: v1.13
            </Link>
            <Link
              to="/"
              noBorder
              className={classnames(
                "mx-2 mr-px rounded-sm bg-black bg-opacity-0 py-1 px-4 font-body font-light tracking-wide hover:text-white",
                {
                  "text-gray-300": location.pathname != "/",
                  "bg-opacity-30 text-white hover:bg-opacity-50": location.pathname === "/",
                }
              )}
            >
              Home
            </Link>
            <Link
              to="/modules/"
              noBorder
              className={classnames(
                "mx-2 mr-px rounded-sm bg-black bg-opacity-0 py-1 px-4 font-body font-light tracking-wide hover:text-white",
                {
                  "text-gray-300": !location.pathname.includes("/modules/"),
                  "bg-opacity-30 text-white hover:bg-opacity-50": location.pathname.includes("modules/"),
                }
              )}
            >
              Tools
            </Link>
            <Link
              to="/docs/"
              noBorder
              className={classnames(
                "mx-2 mr-px rounded-sm bg-black bg-opacity-0 py-1 px-4 font-body font-light tracking-wide hover:text-white",
                {
                  "text-gray-300": !location.pathname.includes("/docs/"),
                  "bg-opacity-30 text-white hover:bg-opacity-50": location.pathname.includes("/docs/"),
                }
              )}
            >
              Docs
            </Link>
            <Link
              to="/plugins/"
              noBorder
              className={classnames(
                "mx-2 mr-px rounded-sm bg-black bg-opacity-0 py-1 px-4 font-body font-light tracking-wide hover:text-white",
                {
                  "text-gray-300": !location.pathname.includes("/plugins/"),
                  "bg-opacity-30 text-white hover:bg-opacity-50": location.pathname.includes("/plugins/"),
                }
              )}
            >
              Plugins
            </Link>

            <Link
              to="/logos/"
              noBorder
              className={classnames(
                "mx-2 mr-px rounded-sm bg-black bg-opacity-0 py-1 px-4 font-body font-light tracking-wide hover:text-white",
                {
                  "text-gray-300": !location.pathname.includes("/logos/"),
                  "bg-opacity-30 text-white hover:bg-opacity-50": location.pathname.includes("/logos/"),
                }
              )}
            >
              Logo
            </Link>
            <Link
              to="/example-reports/"
              noBorder
              className={classnames(
                "mx-2 mr-px rounded-sm bg-black bg-opacity-0 py-1 px-4 font-body font-light tracking-wide hover:text-white",
                {
                  "text-gray-300": !location.pathname.includes("/example-reports/"),
                  "bg-opacity-30 text-white hover:bg-opacity-50": location.pathname.includes("/example-reports/"),
                }
              )}
            >
              Example reports
            </Link>
          </div>
          <div className="lg:hidden">
            <Button
              onClick={() => {
                setNavOpened(true);
              }}
              noShadow
              className="text-white"
            >
              <MenuIcon />
            </Button>
          </div>
        </div>
      </header>
      <div
        className={classnames("fixed inset-0 z-20 bg-black px-4 text-white transition-all", {
          "invisible opacity-0": !navOpened,
          "visible opacity-100": navOpened,
        })}
        style={{ backgroundImage: `url(${HeroBackgroundSrc})` }}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" noBorder className="block uppercase">
              <img src={Logo} className="h-8 lg:h-10" alt="MultiQC Logo" />
            </Link>
            <Button
              onClick={() => {
                setNavOpened(false);
              }}
              noShadow
            >
              <CloseIcon />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto py-8 text-center">
            <div
              className={classnames("rounded-sm bg-black bg-opacity-0 py-3", {
                "bg-opacity-30 hover:bg-opacity-50": location.pathname === "/",
              })}
            >
              <Button
                onClick={() => {
                  handleNav("/");
                }}
                noShadow
                className="typo-intro"
              >
                Home
              </Button>
            </div>
            <div
              className={classnames("mt-4 rounded-sm bg-black bg-opacity-0 py-3", {
                "bg-opacity-30 hover:bg-opacity-50": location.pathname.includes("/docs/"),
              })}
            >
              <Button
                onClick={() => {
                  handleNav("/docs/");
                }}
                noShadow
                className="typo-intro"
              >
                Docs
              </Button>
            </div>
            <div
              className={classnames("mt-4 rounded-sm bg-black bg-opacity-0 py-3", {
                "bg-opacity-30 hover:bg-opacity-50": location.pathname.includes("/plugins/"),
              })}
            >
              <Button
                onClick={() => {
                  handleNav("/plugins/");
                }}
                noShadow
                className="typo-intro"
              >
                Plugins
              </Button>
            </div>
            <div
              className={classnames("mt-4 rounded-sm bg-black bg-opacity-0 py-3", {
                "bg-opacity-30 hover:bg-opacity-50": location.pathname.includes("/modules/"),
              })}
            >
              <Button
                onClick={() => {
                  handleNav("/modules/");
                }}
                noShadow
                className="typo-intro"
              >
                Modules
              </Button>
            </div>
            <div
              className={classnames("mt-4 rounded-sm bg-black bg-opacity-0 py-3", {
                "bg-opacity-30 hover:bg-opacity-50": location.pathname.includes("/logos/"),
              })}
            >
              <Button
                onClick={() => {
                  handleNav("/logos/");
                }}
                noShadow
                className="typo-intro"
              >
                Logos
              </Button>
            </div>
            <div
              className={classnames("mt-4 rounded-sm bg-black bg-opacity-0 py-3", {
                "bg-opacity-30 hover:bg-opacity-50": location.pathname.includes("/example-reports/"),
              })}
            >
              <Button
                onClick={() => {
                  handleNav("/example-reports/");
                }}
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
