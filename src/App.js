import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from './components/menu';

// pages
import Home from './pages/home';
import About from './pages/about';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Menu onChangeSetting={this.handleChangeSetting} />

          <Route path="/" exact component={Home} />

          <Route path="/about/" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
