import React from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, } from 'reactstrap';
import { _updateData, _fetchData } from '../helpers';
import { FormErrors } from './FormErrors';
import i18n from '../../i18n';

export default class EditModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: null,
      number: null,
      blockId: null,

      formErrors: { number: '', blockId: ''},
      numberValid: true,
      blockValid: true,
      formValid: true,

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
    const { id, number, block } = this.props.details;
    this.setState({ id: id, number: number, blockId: block.id});
    this.fetchData();
  }

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

    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

 
  errorClass(error) {
    return error.length === 0 ? '' : 'has-error';
  }

  handleEdit = (e) => {
    e.preventDefault();
    let data = {
      id: this.state.id,
      number: this.state.number,
      block: {
        id: this.state.blockId,
        address: undefined
      }
    }

    let route = 'apartments/apartment/edit';
    let cb = () => this.setState({ msg: "Apartment has been edited." });
    _updateData({ route, data, cb })
}

  render() {
    const { editModalIsOpen, closeEditModal } = this.props;
    const { number, blockId } = this.state;
    return (
      <Modal size="lg" isOpen={editModalIsOpen} toggle={closeEditModal}>
        <ModalHeader toggle={closeEditModal}>{i18n.t('apartment.edit')}</ModalHeader>
        <ModalBody>
          <form onSubmit={closeEditModal}>
            <div className="row">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <label>{i18n.t('number')}</label>
                <input
                  onChange={this.handleUserInput}
                  className="form-control"
                  type="number"
                  ref="number"
                  name="number"
                  value={number}
                />
              </div>

              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <label>{i18n.t('block')}</label>
                <select
                  onChange={this.handleUserInput}
                  ref="blockId"
                  className="form-control"
                  name="blockId"
                  value={blockId}>
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
              <div className="offset-xs-3 offset-sm-3 offset-md-3 offset-lg-3 col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <div className="panel panel-default">
                </div>
                <button
                  type="submit"
                  onClick={this.handleEdit}
                  className="btn btn-primary"
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
