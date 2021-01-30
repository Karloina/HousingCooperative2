import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { FormErrors } from './FormErrors';
import { _fetchData, _postData, _updateData } from '../helpers';
import i18n from '../../i18n';

class EditModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      login: '',
      password: '',
      lastName: '',
      firstName: '',
      enabled: false,
      email: '',
      telephone: '',
      role: '',
      apartmentId: null,

      formErrors: { email: '', password: '', firstName: '', lastName: '', pesel: '', telephone: '', role: '', apartmentId: '' },
      emailValid: true,
      firstNameValid: true,
      lastNameValid: true,
      peselValid: true,
      passwordValid: true,
      telephoneValid: true,
      apartmentValid: true,
      roleValid: true,
      formValid: true,
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
    const { id, login, firstName, lastName, email, telephone, enabled, role, apartmentId, pesel } = this.props.details;
    this.setState({ id, login, firstName, lastName, email, telephone, enabled, role, apartmentId, pesel })
    this.fetchData();
  }

  setEnabled = (e) => {
    this.setState({ enabled: e.target.value === 'true'});
  };

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
      case 'apartmentId':
        apartmentValid = value != null;
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
  
  handleEdit = (e) => {
    let data = {
      id: this.state.id,
      password: this.state.password,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      enabled: this.state.enabled,
      email: this.state.email,
      telephone: this.state.telephone,
      role: this.state.role,
      apartmentId: this.state.apartmentId,
      pesel: this.state.pesel
    }
    let route = 'users/appUser/edit';
    let cb = () => this.setState({ msg: "User has been edited." });

    if(this.state.role === "manager" || this.state.role === "administrator") {
      data.apartmentId = null;
    }
    debugger;
    _updateData({ route, data, cb })
    this.editModalIsOpen = false;
}

render() {
  const { editModalIsOpen, closeEditModal } = this.props;
  return (
    <Modal size="lg" isOpen={editModalIsOpen} toggle={closeEditModal}>
      <ModalHeader toggle={closeEditModal}>{i18n.t('user.edit')}</ModalHeader>
      <ModalBody>
            <form onSubmit={this.closeEditModal}>
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
                    disabled
                  />
                </div>

                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <label>{i18n.t('enabled')}</label>
                  <div>
                  <label>
                    <input
                      onClick={this.setEnabled}
                      checked={this.state.enabled == true}
                      ref="enabled"
                      type="radio"
                      value={true}
                      name="enabled"
                    />{' '}
                    {i18n.t('yes')}
                  </label>
                  <label>
                    <input
                      onClick={this.setEnabled}
                      checked={this.state.enabled == false}
                      ref="enabled"
                      type="radio"
                      value={false}
                      name="enabled"
                    />{' '}
                    {i18n.t('no')}
                  </label>
                  </div>
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
                    className="form-control firstName"
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
                  <button toggle={closeEditModal} className="btn btn-danger">
                    {i18n.t('cancel')}
                  </button>
                </div>
              </div>
            </form>
          </ModalBody>
        </Modal>
    );
  }
}

export default EditModal;
