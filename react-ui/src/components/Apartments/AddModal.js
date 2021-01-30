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
      id: null,
      number: null,
      blockId: null,

      formErrors: { number: '', blockId: ''},
      numberValid: false,
      blockValid: false,
      formValid: false,
      modal: false,

      blocks: []
    };
  }

  fetchData = () => {
    let route = 'apartments/block/list';
    let success_callback = data => this.setState({ blocks: data });
    let error_callback = error => this.setState({ error });
    _fetchData({ route, success_callback, error_callback });
  }

  componentDidMount() {
    this.fetchData();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let blockValid = this.state.blockValid;
    let numberValid = this.state.numberValid;

    switch (fieldName) {
      case 'number':
        numberValid = value > 0;
        fieldValidationErrors.number = numberValid ? '' : ' is too short';
        break;
      case 'blockId':
        blockValid = value != null;
        fieldValidationErrors.blockId = blockValid ? '' : ' must be chosen';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        numberValid: numberValid,
        blockValid: blockValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.numberValid &&
        this.state.blockValid
    });
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    // if(name == "block") {
    //   value = JSON.parse(value); 
    // }

    // if(name == "number") {
    //   value = parseInt(value, 10);
    // }
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });

  };
 
  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }


  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      id: this.state.id,
      number: this.state.number,
      block: {
        id: this.state.blockId,
        address: undefined
      }
    }

    let route = 'apartments/apartment/add';
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
          {i18n.t('apartment.add')}
        </Button>
        <Notifications options={{ zIndex: 200, top: '50px' }} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{i18n.t('apartment.add')}</ModalHeader>
          <ModalBody>
            <form>
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('number')}</label>
                  <input
                    onChange={this.handleUserInput}
                    className="form-control"
                    type="number"
                    ref="number"
                    name="number"
                    value={this.state.number}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('block')}</label>
                  <select
                    onChange={this.handleUserInput}
                    ref="blockId"
                    className="form-control"
                    name="blockId"
                    value={this.state.block}>
                    {this.state.blocks.map((x) => 
                      <option key={x.id} value={x.id}>{x.address}</option>)}
                  </select>
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
