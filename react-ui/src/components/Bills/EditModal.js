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
      hotWater: '',
      coolWater: '',
      electricity: '',
      gas: '',
      sewage: '',
      approved: '',
      heating: '',

      formErrors: { heating: '', hotWater: '', coolWater: '', electricity: '', gas: '', sewage: '' },
      heatingValid: true,
      hotWaterValid: true,
      coolWaterValid: true,
      electricityValid: true,
      gasValid: true,
      sewageValid: true,
      formValid: true
    }
  }

  componentDidMount() {
    const { id, hotWater, coolWater, electricity, gas, sewage, approved, heating } = this.props.details;
    this.setState({ id, hotWater, coolWater, electricity, gas, sewage, approved, heating })
  }

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

  handleEdit = (e) => {
    e.preventDefault();
    
    let data = {
      id: this.state.id,
      hotWater: this.state.hotWater,
      coolWater: this.state.coolWater,
      electricity: this.state.electricity,
      gas: this.state.gas,
      sewage: this.state.sewage,
      approved: this.state.approved,
      heating: this.state.heating
    }

    let route = 'bills/bill/edit';
    let cb = () => this.setState({ msg: "Bill has been edited."});

    _updateData({ route, data, cb })
}

  render() {
    const { editModalIsOpen, closeEditModal, details } = this.props;
    const { hotWater, coolWater, electricity, gas, sewage, approved, heating } = this.state;
    return (
      <Modal size="lg" isOpen={editModalIsOpen} toggle={closeEditModal}>
        <ModalHeader toggle={closeEditModal}>{i18n.t('bill.edit')}</ModalHeader>
        <ModalBody>
          <form onSubmit={closeEditModal}>

          <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('hotWater')}</label>
                  <input
                    name="hotWater"
                    onChange={this.handleUserInput}
                    type="number"
                    ref="hotWater"
                    className="form-control hotWater"
                    value={hotWater}
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
                    value={coolWater}
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
                    value={heating}
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
                    value={electricity}
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
                    value={gas}
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
                    value={sewage}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{color:'red', marginTop:'2%'}} >
                    <FormErrors formErrors={this.state.formErrors} />
                </div>

              </div>
              <br/>
            <div className="row">
              <div className="offset-xs-3 offset-sm-3 offset-md-3 offset-lg-3 col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <div className="panel panel-default">
                </div>
                <button
                  type="submit"
                  onClick={this.handleEdit}
                  className="btn btn-primary"
                  method="POST"
                  disabled={!this.state.formValid}
                >
                  {i18n.t('submit')}
                </button>
              </div>
              <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <button onClick={closeEditModal} className="btn btn-danger">
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
