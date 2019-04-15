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
import { alertActions, domainsActions } from '../../_actions';

class AddDomain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domain: '',
      status: 'active'
    };
    this.props.dispatch(alertActions.clear());
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
      this.props.dispatch(domainsActions.create(this.state));
    } else {
      this.setState({ submitted: false });
    }
  };

  handleValidate = () => {
    const { domain, status } = this.state;
    // if (domain.trim().length < 5) {
    //   this.setState({error: 'Username must at least 5 characters length'});
    //   return false;
    // }

    if (status === '') {
      this.setState({ error: 'Please select status' });
      return false;
    }

    return true;
  };

  render() {
    const { error } = this.state;
    const { alertColor, alertMessage } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col lg={8}>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  Add a new domain
                </strong>
              </CardHeader>
              <CardBody>
                {error && <Alert color="danger">{error}</Alert>}
                {alertMessage && <Alert color={alertColor}>{alertMessage}</Alert>}
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
                        id="domain"
                        name="domain"
                        placeholder="Domain name"
                        value={this.state.domain}
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
                        name="status"
                        id="status"
                        defaultValue=""
                        value={this.state.status}
                        onChange={this.handleOnChange}
                      >
                        <option selected={this.state.status === 'active'} value="active">
                          Active
                        </option>
                        <option selected={this.state.status === 'inactive'} value="inactive">
                          Inactive
                        </option>
                      </Input>
                    </InputGroup>
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
  return {
    alertColor: color,
    alertMessage: message
  };
};

export default connect(mapStateToProps)(AddDomain);
