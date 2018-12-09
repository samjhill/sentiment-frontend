import React, { Component } from 'react';
import { slide as BurgerMenu } from 'react-burger-menu';
import Toggle from 'react-toggle';
import styled from 'styled-components';
import { Link } from "react-router-dom";

import { loadSettings, saveSetting } from '../util/settings';

const StyledSpan = styled.span`
  top: -5px;
  left: 5px;
  position: relative;
`;

const StyledLinks = styled.ul`
  margin-top: 3rem;
  list-style-type: none;
  padding-inline-start: 0px;
  a {
    color: white;
    font-weight: bold;
  }
  li {
    margin: 1rem 0;
    font-size: 2.5rem;
  }
`;

const styles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px'
  },
  bmBurgerBars: {
    background: 'white'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    width: '320px',
    top: '0',
  },
  bmMenu: {
    background: '#373a47',
    padding: '2.5em 1.5em 0',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em'
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

export default class Menu extends React.Component {
  constructor() {
    super();
    this.state = {
      settings: null,
    }
  }

  componentDidMount = async() => {
    const settings = loadSettings();
    this.setState({ settings });
  }

  showSettings = () => {
    this.setState({ isOpen: !this.state.isOpen})
  }

  handleChangeSetting = (key, e) => {
    const settings = this.state.settings;
    settings[key].value = e.target.checked;
    console.log(key, e.target.checked);
    saveSetting(key, e.target.checked);

    if (this.props.onChangeSetting) {
      this.props.onChangeSetting(settings);
    }
  }

  render() {
    const { settings } = this.state;
    if (!settings){
      return null;
    }

    return (
      <BurgerMenu styles={styles}>
          <StyledLinks>
            <li><Link to="/"><i className="fa fa-home" /> Home</Link></li>
            <li><Link to="/about/"><i className="fa fa-question" /> About this project</Link></li>
          </StyledLinks>

          {Object.keys(settings).map(settingName => (
            <label key={settingName} className="toggle">
              <Toggle
                checked={this.state.settings[settingName].value}
                onChange={(e) => this.handleChangeSetting(settingName, e)}
              />
              <StyledSpan>{this.state.settings[settingName].label}</StyledSpan>
            </label>
          ))}

          <p>Created by <a target="_blank" href="http://www.samjhill.com">Sam Hill</a></p>
      </BurgerMenu>
    );
  }
}
