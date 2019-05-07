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
import PasswordUtils from '../../_utils/Password';

class EditCustomer extends Component {
  constructor(props) {
    super(props);
    const { match, dispatch } = props;
    this.state = {
      _id: match.params.id,
      givenName: '',
      surname: '',
      jobTitle: '',
      mobilePhone: null,
      domain: '',
      accountEnabled: false,
      userPrincipalName: '',
      password: ''
    };
    dispatch(alertActions.clear());
  }

  componentDidMount() {
    const { props } = this;
    const customer = props.customers.find(e => e._id === props.match.params.id) || {};
    const {
      givenName,
      surname,
      jobTitle,
      mobilePhone,
      userPrincipalName,
      accountEnabled
    } = customer;

    this.setState({ givenName, surname, jobTitle, mobilePhone, userPrincipalName, accountEnabled });
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
      this.props.dispatch(customerActions.update(this.state));
    } else {
      this.setState({ submitted: false });
    }
  };

  handleValidate = () => {
    const { givenName, surname } = this.state;
    if (givenName.trim().length === 0) {
      this.setState({ error: 'First name must not be empty.' });
      return false;
    }

    if (surname.trim().length === 0) {
      this.setState({ error: 'Last name must not be empty.' });
      return false;
    }

    return true;
  };

  handleResetPassword = () => {
    const password = PasswordUtils.generateSimpleStrongPassword();
    this.setState({ password });
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
                  Edit <small>{state.userPrincipalName}</small>
                </strong>
              </CardHeader>
              <CardBody>
                {error && <Alert color="danger">{error}</Alert>}
                {props.message && <Alert color={props.color}>{props.message}</Alert>}
                <Form action="" method="post" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="userPrincipalName">Email</Label>
                    <Input
                      disabled
                      type="text"
                      id="userPrincipalName"
                      name="userPrincipalName"
                      placeholder="Email..."
                      value={state.userPrincipalName}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">
                      <span>{`Password:   `}</span>
                      {state.password.length === 0 && (
                        <Button
                          type="button"
                          size="sm"
                          color="warning"
                          onClick={this.handleResetPassword}
                        >
                          Reset password
                        </Button>
                      )}
                      {state.password.length > 0 && (
                        <small style={{color: '#ff8111'}}>
                          It shows only once, please copy this password to somewhere else.
                        </small>
                      )}
                    </Label>
                    <Input
                      disabled
                      type="text"
                      id="password"
                      name="password"
                      placeholder="******"
                      value={state.password}
                    />
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
                    <Label htmlFor="jobTitle">Job title: (Optional)</Label>
                    <Input
                      type="text"
                      id="jobTitle"
                      name="jobTitle"
                      placeholder="Job title"
                      value={state.jobTitle}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="accountEnabled">Status</Label>
                    <Input
                      type="select"
                      id="accountEnabled"
                      name="accountEnabled"
                      defaultValue=""
                      value={state.accountEnabled}
                      onChange={this.handleOnChange}
                    >
                      <option selected={state.accountEnabled === true} value={true}>
                        Active
                      </option>
                      <option selected={state.accountEnabled === false} value={false}>
                        Inactive
                      </option>
                    </Input>
                  </FormGroup>
                  <FormGroup className="form-actions">
                    <Button disabled={!!state.submitted} type="submit" size="sm" color="success">
                      {!!state.submitted ? 'Saving...' : 'Save'}
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
    customers: state.customers.items || []
  };
};

export default connect(mapStateToProps)(EditCustomer);
