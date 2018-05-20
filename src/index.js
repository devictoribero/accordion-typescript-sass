import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';

import store from './store';

import SearchSong from './pages/searchSong';

import 'normalize.css';
import './styles/main.sass'

ReactDOM.render((
  <Provider store={store}>
    <BrowserRouter>
      <SearchSong />
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
