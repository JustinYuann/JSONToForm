// import { useState, useEffect } from 'react';
import Element from './components/Element';
import Home from './components/Home.js'
import React from 'react'
import { BrowserRouter, Route, Link, Switch} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {apiResponse:""}
  }

  render(){
    const App = () => (
      <div>
        <Switch>
          <Route path = '/CreateForm' 
            render = {() =>(
              <Element/>
            )}
          />
          <Route exact path='/' component={Home}/>
        </Switch>
      </div>
    )

    return (
      <Switch>
        <App />
      </Switch>
    );
  }
}

export default App;