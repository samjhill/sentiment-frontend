import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from './components/menu';
import { loadSettings } from './util/settings';

// pages
import Home from './pages/home';
import About from './pages/about';

class App extends Component {
  constructor() {
    super();
    this.state = {
      settings: null,
    }
  }

  componentDidMount() {
    this.handleLoadSettings();
  }

  handleLoadSettings = () => {
    const settings = loadSettings();
    this.setState({ settings });
  }

  handleChangeSetting = async (settings) => {
    this.setState({ settings });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Menu onChangeSetting={this.handleChangeSetting} />

          <Route path="/" exact render={(props) => <Home {...props} settings={this.state.settings} />} />

          <Route path="/about/" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
