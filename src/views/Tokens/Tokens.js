import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Table
} from 'reactstrap';

import { alertActions } from '../../_actions';
import { tokenActions } from '../../_actions/tokens.actions';
import { Link } from 'react-router-dom';

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a
  // flash, so some of these are just precautions. However in
  // Internet Explorer the element is visible whilst the popup
  // box asking the user for permission for the web page to
  // copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

function Item({ item, isAdmin, onLock, onDelete, onCopy }) {
  const getBadge = isUsed => {
    return !!isUsed ? 'danger' : 'success';
  };

  return (
    <tr key={item._id.toString()}>
      <td>{item.token}</td>
      <td>
        <Badge color={getBadge(item.isUsed)}>{item.isUsed ? 'Used' : 'Available'}</Badge>
      </td>
      <td>
        {item.usedFor ? (
          <Link to={`/customers/detail/${item.usedFor}`}>{item.usedFor}</Link>
        ) : (
          `...`
        )}
      </td>
      <td>{item.usedAt ? moment(item.usedAt).format('DD/MM/YY') : '...'}</td>
      {isAdmin && <td>{item.generatedBy}</td>}
      <td>
        <Badge color={getBadge(item.status !== 'active')}>{item.status}</Badge>
      </td>
      {isAdmin && (
        <td>
          {item.status !== 'used' && (
            <Fragment>
              <Button
                disabled={item.status === 'locked'}
                size="sm"
                type="button"
                color="danger"
                onClick={() => onLock(item._id)}
              >
                <i className="fa fa-lock" />
                {` Lock`}
              </Button>
              <Button
                size="sm"
                type="button"
                color="primary"
                onClick={() => onCopy(item.token)}
              >
                <i className="fa fa-lock" />
                {` Lock`}
              </Button>
              {`   `}
              <Button size="sm" type="button" color="danger" onClick={() => onDelete(item._id)}>
                <i className="fa fa-trash" aria-hidden="true" />
                {` Delete`}
              </Button>
            </Fragment>
          )}
        </td>
      )}
    </tr>
  );
}

class Tokens extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      submitted: false,
      quantity: '',
      error: undefined,
      isShowDeleteModal: false,
      tokenToDelete: null,
      isUsed: ''
    };
    this.props.dispatch(alertActions.clear());
  }

  componentDidMount() {
    this.props.dispatch(tokenActions.getAll());
  }
  
  handleFilterChange = (e) => {
    const {name, value} = e.target;
    let filter = {[name]: value};
    if (name === 'isUsed') {
      if (value === "") {
        filter = undefined;
      }
    }
    this.setState({[name]: value});
    this.props.dispatch(tokenActions.getAll(filter));
  };

  toggleGenerateModal = () => {
    this.setState(prevState => ({ modal: !prevState.modal }));
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true, error: undefined });
    if (!this.validate()) return;

    const { quantity } = this.state;
    this.props.dispatch(tokenActions.generate(quantity));
    this.toggleGenerateModal();
    this.setState({ submitted: false, quantity: '' });
  };

  validate = () => {
    const { quantity } = this.state;
    const realQuantity = parseInt(quantity);
    let error = null;

    if (isNaN(realQuantity) || realQuantity < 1) {
      error = 'Invalid quantity. Check again please!';
    }

    if (realQuantity > 100) {
      error = 'Number of tokens is too large, maximum is 100';
    }

    if (error) {
      this.setState({ submitted: false, error });
      return false;
    }

    return true;
  };

  lockToken = id => this.props.dispatch(tokenActions.lock(id));

  deleteToken = id => this.props.dispatch(tokenActions.deleteToken(id));

  toggleDeleteModal = id => {
    this.setState(prevState => ({
      isShowDeleteModal: !prevState.isShowDeleteModal,
      tokenToDelete: id || null
    }));
  };

  onCopy = (token) => {
    copyTextToClipboard(token);
    alert('OK');
  }

  render() {
    const { items, alertColor, alertMessage, user } = this.props;
    const isAdmin = user.role === 'admin';

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" />
                Tokens
                <div className="card-header-actions">
                  <Button onClick={this.toggleGenerateModal} block color="success">
                    <i className="fa fa-plus-square-o" />
                    {` Generate tokens`}
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {alertMessage && <Alert color={alertColor}>{alertMessage}</Alert>}
                <InputGroup className="mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      Available
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="select"
                    name="isUsed"
                    id="isUsed"
                    value={this.state.isUsed}
                    onChange={this.handleFilterChange}
                  >
                    <option selected={this.state.isUsed === ''} value="">
                      -- Filter by status --
                    </option>
                    <option selected={this.state.isUsed === "false"} value="false">
                      Available
                    </option>
                    <option selected={this.state.isUsed === "true"} value="true">
                      Used
                    </option>
                  </Input>
                </InputGroup>
                
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Code</th>
                      <th scope="col">Used</th>
                      <th scope="col">Email</th>
                      <th scope="col">Used At</th>
                      {isAdmin && <th scope="col">Generated By</th>}
                      <th scope="col">Status</th>
                      {isAdmin && <th scope="col">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {items &&
                      items.map(token => (
                        <Item
                          key={token.token}
                          item={token}
                          isAdmin={isAdmin}
                          onLock={this.lockToken}
                          onDelete={this.toggleDeleteModal}
                          onCopy={this.onCopy}
                        />
                      ))}
                  </tbody>
                </Table>
                {(!items || (items && items.length === 0)) && (
                  <Alert color="warning">Empty tokens!</Alert>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.modal} toggle={this.toggleGenerateModal}>
          <ModalHeader toggle={this.toggleGenerateModal}>Generate Tokens</ModalHeader>
          <ModalBody>
            {this.state.error && <Alert color="danger">{this.state.error}</Alert>}

            <Form action="" method="post" onSubmit={this.handleSubmit}>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fa fa-laptop" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="number"
                    id="quantity"
                    name="quantity"
                    placeholder="Number of tokens..."
                    value={this.state.quantity}
                    onChange={this.handleOnChange}
                  />
                </InputGroup>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button
              disabled={!!this.state.submitted}
              onClick={this.handleSubmit}
              type="button"
              color="success"
            >
              Save
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleGenerateModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.isShowDeleteModal} toggle={this.toggleDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>Delete token</ModalHeader>
          <ModalBody>
            <p>Are you sure to delete this token?</p>
            <i>This action can not be undone.</i>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                this.deleteToken(this.state.tokenToDelete);
                this.toggleDeleteModal();
              }}
              type="button"
              color="danger"
            >
              Delete
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { items } = state.tokens;
  const { color, message } = state.alert;
  return {
    items,
    alertColor: color,
    alertMessage: message,
    user: state.authentication.user
  };
};

export default connect(mapStateToProps)(Tokens);
