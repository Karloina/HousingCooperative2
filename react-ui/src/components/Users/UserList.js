import React, { Component } from 'react';
import { Button, Card, Table } from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';
import { _fetchData, _deleteData } from '../helpers';
import i18n from '../../i18n';
import EditModal from './EditModal';
import PreviewModal from './PreviewModal';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      error: '',
      details: {},
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

  onPreviewOpen = (user) => {
    this.setState({ 
      previewModalIsOpen: true,
      details: user });
  }

  closeEditModal = () => {
    this.setState({
      editModalIsOpen: false,
    });
  };

   onEditOpen = (user) => {
    this.setState({ 
      editModalIsOpen: true,
      details: user });

   }

   onDelete = (id) => {
    let route = `users/appUser/delete/${id}`;
    let error_callback = error => this.setState({ error });
    
    _deleteData({ route, id, error_callback });
    this.fetchData();
  }

  fetchData() {
    let route = 'users/appUser/list';
    let success_callback = data => this.setState({ list: data });
    let error_callback = error => this.setState({ error });
    _fetchData({ route, success_callback, error_callback });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { list } = this.state;
    return (
      <div>
        <Card className="border-secondary">
          <h2 style={{ textAlign: 'center' }}>
          {i18n.t('user.list')}
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
                      <th style={{ textAlign: 'center' }}>{i18n.t('firstName')}</th>
                      <th style={{ textAlign: 'center' }} className="moveToCenter">{i18n.t('lastName')}</th>
                      <th style={{ textAlign: 'center' }} className="moveToCenter">{i18n.t('enabled')}</th>
                      <th style={{ textAlign: 'center' }} className="moveToCenter">{i18n.t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                  {list && list.length > 0 && list.map((user, i) => (
                      <tr
                        style={{ cursor: 'pointer' }}
                        key={i}>
                        <td>{i + 1}</td>
                        <td style={{ textAlign: 'center' }}>{user.firstName}</td>
                        <td style={{ textAlign: 'center' }}>
                          {user.lastName}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          {user.enabled ? i18n.t('yes') : i18n.t('no')}
                        </td>

                        <td style={{ textAlign: 'center' }}>
                        <Button onClick={() => this.onPreviewOpen(user)} style={{ margin: 10 }}>
                          {i18n.t('user.preview')}
                        </Button>
                        <Button onClick={() => this.onEditOpen(user)} style={{ margin: 10 }}>
                          {i18n.t('user.edit')}
                        </Button>
                        <Button onClick={() => this.onDelete(user.id)} style={{ margin: 10 }}>
                          {i18n.t('user.delete')}
                        </Button>
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
