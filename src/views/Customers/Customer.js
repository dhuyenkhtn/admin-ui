import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import {connect} from "react-redux";

class Customer extends Component {

  render() {
    const userData = this.props.items || [];
    const user = userData.find( user => user.userPrincipalName === this.props.match.params.id) || {};

    const userDetails = user ? Object.entries(user) : [['id', (<span><i className="text-muted icon-ban"/> Not found</span>)]];

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <strong><i className="icon-info pr-1"/>Detail: {user.username}</strong>
              </CardHeader>
              <CardBody>
                  <Table responsive striped hover>
                    <tbody>
                      {
                        userDetails.map(([key, value]) => {
                          return (
                            <tr key={key}>
                              <td>{`${key}:`}</td>
                              <td><strong>{value}</strong></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const {items} = state.customers;
  return {
    items
  }
};

export default connect(mapStateToProps)(Customer);
