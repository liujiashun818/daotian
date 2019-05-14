import { connect } from 'react-redux';
import { Col, Row } from 'antd';

import React from 'react';
import { bindActionCreators } from 'redux';

import {
  createResource,
  editResource,
  getResourceList,
  resourceOffLine,
  setPage,
} from '../../../reducers/new-car/resource/resourceActions';

import BaseList from '../../../components/base/BaseList_';

import New from './New';
import Table from './Table';

class List extends BaseList {
  constructor(props) {
    super(props);
    this.state = {
      listName: 'getResourceList',
      paramsChange: ['page'],
    };

    [
      'createResource',
      'handleResourceEdit',
      'handleOffLine',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleResourceEdit(data, callback) {
    this.props.actions.editResource(data, callback);
  }

  createResource(data, callback) {
    this.props.actions.createResource(data, callback);
  }

  handleOffLine(id) {
    this.props.actions.resourceOffLine(id);
  }

  render() {
    const { isFetching, page, list, total } = this.props;
    return (
      <div>
        <Row className="head-action-bar">
          <Col span={24}>
            <div className="pull-right">
              <New
                onSuccess={this.handleSuccess}
                createResource={this.createResource}
              />
            </div>
          </Col>
        </Row>

        <span className="new-car-resource">
          <Table
            updatePage={this.updatePage}
            onSuccess={this.handleSuccess}
            isFetching={isFetching}
            page={page}
            list={list}
            total={total}

            resourceEdit={this.handleResourceEdit}
            offLine={this.handleOffLine}
          />
        </span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isFetching, page, list, total } = state.newCarResource;
  return { isFetching, page, list, total };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getResourceList,
      setPage,
      editResource,
      createResource,
      resourceOffLine,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
