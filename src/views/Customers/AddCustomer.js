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
import { alertActions, customerActions } from '../../_actions';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      givenName: '',
      surname: '',
      jobTitle: '',
      mobilePhone: null,
      domain: ''
    };
    this.props.dispatch(alertActions.clear());
  }

  componentDidUpdate(prevProps, prevState) {
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
      this.props.dispatch(customerActions.create(this.state));
    } else {
      this.setState({ submitted: false });
    }
  };

  handleValidate = () => {
    const { username, givenName, surname, domain, jobTitle } = this.state;
    if (username.trim().length < 5) {
      this.setState({ error: 'Username must at least 5 characters length' });
      return false;
    }

    if (givenName.trim().length === 0) {
      this.setState({ error: 'Given name must not be empty.' });
      return false;
    }

    if (surname.trim().length === 0) {
      this.setState({ error: 'Email must not be empty.' });
      return false;
    }

    if (domain.trim().length === 0) {
      this.setState({ error: 'Please select a domain name.' });
      return false;
    }

    if (jobTitle.trim().length === 0) {
      this.setState({ error: 'Job title must not be empty.' });
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
                  Add new
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
                          <i className="fa fa-asterisk" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        name="domain"
                        id="domain"
                        defaultValue=""
                        value={this.state.domain}
                        onChange={this.handleOnChange}
                      >
                        <option selected={this.state.domain === ''} value="">
                          -- Please select domain --
                        </option>
                        {this.props.canUseDomains.map(item => (
                          <option selected={this.state.domain === item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Input>
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
                        id="givenName"
                        name="givenName"
                        placeholder="First name"
                        autoComplete="givenName"
                        value={this.state.givenName}
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
                        id="surname"
                        name="surname"
                        placeholder="Last name"
                        autoComplete="surname"
                        value={this.state.surname}
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
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="Job title"
                        autoComplete="jobTitle"
                        value={this.state.jobTitle}
                        onChange={this.handleOnChange}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button
                      disabled={!!this.state.submitted}
                      type="submit"
                      size="sm"
                      color="success"
                    >
                      {!!this.state.submitted ? 'Saving...' : 'Save'}
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
  const { user } = state.authentication;
  return {
    color,
    message,
    canUseDomains: user ? user.canUseDomains : []
  };
};

export default connect(mapStateToProps)(AddCustomer);
