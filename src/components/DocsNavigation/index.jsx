import classnames from "classnames";
import React from "react";

import { Link } from "website-components";

const DocsNavigation = ({ docs, location }) => {
  return (
    <>
      {docs.map((doc) => (
        <>
          {doc.isSection && (
            <div className="mt-4 first:mt-0">
              <div className="typo-intro">
                <Link
                  to={doc.path}
                  noBorder
                  className={classnames({
                    "text-blue-600": doc.path === location.pathname,
                  })}
                >
                  {doc.title}
                </Link>
              </div>
              <div className="border-l-2 border-gray-200 pl-2">
                {docs.map((childDoc) => (
                  <>
                    {childDoc.path.includes(doc.path) &&
                      childDoc.path !== doc.path && (
                        <div className="typo-body ml-4 mt-4">
                          <Link
                            to={childDoc.path}
                            noBorder
                            className={classnames({
                              "font-medium text-blue-600":
                                childDoc.path === location.pathname,
                              "text-gray-600 hover:text-black":
                                childDoc.path !== location.pathname,
                            })}
                          >
                            {childDoc.title}
                          </Link>
                        </div>
                      )}
                  </>
                ))}
              </div>
            </div>
          )}
        </>
      ))}
    </>
  );
};

export default DocsNavigation;
