import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Home extends Component {
  render() {
    return (
    <div className="App">
      <h1>Create a JSON Form</h1>
      {/* Link to List.js */}
      <Link to={'./CreateForm'}>
        <button variant="raised">
            Upload JSON
        </button>
      </Link>
    </div>
    );
  }
}


export default Home