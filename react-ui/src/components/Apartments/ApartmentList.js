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
    let route = `apartments/apartment/delete/${id}`;
    let error_callback = error => this.setState({ error });
    ;
    _deleteData({ route, id, error_callback });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let route = 'apartments/apartment/list';
    let success_callback = data => this.setState({ list: data });
    let error_callback = error => this.setState({ error });
    _fetchData({ route, success_callback, error_callback });
  }


  render() {
    const { list } = this.state;
    return (
      <div>
        <Card className="border-secondary">
          <h2 style={{ textAlign: 'center' }}>
            {i18n.t('apartment.list')}
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
                      <th style={{ textAlign: 'center' }} className="moveToCenter">{i18n.t('block')}</th>
                      <th style={{ textAlign: 'center' }}className="moveToCenter">{i18n.t('number')}</th>
                      <th style={{ textAlign: 'center' }} className="moveToCenter">{i18n.t('action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list && list.length > 0 && list.map((apartment, i) => (
                      <tr
                        style={{ cursor: 'pointer' }}
                        key={i}
                        >
                        <td>{i + 1}</td>
                        <td style={{ textAlign: 'center' }}>{apartment.block.address}</td>
                        <td style={{ textAlign: 'center' }}>
                          {apartment.number}
                        </td>
                        <td style={{ textAlign: 'center' }}>
                        <Button onClick={() => this.onPreviewOpen(apartment)} style={{ margin: 10 }}>
                          {i18n.t('apartment.preview')}
                        </Button>
                        <Button onClick={() => this.onEditOpen(apartment)} style={{ margin: 10 }}>
                          {i18n.t('apartment.edit')}
                        </Button>
                        <Button onClick={() => this.onDelete(apartment.id)} style={{ margin: 10 }}>
                          {i18n.t('apartment.delete')}
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
