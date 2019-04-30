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
import { alertActions } from '../../_actions';
import { configurationActions } from '../../_actions/configurations.actions';

class EditConfiguration extends Component {
  constructor(props) {
    super(props);
    const { match, dispatch } = this.props;
    this.state = {
      clientId: match.params.id,
      clientSecret: '',
      username: '',
      password: '',
      tenant: '',
      status: ''
    };
    dispatch(alertActions.clear());
  }

  componentDidMount() {
    const configurations = this.props.configurations || [];
    const configuration =
      configurations.find(e => e.clientId.toString() === this.props.match.params.id) || {};
    const { clientId, clientSecret, username, password, tenant, status } = configuration;

    this.setState({ clientId, clientSecret, username, password, tenant, status });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.alertMessage !== this.props.alertMessage) {
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
      this.props.dispatch(configurationActions.update(this.state));
    } else {
      this.setState({ submitted: false });
    }
  };

  handleValidate = () => {
    return true;
  };

  render() {
    const { error } = this.state;
    const { alertMessage, alertColor } = this.props;
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

                {alertMessage && <Alert color={alertColor}>{alertMessage}</Alert>}

                <Form action="" method="post" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input
                      type="text"
                      id="clientId"
                      name="clientId"
                      placeholder="Enter your clientId..."
                      value={this.state.clientId}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="clientSecret">Client Secret</Label>
                    <Input
                      type="text"
                      id="clientSecret"
                      name="clientSecret"
                      placeholder="Enter your client secret..."
                      value={this.state.clientSecret}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter your username..."
                      value={this.state.username}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="text"
                      id="password"
                      name="password"
                      placeholder="Enter your password..."
                      value={this.state.password}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="tenant">Tenant</Label>
                    <Input
                      type="text"
                      id="tenant"
                      name="tenant"
                      placeholder="Enter your tenant..."
                      value={this.state.tenant}
                      onChange={this.handleOnChange}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="status">Status</Label>
                    <Input
                      type="select"
                      id="status"
                      name="status"
                      value={this.state.status}
                      onChange={this.handleOnChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Input>
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
  const { items } = state.configurations;
  return {
    configurations: items,
    alertColor: color,
    alertMessage: message
  };
};

export default connect(mapStateToProps)(EditConfiguration);
