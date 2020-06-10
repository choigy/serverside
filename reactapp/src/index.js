import React from 'react';
import ReactDOM from 'react-dom';
import Customer from './components/Customer';
import './index.css';
import App from './App';
import {Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

function(){
  return(
    <div>
      <Customer />
    </div>
  )
}

ReactDOM.render(<App /> document.getElementById('root')
);


serviceWorker.unregister();

