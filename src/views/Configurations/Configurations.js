import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { alertActions, configurationActions } from '../../_actions';
import Link from 'react-router-dom/es/Link';

function Item({ item, sync, isSyncing }) {
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
  const getSyncStatusBadge = status => {
    return status === 'In Progress' ? 'warning' : status === 'Completed' ? 'success' : 'secondary';
  };

  return (
    <tr key={item._id}>
      <td>
        <Link to={`/configurations/${item.clientId}`}>{item.clientId}</Link>
      </td>
      <td>{item.tenant}</td>
      <td>{item.username}</td>
      <td>
        <Badge color={getBadge(item.status)}>{item.status}</Badge>
      </td>
      <td>{moment(item.createdAt).format('DD/MM/YY')}</td>
      <td>{item.lastSync ? moment(item.lastSync).format('DD/MM/YY') : '...'}</td>
      <td>
        <Badge color={getSyncStatusBadge(item.lastSyncStatus)}>{item.lastSyncStatus}</Badge>
      </td>
      <td>
        <Button
          onClick={() => sync(item.tenant)}
          disabled={
            isSyncing || item.lastSyncStatus === 'In Progress' || item.status === 'inactive'
          }
          color="warning"
        >
          Sync
        </Button>
      </td>
    </tr>
  );
}

class Configurations extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(alertActions.clear());
  }

  componentDidMount() {
    this.props.dispatch(configurationActions.getAll());
  }

  handleSync = tenant => {
    this.props.dispatch(configurationActions.synchronize(tenant));
  };

  render() {
    const { items, alertMessage, alertColor, history, isSyncing } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Configurations
                <div className="card-header-actions">
                  <Button
                    onClick={() => history.push('/configurations/create')}
                    block
                    color="primary"
                  >
                    <i className="fa fa-plus-square-o" /> Add new config
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {alertMessage && <Alert color={alertColor}>{alertMessage}</Alert>}

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Client ID</th>
                      <th scope="col">Tenant</th>
                      <th scope="col">Username</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created at</th>
                      <th scope="col">Last Sync</th>
                      <th scope="col">Last Sync Status</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items &&
                      items.map(item => (
                        <Item
                          key={item._id}
                          item={item}
                          sync={this.handleSync}
                          isSyncing={isSyncing}
                        />
                      ))}
                  </tbody>
                </Table>
                {(!items || items.length) === 0 && <Alert color="warning">Empty configs!</Alert>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { items, isSyncing } = state.configurations;
  const { color, message } = state.alert;
  return {
    items,
    alertColor: color,
    alertMessage: message,
    isSyncing
  };
};

export default connect(mapStateToProps)(Configurations);
