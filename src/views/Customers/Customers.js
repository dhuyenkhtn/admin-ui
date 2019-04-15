import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { userActions } from '../../_actions/user.actions';
import { alertActions } from '../../_actions';

function UserRow(props) {
  const { user } = props;
  const userLink = `/users/${user._id}`;

  const getBadge = status => {
    return status === 'Active'
      ? 'success'
      : status === 'Inactive'
      ? 'secondary'
      : status === 'Pending'
      ? 'warning'
      : status === 'Banned'
      ? 'danger'
      : 'primary';
  };

  return (
    <tr key={user._id.toString()}>
      <td>
        <Link to={userLink}>{user.username}</Link>
      </td>
      <td>
        <Link to={userLink}>{user.fullname}</Link>
      </td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <Link to={userLink}>
          <Badge color={getBadge(user.status)}>{user.status}</Badge>
        </Link>
      </td>
      <td>{moment(user.createdAt).format('DD/MM/YY')}</td>
    </tr>
  );
}

class Customers extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(alertActions.clear());
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
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
                    onClick={() => this.props.history.push('/users/add')}
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
                      <th scope="col">Email</th>
                      <th scope="col">Name</th>
                      <th scope="col">Role</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList && userList.map((user, index) => <UserRow key={index} user={user} />)}
                  </tbody>
                </Table>
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

export default connect(mapStateToProps)(Customers);
