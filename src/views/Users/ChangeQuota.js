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
import { userActions } from '../../_actions';

class ChangeQuota extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: ''
    };
  }

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.alertMessage !== this.props.alertMessage) {
      this.setState({ submitted: false });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitted: true, error: undefined });
    
    const { quantity } = this.state;
    if (isNaN(parseInt(quantity)) || parseInt(quantity) < 1) {
      this.setState({ submitted: false });
      return false;
    }

    const userId = this.props.match.params.id;
    this.props.dispatch(userActions.changeQuota(userId, quantity));
  };

  render() {
    const userData = this.props.items || [];
    const user = userData.find(user => user._id.toString() === this.props.match.params.id) || {};

    const userDetails = user
      ? Object.entries(user)
      : [
          [
            'id',
            <span>
              <i className="text-muted icon-ban" /> Not found
            </span>
          ]
        ];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong>
                  <i className="icon-info pr-1" />
                  Increase Quota for <i>{user.username}</i>
                </strong>
              </CardHeader>
              <CardBody>
                {this.props.alertMessage && (
                  <Alert color={this.props.alertColor}>{this.props.alertMessage}</Alert>
                )}
  
                <Alert color="warning">
                  Current Quota: <i>{user.usersInBucket}</i>
                </Alert>
                <Form action="" method="post" onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="number"
                        id="quantity"
                        name="quantity"
                        placeholder="Quantity..."
                        value={this.state.quantity}
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
  const { items } = state.users;
  const { color, message } = state.alert;
  return {
    items,
    alertColor: color,
    alertMessage: message
  };
};

export default connect(mapStateToProps)(ChangeQuota);
