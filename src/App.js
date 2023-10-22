import React, { Component } from 'react';
import './App.css';
import Users from './User';
// import Search from './Search';

class UserSearchApp extends Component {
  render() {
    return (
      <div className="app">
        <Users />
      </div>
    );
  }
}

export default UserSearchApp;
