import React, { Component } from 'react';
import {
  Alert,
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
  Label,
  Row,
  Table
} from 'reactstrap';

import { connect } from 'react-redux';
import { alertActions, userActions } from '../../_actions';

class EditUser extends Component {
  constructor(props) {
    super(props);
    const { match, dispatch } = this.props;
    this.state = {
      _id: match.params.id,
      username: '',
      email: '',
      fullname: '',
      password: '',
      role: '',
      status: '',
      canUseDomains: []
    };
    dispatch(alertActions.clear());
  }

  componentDidMount() {
    const users = this.props.users || [];
    const user = users.find(e => e._id.toString() === this.props.match.params.id) || {};
    const { username, email, fullname, password, role, status, canUseDomains } = user;

    this.setState({ username, email, fullname, password, role, status, canUseDomains });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.message !== this.props.message) {
      this.setState({ submitted: false });
    }
  }

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true, error: undefined });

    const isValidForm = this.handleValidate();

    if (isValidForm) {
      this.props.dispatch(userActions.update(this.state));
    } else {
      this.setState({ submitted: false });
    }
  };
  
  handleSelectMultipleChange = e => {
    const { options } = e.target;
    let value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({ canUseDomains: value });
  };

  handleValidate = () => {
    const { username, email, password, role, status, fullname } = this.state;
    if (username.trim().length < 5) {
      this.setState({ error: 'Username must at least 5 characters length' });
      return false;
    }

    if (fullname.trim().length === 0) {
      this.setState({ error: 'Fullname must not be empty.' });
      return false;
    }

    if (email.trim().length === 0) {
      this.setState({ error: 'Email must not be empty.' });
      return false;
    }

    if (password && password.trim().length !== 0 && password.trim().length < 6) {
      this.setState({ error: 'Username must at least 6 characters length' });
      return false;
    }

    if (role === '') {
      this.setState({ error: 'Please select role' });
      return false;
    }

    if (status === '') {
      this.setState({ error: 'Please select status' });
      return false;
    }

    return true;
  };

  render() {
    const { error } = this.state;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={8}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  Edit <small>{this.state.username}</small>
                </strong>
              </CardHeader>
              <CardBody>
                {error && <Alert color="danger">{error}</Alert>}
                {this.props.message && <Alert color={this.props.color}>{this.props.message}</Alert>}
                <Form action="" method="post" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        disabled={true}
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={this.state.username}
                        onChange={this.handleOnChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={this.state.email}
                        onChange={this.handleOnChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-envelope" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="fullname"
                        name="fullname"
                        placeholder="Fullname"
                        autoComplete="fullname"
                        value={this.state.fullname}
                        onChange={this.handleOnChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-asterisk" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handleOnChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-asterisk" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        name="role"
                        id="role"
                        defaultValue=""
                        value={this.state.role}
                        onChange={this.handleOnChange}
                      >
                        <option selected={this.state.role === ''} value="">
                          -- Please select role --
                        </option>
                        <option selected={this.state.role === 'admin'} value="admin">
                          Admin
                        </option>
                        <option selected={this.state.role === 'reseller'} value="reseller">
                          Reseller
                        </option>
                        <option selected={this.state.role === 'user'} value="user">
                          User
                        </option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-asterisk" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        name="status"
                        id="status"
                        defaultValue=""
                        value={this.state.status}
                        onChange={this.handleOnChange}
                      >
                        <option selected={this.state.status === ''} value="">
                          -- Please select status --
                        </option>
                        <option selected={this.state.status === 'active'} value="active">
                          Active
                        </option>
                        <option selected={this.state.status === 'inactive'} value="inactive">
                          Inactive
                        </option>
                      </Input>
                    </InputGroup>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label>Domains</Label>
                    </Col>
                    <Col md="9">
                      <Input
                        type="select"
                        name="multiple-select"
                        id="multiple-select"
                        multiple
                        onChange={this.handleSelectMultipleChange}
                      >
                        {this.props.domains &&
                        this.props.domains.map(domain => (
                          <option
                            selected={this.state.canUseDomains.includes(domain.domain)}
                            value={domain.domain}
                          >
                            {domain.domain}
                          </option>
                        ))}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button
                      disabled={!!this.state.submitted}
                      type="submit"
                      size="sm"
                      color="success"
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { color, message } = state.alert;
  const { items } = state.users;

  return {
    color,
    message,
    users: items,
    domains: state.domains.items
  };
};

export default connect(mapStateToProps)(EditUser);
