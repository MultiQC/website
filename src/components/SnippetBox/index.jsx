import classnames from "classnames";
import React, { useState } from "react";

import { TerminalIcon } from "website-components";

const columnsClassNames = ["", "w-full", "w-1/2", "w-1/3", "w-1/4", "w-1/5", "w-1/6"];

const getColumnClassName = (length) => {
  return `${columnsClassNames[length]}`;
};

const SnippetBox = ({ title, children }) => {
  const [active, setActive] = useState(0);
  const snippets = React.Children.toArray(children);

  return (
    <div className="overflow-hidden rounded-md border border-blue-600 bg-gray-800 shadow">
      <div className="flex items-center justify-center border-b border-blue-600 bg-blue-600 py-2">
        <TerminalIcon className="mr-3 h-6 w-6" />
        <span className="typo-intro">{title}</span>
      </div>
      <div className="px-4 py-2">
        {snippets.map((snippet, index) => (
          <div key={`snippet-${snippet.props.title}`} className="typo-small">
            {index === active && snippet}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-between border-t border-blue-600 bg-gray-800">
        {snippets.map((snippet, index) => (
          <button
            key={`snippet-btn-${snippet.props.title}`}
            className={classnames(getColumnClassName(snippets.length), "typo-small px-2 py-1 text-center", {
              "text-gray-200 hover:bg-gray-900 hover:text-gray-100": index !== active,
              "bg-blue-600 text-white": index === active,
            })}
            onClick={() => {
              setActive(index);
            }}
          >
            <code className="text-xs">{snippet.props.title}</code>
          </button>
        ))}
      </div>
    </div>
  );
};

const Item = ({ title, children }) => {
  return <pre className="text-xs font-light">{children}</pre>;
};

SnippetBox.Item = Item;

export default SnippetBox;
