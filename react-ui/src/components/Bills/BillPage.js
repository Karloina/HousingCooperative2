import React, { Component } from 'react';
import AddModal from './AddModal';
import BillList from './BillList';
import { _fetchData, _deleteData, _updateData } from '../helpers';

export default class Billage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      details: {}
    };
  }
  
  render() {
    const hasUserRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("user") > -1;

    return (
      <div className="row" style={{ backgroundColor: '#ffffff' }}>
        <div className="col-xs-12 col-sm-12 col-md-4 col-lg-3">
        {hasUserRole && (<AddModal />)}
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6">
          <div className="">
            <BillList />
          </div>
          <br />
        </div>
      </div>
    );
  }
}
