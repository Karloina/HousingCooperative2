import React, { Component } from 'react';
import { Button, Card, Table } from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';
import { _fetchData, _deleteData, _updateData } from '../helpers';
import i18n from '../../i18n';
import moment from 'moment';
import EditModal from './EditModal';
import PreviewModal from './PreviewModal';
import { Link } from 'react-router-dom';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      error: '',
      details: '',
      editModalIsOpen: false,
      previewModalIsOpen: false
    };
    this.fetchData = this.fetchData.bind(this);
  }

  closePreviewModal = () => {
    this.setState({
      previewModalIsOpen: false,
    });
  };

  onPreviewOpen = (bill) => {
    this.setState({ 
      previewModalIsOpen: true,
      details: bill });
  }

  closeEditModal = () => {
    this.setState({
      editModalIsOpen: false,
    });
  };

   onEditOpen = (bill) => {
    this.setState({ 
      editModalIsOpen: true,
      details: bill });
   }

   onDelete = (id) => {
    let route = `bills/bill/delete/${id}`;
    let error_callback = error => this.setState({ error });
    
    _deleteData({ route, id, error_callback });
  }

  fetchData() {
    let route = 'bills/bill/list';
    let success_callback = data => this.setState({ list: data });
    let error_callback = error => this.setState({ error });
    _fetchData({ route, success_callback, error_callback });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { list } = this.state;
    const hasUserRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("user") > -1;
    return (
      <div>
        <Card className="border-secondary">
          <h2 style={{ textAlign: 'center' }}>
          {i18n.t('bill.list')}
          </h2>
          <div
            style={{
              width: '100%',
              height: '50vh',
            }}>
            <FreeScrollBar>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th />
                      <th style={{ textAlign: 'center' }} className="moveToCenter">{i18n.t('bill.date')}</th>
                      <th style={{ textAlign: 'center' }} className="moveToCenter">{i18n.t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                  {list && list.length > 0 && list.map((bill, i) => (
                      <tr
                        style={{ cursor: 'pointer' }}
                        key={i}
                        >
                        <td>{i + 1}</td>
                      
                        <td style={{ textAlign: 'center' }}>
                          {moment(bill.billDate).format('MM-DD-YYYY, hh:mm:ss')}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                        <Button onClick={() => this.onPreviewOpen(bill)} style={{ margin: 10 }}>
                          {i18n.t('bill.preview')}
                        </Button>
                        {hasUserRole && (
                        <Button onClick={() => this.onEditOpen(bill)} style={{ margin: 10 }}>
                          {i18n.t('bill.edit')}
                        </Button>)}
                        {hasUserRole && (
                        <Button onClick={() => this.onDelete(bill.id)} style={{ margin: 10 }}>
                          {i18n.t('bill.delete')}
                        </Button>)}

                        {bill.approved && (
                        <a href={"http://192.168.8.34:8081/bills/pdf/generatePdf/" + bill.id}>
                          <Button  style={{ margin: 10 }}>
                              PDF
                          </Button>
                        </a>)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
            </FreeScrollBar>
          </div>
          {this.state.editModalIsOpen && 
            <EditModal
              editModalIsOpen={this.state.editModalIsOpen}
              closeEditModal={this.closeEditModal}
              details={this.state.details}
            />}
            {this.state.previewModalIsOpen && 
            <PreviewModal
              previewModalIsOpen={this.state.previewModalIsOpen}
              closePreviewModal={this.closePreviewModal}
              details={this.state.details}
            />}
        </Card>
      </div>
    );
  }
}
