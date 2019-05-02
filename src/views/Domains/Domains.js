import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Alert, Badge, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import { alertActions } from '../../_actions';

import { domainsActions } from '../../_actions/domains.actions';

function DomainRow(props) {
  const { domain, key } = props;
  const domainLink = `/domains/${domain.domain}`;

  const getBadge = status => {
    return status === 'active'
      ? 'success'
      : status === 'inactive'
      ? 'secondary'
      : status === 'pending'
      ? 'warning'
      : status === 'banned'
      ? 'danger'
      : 'primary';
  };

  return (
    <tr key={key}>
      <td>
        <Link to={domainLink}>{domain.domain}</Link>
      </td>
      <td>{domain.tenant}</td>
      <td>{domain.createdBy}</td>
      <td>
        <Badge color={getBadge(domain.status)}>{domain.status}</Badge>
      </td>
      <td>{moment(domain.createdAt).format('DD/MM/YY')}</td>
    </tr>
  );
}

class Domains extends Component {
  constructor(props) {
    super(props);
    this.props.dispatch(alertActions.clear());
  }

  componentDidMount() {
    this.props.dispatch(domainsActions.getAll());
  }

  render() {
    const { items, alertMessage, alertColor, history } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify" /> Domains
                <div className="card-header-actions">
                  <Button onClick={() => history.push('/domains/add')} block color="primary">
                    <i className="fa fa-plus-square-o" /> Add new domain
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                {alertMessage && <Alert color={alertColor}>{alertMessage}</Alert>}

                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Domain</th>
                      <th scope="col">Tenant</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Status</th>
                      <th scope="col">Created at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items && items.map(item => <DomainRow key={item._id} domain={item} />)}
                  </tbody>
                </Table>
                {(!items || items.length) === 0 && <Alert color="warning">Empty domains!</Alert>}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { items } = state.domains;
  const { color, message } = state.alert;
  return {
    items,
    alertColor: color,
    alertMessage: message
  };
};

export default connect(mapStateToProps)(Domains);
