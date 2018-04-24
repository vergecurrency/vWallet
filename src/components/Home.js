// @flow
import React, { Component } from 'react';
import TransactionList from './TransactionList';
import AccountBar from './AccountBar';

export default class Home extends Component {
  render() {
    return (
      <div id="app">
        <AccountBar />
        <TransactionList />
      </div>
    );
  }
}
