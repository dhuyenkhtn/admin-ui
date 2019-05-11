import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import { userActions } from '../../_actions/user.actions';
import { alertActions, domainsActions } from '../../_actions';

function UserRow(props) {
  const { user } = props;
  const userLink = `/users/edit/${user._id}`;

  const getBadge = status => {
    return status === 'active'
      ? 'success'
      : status === 'inactive'
      ? 'danger'
      : status === 'pending'
      ? 'warning'
      : status === 'banned'
      ? 'danger'
      : 'primary';
  };

  const getRoleBadge = status => {
    return status === 'admin'
      ? 'danger'
      : status === 'reseller'
      ? 'warning'
      : status === 'user'
      ? 'primary'
      : 'primary';
  };

  return (
    <tr key={user._id.toString()}>
      <td>
        <Link to={userLink}>{user.username}</Link>
      </td>
      <td>{user.fullname}</td>
      <td>{user.role === 'admin' ? 'Unlimited' : user.usersInBucket}</td>
      <td>{user.usersCreated}</td>
      <td>{user.tokenInBucket}</td>
      <td>{user.canUseDomains.map(e => <Badge color="primary">{e}</Badge>)}</td>
      <td>
        <Link to={userLink}>
          <Badge color={getBadge(user.status)}>{user.status.toUpperCase()}</Badge>
        </Link>
      </td>
      <td><Badge color={getRoleBadge(user.role)}>{user.role.toUpperCase()}</Badge></td>
      <td>{moment(user.createdAt).format('DD/MM/YY')}</td>
      <td>
        {user.role === 'reseller' && (
          <Button style={{ margin: '2px' }} size="sm" color="primary">
              <i className="fa fa-pencil-square-o" aria-hidden="true" />
              {` `}
            <Link style={{color: '#fff'}} to={`/users/change-quota/${user._id}`}>Change quota</Link>
          </Button>
        )}
      </td>
    </tr>
  );
}

class Users extends Component {
  constructor(props) {
    super(props);
    // this.props.dispatch(alertActions.clear());
  }

  componentDidMount() {
    this.props.dispatch(userActions.getAll());
    this.props.dispatch(domainsActions.getAll());
  }

  render() {
    const userList = this.props.items;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Resellers
                <div className="card-header-actions">
                  <Button
                    onClick={() => this.props.history.push('/users/add')}
                    block
                    color="primary"
                  >
                    <i className="fa fa-plus-square-o" /> Add new
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
                      <th scope="col">Name</th>
                      <th scope="col">Quota</th>
                      <th scope="col">Users Created</th>
                      <th scope="col">Tokens</th>
                      <th scope="col">Domains</th>
                      <th scope="col">Status</th>
                      <th scope="col">Role</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Actions</th>
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

export default connect(mapStateToProps)(Users);
