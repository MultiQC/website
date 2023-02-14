import classnames from "classnames";
import React, { useState } from "react";

import { Button } from "website-components";

import MultiQCIconSrc from "../../images/icons/multiqc.svg";

const ExamplesBrowser = ({ items, hasDetails }) => {
  const [active, setActive] = useState(0);

  return (
    <div className="overflow-hidden rounded-md border border-gray-200 shadow">
      {items.length === 1 && (
        <div className="flex border-b border-gray-200 bg-gray-100">
          <div className="flex px-4 pt-4 pb-2">
            <img
              src={MultiQCIconSrc}
              alt="MultiQC Logo"
              className="mr-2 h-6 w-6"
            />
            <span className="typo-small -mt-0.5">
              Example Report: {items[0].title}
            </span>
          </div>
        </div>
      )}
      {items.length > 1 && (
        <div className="flex border-b border-gray-200 bg-gray-100">
          <div className="flex px-4 pt-4 pb-2 lg:w-[250px]">
            <img
              src={MultiQCIconSrc}
              alt="MultiQC Logo"
              className="mr-2 h-6 w-6"
            />
            <span className="typo-small -mt-0.5">Example Reports</span>
          </div>
          <div className="flex pt-2">
            {items.map((item, index) => (
              <div key={`example-report-btn-${item.title}`}>
                <button
                  className={classnames(
                    "typo-small bg-gray-2 h-full rounded-t-sm px-4",
                    {
                      "hover:bg-white": index !== active,
                      "bg-gray-200 hover:bg-gray-200": index === active,
                    }
                  )}
                  onClick={() => {
                    setActive(index);
                  }}
                >
                  {item.title}
                </button>
              </div>
            ))}
          </div>
          {hasDetails && (
            <div className="grow py-2 px-4 text-right">
              <Button to={items[active].path} variant="secondary" size="sm">
                See report details
              </Button>
            </div>
          )}
        </div>
      )}
      <div>
        <iframe
          src={items[active].embed}
          title="Example Report"
          className="h-[600px] w-full"
        />
      </div>
    </div>
  );
};

export default ExamplesBrowser;
