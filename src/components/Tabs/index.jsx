import classnames from "classnames";
import React, { createContext, useContext } from "react";

const TabsContext = createContext();

const Tabs = ({ children, current, setCurrent, vertical }) => {
  return (
    <div
      className={classnames("overflow-hidden rounded-sm", {
        "inline-flex": !vertical,
        "flex flex-col": vertical,
      })}
    >
      <TabsContext.Provider value={{ current, setCurrent, vertical }}>{children}</TabsContext.Provider>
    </div>
  );
};

const Item = ({ children, index }) => {
  const { current, setCurrent, vertical } = useContext(TabsContext);

  return (
    <button
      onClick={() => {
        setCurrent(index);
      }}
      className={classnames(
        "typo-small block border border-gray-800 bg-gray-700 px-4 py-2 text-left text-white hover:bg-gray-600",
        {
          "border-r-0 first:ml-0 first:rounded-l-sm last:mr-0 last:rounded-r-sm last:border-r": !vertical,
          "border-b-0 first:mt-0 first:rounded-t-sm last:mb-0 last:rounded-b-sm last:border-b": vertical,
          "bg-neutral-600": current === index,
        }
      )}
    >
      {children}
    </button>
  );
};

Tabs.Item = Item;

export default Tabs;
