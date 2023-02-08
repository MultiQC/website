import classnames from 'classnames';
import React, { useRef, useState } from 'react';

import { TerminalIcon } from 'website-components';

const columnsClassNames = [
  '',
  'w-full',
  'w-1/2',
  'w-1/3',
  'w-1/4',
  'w-1/5',
  'w-1/6'
];

const getColumnClassName = (length) => {
  return `${columnsClassNames[length]}`;
};

const SnippetBox = ({ title, children }) => {
  const [ active, setActive ] = useState(0);
  const snippet = useRef();
  const snippets = React.Children.toArray(children);

  return (
    <div className="border bg-gray-800 border-blue-600 rounded-md overflow-hidden shadow">
      <div className="flex items-center justify-center bg-blue-600 border-b border-blue-600 py-2">
        <TerminalIcon className="h-6 w-6 mr-3" />
        <span className="typo-intro">
          {title}
        </span>
      </div>
      <div className="px-4 py-2">
        {snippets.map((snippet, index) => (
          <div className="typo-small">
            {(index === active) && snippet}
          </div>
        ))}
      </div>
      <div className="bg-gray-800 flex justify-between w-full border-t border-blue-600">
        {snippets.map((snippet, index) => (
          <button
            className={classnames(
              getColumnClassName(snippets.length),
              'typo-small text-center px-2 py-1',
              {
                'text-gray-200 hover:text-gray-100 hover:bg-gray-900': index != active,
                'text-white bg-blue-600': index === active,
              },
            )}
            onClick={() => { setActive(index) }}
          >
            <code className='text-xs'>{snippet.props.title}</code>
          </button>
        ))}
      </div>
    </div>
  );
};

const Item = ({ title, children }) => {
  return (
    <pre className="text-xs font-light">
      {children}
    </pre>
  );
};

SnippetBox.Item = Item;

export default SnippetBox;
