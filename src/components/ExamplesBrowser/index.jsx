import classnames from 'classnames';
import React, { useState } from 'react';

import {
  Button,
} from 'website-components';

import MultiQCIconSrc from '../../images/icons/multiqc.svg';

const ExamplesBrowser = ({ items, hasDetails }) => {
  const [ active, setActive ] = useState(0);

  return (
    <div className="border border-gray-200 rounded-md overflow-hidden shadow">
      {items.length === 1 && (
        <div className="bg-gray-100 border-b border-gray-200 flex">
          <div className="flex px-4 pt-4 pb-2">
            <img src={MultiQCIconSrc} className="h-6 w-6 mr-2" />
            <span className="typo-small -mt-0.5">
              Example Report: {items[0].title}
            </span>
          </div>
        </div>
      )}
      {items.length > 1 && (
        <div className="bg-gray-100 border-b border-gray-200 flex">
          <div className="flex px-4 pt-4 pb-2 lg:w-[250px]">
            <img src={MultiQCIconSrc} className="h-6 w-6 mr-2" />
            <span className="typo-small -mt-0.5">
              Example Reports
            </span>
          </div>
          <div className="flex pt-2">
            {items.map((item, index) => (
              <div>
                <button
                  className={classnames('typo-small bg-gray-2 px-4 h-full rounded-t-sm', {
                    'hover:bg-white': index != active,
                    'bg-gray-200 hover:bg-gray-200': index === active,
                  })}
                  onClick={() => { setActive(index) }}
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
        <iframe src={items[active].embed} className="w-full h-[600px]" />
      </div>
    </div>
  );
};

export default ExamplesBrowser;
