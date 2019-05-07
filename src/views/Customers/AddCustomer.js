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
    const { username, givenName, surname, domain } = this.state;
    if (username.trim().length < 5) {
      this.setState({ error: 'Username must at least 5 characters length' });
      return false;
    }

    if (givenName.trim().length === 0) {
      this.setState({ error: 'First name must not be empty.' });
      return false;
    }

    if (surname.trim().length === 0) {
      this.setState({ error: 'Last name must not be empty.' });
      return false;
    }

    if (domain.trim().length === 0) {
      this.setState({ error: 'Please select a domain name.' });
      return false;
    }

    return true;
  };

  render() {
    const { error } = this.state;
    const { props, state } = this;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={8}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  Add new user
                </strong>
              </CardHeader>
              <CardBody>
                {error && <Alert color="danger">{error}</Alert>}
                {props.message && <Alert color={props.color}>{props.message}</Alert>}
                <Form action="" method="post" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Username..."
                      autoComplete="username"
                      value={state.username}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="domain">Domain</Label>
                    <Input
                      type="select"
                      name="domain"
                      id="domain"
                      defaultValue=""
                      value={state.domain}
                      onChange={this.handleOnChange}
                    >
                      <option selected={state.domain === ''} value="">
                        -- Please select domain --
                      </option>
                      {props.canUseDomains.map(item => (
                        <option selected={state.domain === item} value={item}>
                          {item}
                        </option>
                      ))}
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="givenName">First name</Label>
                    <Input
                      type="text"
                      id="givenName"
                      name="givenName"
                      placeholder="First name..."
                      autoComplete="givenName"
                      value={state.givenName}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="surname">Last name</Label>
                    <Input
                      type="text"
                      id="surname"
                      name="surname"
                      placeholder="Last name..."
                      autoComplete="surname"
                      value={state.surname}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="displayName">Display name</Label>
                    <Input
                      disabled
                      type="text"
                      id="displayName"
                      name="displayName"
                      placeholder="Display name will be..."
                      value={`${state.givenName} ${state.surname}`}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="displayName">Job title: (Optional)</Label>
                    <Input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Job title"
                      value={state.jobTitle}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button
                      disabled={!!state.submitted}
                      type="submit"
                      size="sm"
                      color="success"
                    >
                      {!!state.submitted ? 'Creating...' : 'Create'}
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
