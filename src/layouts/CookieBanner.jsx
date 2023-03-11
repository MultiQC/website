//
//
// TODO - OLD GATSBY COMPONENT - NEEDS TO BE REFACTORED
//
//

import classnames from "classnames";
import React from "react";
import { useCookies } from "react-cookie";
import { Button, Link } from "website-components";

import iconCookieSource from "../images/icons/cookie.svg";
import isSSR from "../utils/isSSR";

const CookieBanner = () => {
  const [cookies, setCookie] = useCookies(["useracceptedcookies"]);

  const acceptAll = (value) => {
    setCookie("useracceptedcookies", value, {
      path: "/",
      maxAge: 3000 * 24 * 60 * 60,
    });
  };

  return (
    !isSSR && (
      <div
        className={classnames("fixed bottom-0 z-10 w-full bg-gray-50 py-4 md:py-3", {
          hidden: cookies.useracceptedcookies !== undefined,
        })}
      >
        <div className="container-lg">
          <div className="flex items-center justify-between">
            <div className="mr-4 hidden md:block">
              <img src={iconCookieSource} className="h-8 w-8" alt="Cookie banner" />
            </div>
            <div className="w-5/12 justify-self-start">
              <p className="typo-small">
                This website uses cookies to offer you a better browsing experience. Find out more
                on{" "}
                <Link to="/privacy-policy/" className="text-green-600">
                  how we use cookies
                </Link>
                .
              </p>
            </div>
            <div className="row flex-1 justify-center md:justify-end">
              <div className="col mt-4 md:mt-0">
                <Button
                  variant="secondary"
                  size="sm"
                  noShadow
                  onClick={() => {
                    acceptAll(false);
                  }}
                >
                  Keep only essential cookies
                </Button>
              </div>
              <div className="col mt-4 md:mt-0">
                <Button
                  variant="primary"
                  size="sm"
                  noShadow
                  onClick={() => {
                    acceptAll(true);
                  }}
                >
                  Accept all cookies
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CookieBanner;
