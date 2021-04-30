import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from "react-router-dom";

import './index.css';
import App from './App.js';

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));