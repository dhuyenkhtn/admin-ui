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

function Item({ item, isAdmin, onLock, onDelete }) {
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
