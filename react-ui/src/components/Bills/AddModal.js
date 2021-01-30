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
      hotWater: '',
      coolWater: '',
      electricity: '',
      gas: '',
      sewage: '',
      approved: false,
      heating: '',

      formErrors: { heating: '', hotWater: '', coolWater: '', electricity: '', gas: '', sewage: '' },
      heatingValid: false,
      hotWaterValid: false,
      coolWaterValid: false,
      electricityValid: false,
      gasValid: false,
      sewageValid: false,
      formValid: false,
      modal: false,
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };


  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let heatingValid = this.state.heatingValid;
    let hotWaterValid = this.state.hotWaterValid;
    let coolWaterValid = this.state.coolWaterValid;
    let electricityValid = this.state.electricityValid;
    let gasValid = this.state.gasValid;
    let sewageValid = this.state.sewageValid;

    switch (fieldName) {
      case 'heating':
        heatingValid = value > 0;
        fieldValidationErrors.heating = heatingValid ? '' : ' must be not null and positive';
        break;
      case 'hotWater':
        hotWaterValid = value > 0;
        fieldValidationErrors.hotWater = hotWaterValid ? '' : ' must be not null and positive';
        break;
      case 'coolWater':
        coolWaterValid = value > 0;
        fieldValidationErrors.coolWater = coolWaterValid ? '' : ' must be not null and positive';
        break;
      case 'electricity':
        electricityValid = value > 0;
        fieldValidationErrors.electricity = electricityValid ? '' : ' must be not null and positive';
        break;
      case 'gas':
        gasValid = value > 0;
        fieldValidationErrors.gas = gasValid ? '' : ' must be not null and positive';
        break;
      case 'sewage':
        sewageValid = value > 0;
        fieldValidationErrors.sewage = sewageValid ? '' : ' must be not null and positive';
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        heatingValid: heatingValid,
        hotWaterValid: hotWaterValid,
        coolWaterValid: coolWaterValid,
        electricityValid: electricityValid,
        gasValid: gasValid,
        sewageValid: sewageValid,
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.heatingValid &&
        this.state.hotWaterValid &&
        this.state.coolWaterValid &&
        this.state.electricityValid &&
        this.state.gasValid &&
        this.state.sewageValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {};
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }

    let route = 'bills/bill/add';
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
          {i18n.t('bill.add')}
        </Button>
        <Notifications options={{ zIndex: 200, top: '50px' }} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{i18n.t('bill.add')}</ModalHeader>
          <ModalBody>
            <form>
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('hotWater')}</label>
                  <input
                    name="hotWater"
                    onChange={this.handleUserInput}
                    type="number"
                    ref="hotWater"
                    className="form-control hotWater"
                    value={this.state.hotWater}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('coolWater')}</label>
                  <input
                    name="coolWater"
                    onChange={this.handleUserInput}
                    type="number"
                    ref="coolWater"
                    className="form-control coolWater"
                    value={this.state.coolWater}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('heating')}</label>
                  <input
                    name="heating"
                    onChange={this.handleUserInput}
                    type="number"
                    ref="heating"
                    className="form-control heating"
                    value={this.state.heating}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('electricity')}</label>
                  <input
                    name="electricity"
                    onChange={this.handleUserInput}
                    type="number"
                    ref="electricity"
                    className="form-control electricity"
                    value={this.state.electricity}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('gas')}</label>
                  <input
                    name="gas"
                    onChange={this.handleUserInput}
                    type="number"
                    ref="gas"
                    className="form-control gas"
                    value={this.state.gas}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('sewage')}</label>
                  <input
                    name="sewage"
                    onChange={this.handleUserInput}
                    type="number"
                    ref="sewage"
                    className="form-control sewage"
                    value={this.state.sewage}
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
