import React from 'react';
import { Col, Row } from 'antd';

import api from '../../../middleware/api';

import BaseList from '../../../components/base/BaseList';

import NewAdvert from './New';
import Table from './Table';

export default class List extends BaseList {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
  }

  render() {
    return (
      <div>
        <Row className="head-action-bar">
          <Col span={24}>
            <div className="pull-right">
              <NewAdvert onSuccess={this.handleSuccess} />
            </div>
          </Col>
        </Row>

        <Table
          source={api.advert.list(this.state)}
          page={this.state.page}
          reload={this.state.reload}
          updateState={this.updateState}
          onSuccess={this.handleSuccess}
        />
      </div>
    );
  }
}
