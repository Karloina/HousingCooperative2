import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { _updateData, _fetchData, _postData } from '../helpers';
import i18n from '../../i18n';

export default class PreviewModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      login: '',
      lastName: '',
      firstName: '',
      enabled: false,
      email: '',
      telephone: '',
      role: '',
      apartmentId: ''
    }
  }

  componentDidMount() {
    const { login, lastName, firstName, enabled, email, telephone, role, apartmentId } = this.props.details;
    this.setState({ login, lastName, firstName, enabled, email, telephone, role, apartmentId })
  }

  render() {
    const { previewModalIsOpen, closePreviewModal } = this.props;
    const { login, lastName, firstName, enabled, email, telephone, role, apartmentId } = this.state;
    return (
      <Modal size="lg" isOpen={previewModalIsOpen} toggle={closePreviewModal}>
        <ModalHeader toggle={closePreviewModal}>{i18n.t('user.preview')}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('login')}: {login}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('firstName')}: {firstName}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('lastName')}: {lastName}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('email')}: {email}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('telephone')}: {telephone}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('role')}: {role}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('apartment')}: {apartmentId}</label>
            </div>

            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('enabled')}: {enabled ? i18n.t('yes') : i18n.t('no')}</label>
            </div>

          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}
