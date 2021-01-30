import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';
import { _updateData } from '../helpers';
import { FormErrors } from './FormErrors';
import i18n from '../../i18n';

export default class EditModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: '',
      address: '',

      formErrors: { address: ''},
      addressValid: true,
      formValid: true
    };
  }

  componentDidMount() {
    const { id, address } = this.props.details;
    this.setState({ id, address })
  }

  validateField = (fieldName, value) => { 
    let fieldValidationErrors = this.state.formErrors;
    let addressValid = this.state.addressValid;

    switch (fieldName) {
      case 'address':
        addressValid = value.length > 5;
        fieldValidationErrors.address = addressValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        addressValid: addressValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.addressValid
    });
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  handleEdit = (e) => {
    e.preventDefault()
    let data = {
        id: this.state.id,
        address: this.state.address
    }
    let route = 'apartments/block/edit';
    let cb = () => this.setState({ msg: "Block has been edited." });

    _updateData({ route, data, cb })
}

  render() {
    const { editModalIsOpen, closeEditModal } = this.props;
    const { address } = this.state;
    return (
      <Modal size="lg" isOpen={editModalIsOpen} toggle={closeEditModal}>
        <ModalHeader toggle={closeEditModal}>{i18n.t('block.edit')}</ModalHeader>
        <ModalBody>
          <form onSubmit={this.closeEditModal}>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <label>{i18n.t('address')}</label>
                <input
                  name="address"
                  onChange={this.handleUserInput}
                  type="text"
                  ref="address"
                  className="form-control address"
                  value={address}
                />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{color:'red', marginTop:'2%'}} >
                  <FormErrors formErrors={this.state.formErrors} />
              </div>
            </div>

            <br />
            <div className="row">
              <div className="offset-xs-4 offset-sm-4 offset-md-4 offset-lg-4 col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <button
                  type="submit"
                  onClick={this.handleEdit}
                  method="POST"
                  className="btn btn-primary"
                  disabled={!this.state.formValid}>
                  {i18n.t('submit')}
                </button>
              </div>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <button toggle={this.toggle} className="btn btn-danger">
                  {i18n.t('cancel')}
                </button>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter />
      </Modal>
    );
  }
}
