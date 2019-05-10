import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { alertActions, customerActions } from '../../_actions';

function UserRow(props) {
  const { user } = props;

  const getBadge = status => {
    return status === 'active'
      ? 'success'
      : status === 'banned'
      ? 'secondary'
      : status === 'pending'
      ? 'warning'
      : status === 'inactive'
      ? 'danger'
      : 'primary';
  };
  const status = user.accountEnabled ? 'active' : 'inactive';
  return (
    <tr key={user._id.toString()}>
      <td>
        <Link to={`/customers/edit/${user._id}`}>{user.username}</Link>
      </td>
      <td>{user.domain}</td>
      <td>{user.userPrincipalName}</td>
      <td>{user.displayName}</td>
      <td>
        <Badge color={getBadge(status)}>{status}</Badge>
      </td>
      <td>{moment(user.createdAt).format('DD/MM/YY')}</td>
      <td>{user.createdBy}</td>
      <td>
        <Link to={`/customers/detail/${user._id}`}>Details</Link>
      </td>
    </tr>
  );
}

class Customers extends Component {
  constructor(props) {
    super(props);
    // this.props.dispatch(alertActions.clear());
  }

  componentDidMount() {
    this.props.dispatch(customerActions.getAll());
  }

  render() {
    const userList = this.props.items;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Users
                <div className="card-header-actions">
                  <Button
                    onClick={() => this.props.history.push('/customers/add')}
                    block
                    color="primary"
                  >
                    <i className="fa fa-plus-square-o" /> Add new user
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {this.props.alertMessage && (
                  <Alert color={this.props.alertColor}>{this.props.alertMessage}</Alert>
                )}

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Username</th>
                      <th scope="col">Domain</th>
                      <th scope="col">Email</th>
                      <th scope="col">Full name</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList && userList.map((user, index) => <UserRow key={index} user={user} />)}
                  </tbody>
                </Table>
                {(!userList || userList.length === 0) && (
                  <Alert color={'warning'}>You have no users!</Alert>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { items } = state.customers;
  const { color, message } = state.alert;
  return {
    items,
    alertColor: color,
    alertMessage: message
  };
};

export default connect(mapStateToProps)(Customers);
