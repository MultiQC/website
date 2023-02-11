import classnames from "classnames";
import React, { createContext, useContext } from "react";

const TabsContext = createContext();

const Tabs = ({ children, current, setCurrent, vertical, small }) => {
  return (
    <div
      className={classnames("overflow-hidden rounded-sm", {
        "inline-flex": !vertical,
        "flex flex-col": vertical,
      })}
    >
      <TabsContext.Provider value={{ current, setCurrent, vertical, small }}>{children}</TabsContext.Provider>
    </div>
  );
};

const Item = ({ children, index }) => {
  const { current, setCurrent, vertical, small } = useContext(TabsContext);

  return (
    <button
      onClick={() => {
        setCurrent(index);
      }}
      className={classnames("block border border-gray-800 bg-gray-700 text-left text-white hover:bg-gray-600", {
        "border-r-0 first:ml-0 first:rounded-l-sm last:mr-0 last:rounded-r-sm last:border-r": !vertical,
        "border-b-0 first:mt-0 first:rounded-t-sm last:mb-0 last:rounded-b-sm last:border-b": vertical,
        "typo-small px-4 py-2": !small,
        "typo-small text-red px-2 py-0.5 text-xs": small,
        "bg-neutral-600": current === index,
      })}
    >
      {children}
    </button>
  );
};

Tabs.Item = Item;

export default Tabs;
