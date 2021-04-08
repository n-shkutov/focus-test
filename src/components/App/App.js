import React from 'react';
import Map from 'components/Map';
import Search from 'components/Search';
import AtomProvider from 'store/store';
import global from 'styles/global.css';
import styles from './app.module.css';

const App = () => (
  <AtomProvider>
    <div className={styles.container}>
      <div className={styles.header}><h1>Netherlands weather</h1></div>
      <div className={styles.search}><Search /></div>
      <div className={`${styles.map} ${global.box}`}><Map /></div>
    </div>
  </AtomProvider>
);

export default App;
