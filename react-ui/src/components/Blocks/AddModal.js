import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FormErrors } from './FormErrors';
import { _fetchData, _postData } from '../helpers';
import Notifications, { notify } from 'react-notify-toast';
import i18n from '../../i18n';

class AddModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      address: '',
      blockManager: '',

      formErrors: { address: ''　},
      // formErrors: { address: '', blockManager: ''},
      addressValid: false,
      // blockManagerValid: false,
      formValid: false,
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  validateField = (fieldName, value) => { 
    let fieldValidationErrors = this.state.formErrors;
    let addressValid = this.state.addressValid;
    // let blockManagerValid = this.state.blockManagerValid;

    switch (fieldName) {
      // case 'blockManager':
      //   blockManagerValid = value != null;
      //   fieldValidationErrors.blockManager = blockManagerValid ? '' : ' must be chosen';
      //   break;
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
        addressValid: addressValid,
        // blockManagerValid: blockManagerValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.addressValid
        // this.state.blockManagerValid
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

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {};
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }

    let route = 'apartments/block/add';
    let callback = () => {
      notify.show(data.message || 'Record Submitted', 'custom', 3000, 'blue');
    };

    let error_cb = (error) => {
      return notify.show(`Bad response from server`, 'custom', 3000, 'red');
    };
    _postData({ route, data, callback, error_cb });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle} style={{ margin: 10 }}>
        {i18n.t('block.add')}
        </Button>
        <Notifications options={{ zIndex: 200, top: '50px' }} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{i18n.t('block.add')}</ModalHeader>
          <ModalBody>
            <form>
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('address')}</label>
                  <input
                    name="address"
                    onChange={this.handleUserInput}
                    type="text"
                    ref="address"
                    className="form-control address"
                    value={this.state.address}
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
                    onClick={this.handleSubmit}
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
        </Modal>
      </div>
    );
  }
}

export default AddModal;
