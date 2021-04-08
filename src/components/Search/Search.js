import React from 'react';
import { useAction, useAtom } from '@reatom/react';
import { setSearchValue } from 'store/actions';
import { searchValueAtom } from 'store/atoms';
import styles from './search.module.css';

const Search = () => {
  const value = useAtom(searchValueAtom);

  const onChange = useAction(({ target }) => (target?.value.trim()
    ? setSearchValue(target?.value)
    : setSearchValue('')
  ));

  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder="Type here to find your city..."
    />
  );
};

export default Search;
