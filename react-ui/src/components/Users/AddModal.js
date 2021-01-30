import React from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FormErrors } from './FormErrors';
import { _fetchData, _postData } from '../helpers';
import Notifications, { notify } from 'react-notify-toast';
import i18n from '../../i18n';
import Recaptcha from 'react-recaptcha';

class AddModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      login: '',
      password: '',
      lastName: '',
      firstName: '',
      email: '',
      telephone: '',
      role: '',
      apartmentId: '',
      pesel: '',

      formErrors: { email: '', password: '', firstName: '', lastName: '', pesel: '', telephone: '', role: '', apartmentId: '', login: '' },
      emailValid: false,
      firstNameValid: false,
      lastNameValid: false,
      peselValid: false,
      passwordValid: false,
      telephoneValid: false,
      apartmentValid: false,
      roleValid: false,
      formValid: false,
      loginValid: false,
      modal: false,
      isVerified: true,

      apartments: []
    };
  }

  fetchData = () => {
    let route = 'apartments/apartment/list';
    let success_callback = data => this.setState({ apartments: data });
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

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let firstNameValid = this.state.firstNameValid;
    let lastNameValid = this.state.lastNameValid;
    let peselValid = this.state.peselValid;
    let passwordValid = this.state.passwordValid;
    let telephoneValid = this.state.telephoneValid;
    let roleValid = this.state.roleValid;
    let apartmentValid = this.state.apartmentValid;
    let loginValid = this.state.loginValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) ? true : false;
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'firstName':
        firstNameValid = value.length > 2;
        fieldValidationErrors.firstName = firstNameValid ? '' : ' is too short';
        break;
      case 'lastName':
        lastNameValid = value.length > 2;
        fieldValidationErrors.lastName = lastNameValid ? '' : ' is too short';
        break;
      case 'login':
        loginValid = value.length > 2;
        fieldValidationErrors.login = loginValid ? '' : ' is too short';
        break;
      case 'pesel':
        peselValid = value.length === 11 && value > 0;
        fieldValidationErrors.pesel = peselValid ? '' : ' should have 11 characters';
        break;
      case 'password':
        passwordValid = value.length > 4;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      case 'telephone':
        telephoneValid = value.length > 8 && value > 0;
        fieldValidationErrors.telephone = telephoneValid ? '' : ' is too short';
        break;
      case 'role':
        roleValid = value != null;
        fieldValidationErrors.role = roleValid ? '' : ' must be chosen';
        break;
      case 'apartment':
        apartmentValid = value != null
        fieldValidationErrors.apartmentId = apartmentValid ? '' : ' must be chosen';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        firstNameValid: firstNameValid,
        lastNameValid: lastNameValid,
        peselValid: peselValid,
        passwordValid: passwordValid,
        telephoneValid: telephoneValid,
        apartmentValid: (this.state.role === "manager" || this.state.role === "administrator") ? true : apartmentValid,
        roleValid: roleValid
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid:
        this.state.emailValid &&
        this.state.firstNameValid &&
        this.state.lastNameValid &&
        this.state.peselValid &&
        this.state.isVerified &&
        this.state.passwordValid &&
        this.state.apartmentValid &&
        this.state.roleValid
    });
  }

  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }
  
  // recaptchaLoaded = () => {
  //   console.log("Recaptcha loaded!");
  // }

  verifyCallback = (response) => {
    if(response) {
      this.setState({ isVerified: true });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {};
    for (const field in this.refs) {
      data[field] = this.refs[field].value;
    }

    if(this.state.role === "manager" || this.state.role === "administrator") {
      data.apartmentId = null;
    }

    data.enabled = true;
    let route = 'users/appUser/add';
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
          {i18n.t('user.add')}
        </Button>
        <Notifications options={{ zIndex: 200, top: '50px' }} />

        <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
          <ModalHeader toggle={this.toggle}>{i18n.t('user.add')}</ModalHeader>
          <ModalBody>
            <form>
              <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('login')}</label>
                  <input
                    name="login"
                    onChange={this.handleUserInput}
                    type="text"
                    ref="login"
                    className="form-control login"
                    value={this.state.login}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('password')}</label>
                  <div>
                    <input
                      name="password"
                      onChange={this.handleUserInput}
                      type="password"
                      ref="password"
                      className="form-control password"
                      value={this.state.password}
                      />
                    </div>
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('firstName')}</label>
                  <input
                    onChange={this.handleUserInput}
                    name="firstName"
                    type="text"
                    ref="firstName"
                    className="form-control Firstname"
                    value={this.state.firstName}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('lastName')}</label>
                  <input
                    onChange={this.handleUserInput}
                    name="lastName"
                    type="text"
                    ref="lastName"
                    className="form-control lastName"
                    value={this.state.lastName}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('pesel')}</label>
                  <input
                    onChange={this.handleUserInput}
                    className="form-control"
                    type="number"
                    ref="pesel"
                    name="pesel"
                    value={this.state.pesel}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('telephone')}</label>
                  <input
                    onChange={this.handleUserInput}
                    className="form-control"
                    type="number"
                    ref="telephone"
                    name="telephone"
                    value={this.state.telephone}
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('email')}</label>
                  <input
                    onChange={this.handleUserInput}
                    name="email"
                    className="form-control"
                    type="text"
                    ref="email"
                    value={this.state.email}
                  />
                </div>

              {this.state.role != "administrator" && this.state.role != "manager" && (
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('apartment')}</label>
                  <select
                    onChange={this.handleUserInput}
                    ref="apartmentId"
                    className="form-control"
                    placeholder="Select apartment"
                    name="apartmentId"
                    value={this.state.apartmentId}>
                    {this.state.apartments.map((x) => 
                      <option key={x.id} value={x.id}>{x.block.address}{" "}{x.number}</option>)}
                    </select>
                </div>
              )}

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('role')}</label>
                  <select
                    onChange={this.handleUserInput}
                    ref="role"
                    className="form-control"
                    placeholder="Select role"
                    name="role"
                    value={this.state.role}>
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="administrator">Administrator</option>
                  </select>
                </div>

              <br />

              {/* <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" style={{ marginTop:'2%'}}>
                <Recaptcha
                  sitekey="6LfXj6YZAAAAAMW3sZeEAQ9X3ydAlLIl6jsvRsxe"
                  render="explicit"
                  onloadCallback={this.recaptchaLoaded}
                  verifyCallback={this.verifyCallback}
                />
              </div> */}

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
