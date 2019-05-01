import React, { Component, lazy, Suspense } from 'react';

import { Card, CardBody, Col, Row } from 'reactstrap';
import { Bar, Line } from 'react-chartjs-2';

export const DashboardReseller = ({user}) => {
  return (
    <Row>
      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-info">
          <CardBody className="pb-0">
            <div className="text-value">{user.tokenInBucket}</div>
            <div>Available Tokens</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            {/*<Line data={cardChartData2} options={cardChartOpts2} height={70} />*/}
          </div>
        </Card>
      </Col>

      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-primary">
          <CardBody className="pb-0">
            <div className="text-value">{user.tokenUsed}</div>
            <div>Email Created</div>
          </CardBody>
          <div className="chart-wrapper mx-3" style={{ height: '70px' }}>
            {/*<Line data={cardChartData1} options={cardChartOpts1} height={70} />*/}
          </div>
        </Card>
      </Col>

      {/*<Col xs="12" sm="6" lg="3">*/}
        {/*<Card className="text-white bg-warning">*/}
          {/*<CardBody className="pb-0">*/}
            {/*<div className="text-value">9.823</div>*/}
            {/*<div>Members online</div>*/}
          {/*</CardBody>*/}
          {/*<div className="chart-wrapper" style={{ height: '70px' }}>*/}
            {/*/!*<Line data={cardChartData3} options={cardChartOpts3} height={70} />*!/*/}
          {/*</div>*/}
        {/*</Card>*/}
      {/*</Col>*/}
      
      {/*<Col xs="12" sm="6" lg="3">*/}
        {/*<Card className="text-white bg-danger">*/}
          {/*<CardBody className="pb-0">*/}
            {/*<div className="text-value">9.823</div>*/}
            {/*<div>Members online</div>*/}
          {/*</CardBody>*/}
          {/*<div className="chart-wrapper mx-3" style={{ height: '70px' }}>*/}
            {/*/!*<Bar data={cardChartData4} options={cardChartOpts4} height={70} />*!/*/}
          {/*</div>*/}
        {/*</Card>*/}
      {/*</Col>*/}
    </Row>
  );
};
