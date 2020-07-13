import React, { Fragment } from 'react';
import './App.css';

import SearchBar from './components/layout/SearchBar';
import Logs from './components/logs/Logs';
import AddBtn from './components/layout/AddBtn';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <SearchBar />
        <Logs />
        <AddBtn />
      </Fragment>
    </Provider>
  );
}

export default App;
