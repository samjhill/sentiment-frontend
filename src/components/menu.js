import React, { Component } from 'react';
import { slide as Menu } from 'react-burger-menu';
import Toggle from 'react-toggle';
import { loadSettings, saveSetting } from '../util/settings';
import styled from 'styled-components';

const StyledSpan = styled.span`
  top: -5px;
  left: 5px;
  position: relative;
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

export default class MenuComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      settings: null,
    }
  }

  componentDidMount = async() => {
    const settings = await loadSettings();
    this.setState({ settings });
  }

  showSettings = () => {
    this.setState({ isOpen: !this.state.isOpen})
  }

  handleChangeSetting = (key, e) => {
    const settings = this.state.settings;
    settings[key].value = e.target.checked;
    this.setState({ settings });
    saveSetting(key, e.target.checked);

    if (this.props.onChangeSetting) {
      this.props.onChangeSetting(key, e.target.checked);
    }
  }

  render () {
    const { settings } = this.state;
    if (!settings){
      return null;
    }

    return (
      <Menu styles={styles}>
          {Object.keys(settings).map(settingName => (
            <label key={settingName} className="toggle">
              <Toggle
                checked={this.state.settings[settingName].value}
                onChange={(e) => this.handleChangeSetting(settingName, e)}
              />
              <StyledSpan>{this.state.settings[settingName].label}</StyledSpan>
            </label>
          ))}
      </Menu>
    );
  }
}
