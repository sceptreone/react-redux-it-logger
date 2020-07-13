import React, { Fragment } from 'react';
import './App.css';

import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';

function App() {
  return (
    <Fragment>
      <SearchBar />
      <Logs />
      <AddBtn />
    </Fragment>
  );
}

export default App;
