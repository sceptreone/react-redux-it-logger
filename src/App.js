import React, { Fragment } from 'react';
import './App.css';

import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';

function App() {
  return (
    <Fragment>
      <SearchBar />
      <Logs />
    </Fragment>
  );
}

export default App;
