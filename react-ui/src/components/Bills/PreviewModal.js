import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { _updateData, _fetchData, _postData } from '../helpers';
import { notify } from 'react-notify-toast';
import i18n from '../../i18n';

export default class PreviewModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      new: props.details,
      id: '',
      hotWater: '',
      coolWater: '',
      electricity: '',
      gas: '',
      sewage: '',
      approved: '',
      heating: '',
      modal: false,
      callbackResult: ''
    }
  }

  componentDidMount() {
    const { id, hotWater, coolWater, electricity, gas, sewage, approved, heating } = this.props.details;
    this.setState({ id, hotWater, coolWater, electricity, gas, sewage, approved, heating })
  }

  onApprove = (e) => {
    const data = {};
    let route = `bills/bill/approve/${this.props.details.id}`;
    let callback = () => {
      notify.show(data.message || 'Record Submitted', 'custom', 3000, 'blue');
    };

    let error_cb = (error) => {
      return notify.show(`Bad response from server`, 'custom', 3000, 'red');
    };

    _updateData({ route, data, callback, error_cb });
    this.setState({ approved: true });
    e.preventDefault();
  }

  render() {
    const { previewModalIsOpen, closePreviewModal } = this.props;
    const { hotWater, coolWater, electricity, gas, sewage, approved, heating } = this.state;
    const hasAdminRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("administrator") > -1;
    const hasManagerRole = window.keycloak.tokenParsed.realm_access.roles.indexOf("manager") > -1;
    return (
      <Modal size="lg" isOpen={previewModalIsOpen} toggle={closePreviewModal}>
        <ModalHeader toggle={closePreviewModal}>{i18n.t('bill.preview')}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('hotWater')}: {hotWater}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('coolWater')}: {coolWater}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('heating')}: {heating}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('electricity')}: {electricity}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('gas')}: {gas}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('sewage')}: {sewage}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('approved')}: {approved ? i18n.t('yes') : i18n.t('no')}</label>
            </div>

          </div>
        </ModalBody>
        {!approved && (hasAdminRole || hasManagerRole) &&
          <Button onClick={this.onApprove} style={{ margin: 10 }}>
            {i18n.t('approve')}
          </Button>}
        <ModalFooter />
      </Modal>
    );
  }
}
