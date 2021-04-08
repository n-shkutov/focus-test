import React, { useEffect } from 'react';
import { createStore } from '@reatom/core';
import { context } from '@reatom/react';
import { getAllData } from 'services/getAllData';
import { updateStore } from 'store/actions';

const { Provider } = context;

const AtomProvider = ({ children }) => {
  const store = createStore();

  useEffect(() => {
    getAllData().then((data) => {
      store.dispatch(updateStore(data));
    });
  }, []);

  // eslint-disable-next-line react/no-children-prop
  return <Provider value={store} children={children} />;
};

export default AtomProvider;
