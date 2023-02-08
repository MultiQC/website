import classnames from 'classnames';
import React, { createContext, useContext } from 'react';
import { Link } from 'website-components';

import PropTypes from '../../utils/PropTypes';

const TabsContext = createContext();

const Tabs = ({ children, current, setCurrent, vertical }) => {
  return (
    <div className={classnames('rounded-sm overflow-hidden', {
        'inline-flex': !vertical,
        'flex flex-col': vertical,
      })}
    >
      <TabsContext.Provider value={{ current, setCurrent, vertical }}>
        {children}
      </TabsContext.Provider>
    </div>
  );
};

const Item = ({ children, index }) => {
  const { current, setCurrent, vertical } = useContext(TabsContext);

  return (
    <button onClick={() => { setCurrent(index) }} className={classnames(
      'typo-small text-white bg-gray-700 hover:bg-gray-600 block border border-gray-800 px-4 py-2 text-left',
      {
        'first:ml-0 border-r-0 last:border-r last:mr-0 first:rounded-l-sm last:rounded-r-sm': !vertical,
        'first:mt-0 border-b-0 last:border-b last:mb-0 first:rounded-t-sm last:rounded-b-sm': vertical,
        'bg-neutral-600': current === index,
      }
    )}
    >
      {children}
    </button>
  );
};

Tabs.Item = Item;

export default Tabs;
