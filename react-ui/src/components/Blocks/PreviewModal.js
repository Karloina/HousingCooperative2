import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button } from 'reactstrap';
import { _updateData, _fetchData, _postData } from '../helpers';
import i18n from '../../i18n';

export default class PreviewModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: '',
      address: ''
    }
  }

  componentDidMount() {
    const { id, address } = this.props.details;
    this.setState({ id, address })
  }

  render() {
    const { previewModalIsOpen, closePreviewModal } = this.props;
    const { address } = this.state;
    return (
      <Modal size="lg" isOpen={previewModalIsOpen} toggle={closePreviewModal}>
        <ModalHeader toggle={closePreviewModal}>{i18n.t('bill.preview')}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
              <label>{i18n.t('address')}: {address}</label>
            </div>
          </div>
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}
