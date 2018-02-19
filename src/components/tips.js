import React, { Component } from 'react';
import LNTips from './LNTips.js';

var styles = {
    container:{
        padding: '5px',
        fontSize: '11px',
        backgroundColor: '#FFFFFF',
        position: 'fixed',
        bottom: '0px'
    },
}

export default class Tips extends Component {
    render() {
        return (
        <div style={styles.container}>
            <table className="tips">
                <tbody>
                  <tr>
                      <td></td>
                      <td>Created by <a target="_blank" href="http://www.samjhill.com"> Sam J Hill</a></td>
                  </tr>
                    <tr>
                        <td>LN ⚡</td>
                        <td><LNTips /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        );
    }
}
