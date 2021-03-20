import React from 'react';
import ReactDOM from 'react-dom';
import {nanoid} from 'nanoid';
import './index.css';
import App from './App';

const DATA = [
  { id: nanoid(), name: "Eat", completed: true },
  { id: nanoid(), name: "Code", completed: false },
  { id: nanoid(), name: "Sleep", completed: false }
];

ReactDOM.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
  document.getElementById('root')
)
