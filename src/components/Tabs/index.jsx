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
    <button onClick={() => { setCurrent(index) }} noBorder className={classnames(
      'typo-small bg-gray-800 block border border-blue-600 px-4 py-1',
      {
        'mx-px first:ml-0 last:mr-0 first:rounded-l-sm last:rounded-r-sm': !vertical,
        'my-px first:mt-0 last:mb-0 first:rounded-t-sm last:rounded-b-sm': vertical,
        'text-white hover:bg-gray-900': current != index,
        'bg-blue-600 text-white': current === index,
      }
    )}
    >
      {children}
    </button>
  );
};

Tabs.Item = Item;

export default Tabs;
