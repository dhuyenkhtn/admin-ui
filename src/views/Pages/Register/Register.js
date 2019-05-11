import React, { Component } from 'react';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Table
} from 'reactstrap';
import { alertActions, customerActions } from '../../../_actions';
import { connect } from 'react-redux';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      username: '',
      givenName: '',
      surname: '',
      jobTitle: '',
      mobilePhone: null,
      domain: '',
      submitted: false
    };
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

  handleCheckToken = e => {
    e.preventDefault();
    this.props.dispatch(alertActions.clear());

    const code = this.state.code.trim();
    if (code === '') return;
    this.props.dispatch(customerActions.checkToken(code));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true, error: undefined });

    const isValidForm = this.handleValidate();

    if (isValidForm) {
      this.props.dispatch(customerActions.register(this.state));
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
    const { state, props } = this;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  {props.message && <Alert color={props.color}>{props.message}</Alert>}
                  {!props.success && (
                    <Form action="" method="post" onSubmit={this.handleSubmit}>
                      <h1>Register</h1>
                      <p className="text-muted">Create your account</p>

                      {!props.isValidToken && (
                        <small className="help-block form-text" style={{ color: '#ff9e2d' }}>
                          Check your MSSV code first
                        </small>
                      )}
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-screen-smartphone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          valid={props.isValidToken}
                          invalid={props.isValidToken === false}
                          type="text"
                          id="code"
                          name="code"
                          value={state.code}
                          onChange={this.handleOnChange}
                          placeholder="MSSV..."
                        />
                        <InputGroupAddon addonType="append">
                          <Button
                            disabled={props.requesting || props.isValidToken}
                            onClick={this.handleCheckToken}
                            type="button"
                            color="success"
                          >
                            {props.isValidToken ? 'Valid' : 'Check'}
                          </Button>
                        </InputGroupAddon>
                        {props.isValidToken && (
                          <FormFeedback valid>Checked! Your MSSV Code is valid</FormFeedback>
                        )}
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={!props.isValidToken}
                          type="text"
                          id="username"
                          name="username"
                          placeholder="Username..."
                          autoComplete="username"
                          value={state.username}
                          onChange={this.handleOnChange}
                        />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={!props.isValidToken}
                          type="select"
                          name="domain"
                          id="domain"
                          defaultValue=""
                          value={state.domain}
                          onChange={this.handleOnChange}
                        >
                          <option selected={state.domain === ''} value="">
                            -- Please select your domain --
                          </option>
                          {props.canUseDomains.map(item => (
                            <option selected={state.domain === item} value={item}>
                              {item}
                            </option>
                          ))}
                        </Input>
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={!props.isValidToken}
                          type="text"
                          id="givenName"
                          name="givenName"
                          placeholder="First name..."
                          autoComplete="givenName"
                          value={state.givenName}
                          onChange={this.handleOnChange}
                        />
                      </InputGroup>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>@</InputGroupText>
                        </InputGroupAddon>
                        <Input
                          disabled={!props.isValidToken}
                          type="text"
                          id="surname"
                          name="surname"
                          placeholder="Last name..."
                          autoComplete="surname"
                          value={state.surname}
                          onChange={this.handleOnChange}
                        />
                      </InputGroup>

                      <small className="help-block form-text text-muted">
                        Your password will be generated automatically.
                      </small>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input disabled type="password" placeholder="******" value="******" />
                      </InputGroup>

                      {/*<InputGroup className="mb-4">*/}
                      {/*<InputGroupAddon addonType="prepend">*/}
                      {/*<InputGroupText>*/}
                      {/*<i className="icon-lock" />*/}
                      {/*</InputGroupText>*/}
                      {/*</InputGroupAddon>*/}
                      {/*<Input*/}
                      {/*type="password"*/}
                      {/*placeholder="Repeat password"*/}
                      {/*/>*/}
                      {/*</InputGroup>*/}
                      <Button
                        disabled={!!state.submitted || !props.isValidToken}
                        type="submit"
                        color="success"
                        block
                      >
                        {!!state.submitted ? 'Creating...' : 'Create account'}
                      </Button>
                    </Form>
                  )}

                  {props.success && (
                    <Table responsive size="sm">
                      <thead>
                        <tr>
                          <th />
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-muted">Display name</td>
                          <td>{props.account.displayName}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Email</td>
                          <td>{props.account.userPrincipalName}</td>
                        </tr>
                        <tr>
                          <td className="text-muted">Password</td>
                          <td>{props.account.password}</td>
                        </tr>
                      </tbody>
                    </Table>
                  )}
                  {props.success && (
                    <small
                      style={{ color: '#9f1317' }}
                    >{`(Please copy your password, this password will be shown only once)`}</small>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { color, message } = state.alert;
  const { canUseDomains, token, isValidToken, requesting, success, account } = state.register;
  return {
    color,
    message,
    isValidToken,
    token,
    requesting,
    canUseDomains: canUseDomains || [],
    account: account || {},
    success
  };
};

export default connect(mapStateToProps)(Register);
