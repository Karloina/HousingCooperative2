import React, { Component } from 'react';
import AddModal from './AddModal';
import UserList from './UserList';
import { _fetchData, _deleteData, _updateData } from '../helpers';

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {}
    };
  }

  render() {
    return (
      <div className="row" style={{ backgroundColor: '#ffffff' }}>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
          <AddModal />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
          <div className="">
            <UserList />
          </div>
          <br />
        </div>
      </div>
    );
  }
}
