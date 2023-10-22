import React, { Component } from 'react';
import axios from 'axios';
import Search from './Search';
import './App.css'; // Import your CSS file

class Users extends Component {
  constructor() {
    super();
    this.state = { users: [], loading: true };
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {
    axios.get(`http://localhost:8000/api/users`).then((response) => {
      this.setState({ users: response.data, loading: false });
    });
  }

  updateUserState = (filteredUsers) => {
    this.setState({ users: filteredUsers });
  }

  render() {
    const loading = this.state.loading;
    return (
      <>
        <Search updateUserState={this.updateUserState} />
        <div className="user-list-container">
          {loading ? (
            <div className="text-center loading-spinner">
              <span className="fa fa-spin fa-spinner fa-4x"></span>
            </div>
          ) : (
            <div className="user-list">
              {this.state.users.map((user) => (
                <div className="user-item">
                  <div className="user-details">
                    <h2>{user.Model}</h2>
                    <h3>RAM : {user.RAM}</h3>
                    <p>HDD : {user.HDD}</p>
                    <p>Location : {user.Location}</p>
                  </div>
                  <div className="user-price">
                    <h4>Price : {user.Price}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    );
  }
}

export default Users;
