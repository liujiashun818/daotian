import React from 'react';
import { Button, Col, Icon, Modal, Popconfirm, Row, Table } from 'antd';

class AddMaterialSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationVisible: false,
      pickupModuleVisible: false,
      deliveryData: [],
      applicationData: [],
      materialData: [],
    };
    [
      'showApplicationModule',
      'showPickupModule',
      'handlePickupModuleCancel',
      'handleApplicationModuleCancel',
      'handleMaterial',
      'deleteApplicationData',
      'deleteDeliveryData',
      'onApplicationRowChange',
      'onPickupRowChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    this.props.getMaterialList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.materialData) {
      const materialListData2 = nextProps.materialData.list;
      for (let i = 0; i < materialListData2.length; i++) {
        materialListData2[i].isCheck = false;
      }
      this.setState({ materialData: materialListData2 });
    }
  }

  handlePickupModuleCancel() {
    const handleMaterialData = this.calculateMaterialData();
    this.setState({
      pickupModuleVisible: false,
      materialData: handleMaterialData,
    });
  }

  handleApplicationModuleCancel() {
    const handleMaterialData = this.calculateMaterialData();
    this.setState({
      applicationVisible: false,
      materialData: handleMaterialData,
    });
  }

  calculateMaterialData() {
    const handleMaterialData = this.state.materialData;
    for (let j = 0; j < handleMaterialData.length; j++) {
      handleMaterialData[j].isCheck = false;
    }
    return handleMaterialData;
  }

  handleMaterial() {
    const deliveryData = this.state.deliveryData;
    const applicationData = this.state.applicationData;
    const application_material_ids = [];
    const pickup_material_ids = [];
    for (let i = 0, len = applicationData.length; i < len; i++) {
      application_material_ids.push(applicationData[i]._id);
    }

    for (let i = 0, len = deliveryData.length; i < len; i++) {
      pickup_material_ids.push(deliveryData[i]._id);
    }

    const strApplication_material_ids = application_material_ids.join(',');
    const strPickup_material_ids = pickup_material_ids.join(',');
    const product_id = this.props.createProductResponse.detail._id;
    const data = {
      product_id,
      application_material_ids: strApplication_material_ids,
      pickup_material_ids: strPickup_material_ids,
    };
    this.props.editMaterial(data);
  }

  deleteApplicationData(_id) {
    const applicationData = [...this.state.applicationData];
    const materialData = this.state.materialData;
    for (let i = 0; i < materialData.length; i++) {
      if (Number(materialData[i]._id) === Number(_id)) {
        materialData[i].isCheck = false;
      }
      this.setState({
        applicationData: applicationData.filter(applicationData => applicationData._id !== _id),
        materialData,
      });
    }
  }

  deleteDeliveryData(_id) {
    const deliveryData = [...this.state.deliveryData];
    const materialData = this.state.materialData;
    for (let i = 0; i < materialData.length; i++) {
      if (Number(materialData[i]._id) === Number(_id)) {
        materialData[i].isCheck = false;
      }
      this.setState({
        deliveryData: deliveryData.filter(deliveryData => deliveryData._id !== _id),
        materialData,
      });
    }
  }

  showApplicationModule() {
    const { materialData, applicationData } = this.state;
    for (let i = 0; i < applicationData.length; i++) {
      for (let j = 0; j < materialData.length; j++) {
        if (Number(applicationData[i]._id) === Number(materialData[j]._id)) {
          materialData[j].isCheck = true;
        }
      }
    }
    this.setState({
      applicationVisible: true,
      materialData,
    });
  }

  showPickupModule() {
    const { materialData, deliveryData } = this.state;
    for (let i = 0; i < deliveryData.length; i++) {
      for (let j = 0; j < materialData.length; j++) {
        if (Number(deliveryData[i]._id) === Number(materialData[j]._id)) {
          materialData[j].isCheck = true;
        }
      }
    }
    this.setState({
      pickupModuleVisible: true,
      materialData,
    });
  }

  // 点击行申请材料
  onApplicationRowChange(part) {
    const { materialData } = this.state;
    materialData.map((item, index) => {
      if (Number(item._id) === Number(part._id)) {
        materialData[index].isCheck = !(materialData[index].isCheck);
      }
    });
    this.setState({ materialData });
    const applicationData = this.state.applicationData;
    if (part.isCheck == true) {
      this.setState({ applicationData: [...applicationData, part] });
    }
    if (part.isCheck == false) {
      this.deleteApplicationData(part._id);
    }
  }

  // 点击行交车材料
  onPickupRowChange(part) {
    const { materialData } = this.state;
    materialData.map((item, index) => {
      if (Number(item._id) === Number(part._id)) {
        materialData[index].isCheck = !(materialData[index].isCheck);
      }
    });
    this.setState({ materialData });
    const deliveryData = this.state.deliveryData;
    if (part.isCheck === true) {
      this.setState({ deliveryData: [...deliveryData, part] });
    }
    if (part.isCheck === false) {
      this.deleteDeliveryData(part._id);
    }
  }

  render() {
    const { deliveryData, applicationData, applicationVisible, pickupModuleVisible, materialData } = this.state;
    // 弹出框添加
    const applicationColumns = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width:'120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className:'center',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className:'center',
        width:'80'
      }, {
        title: '操作',
        key: 'action',
        dataIndex: 'isCheck',
        width:'80',
        render: value => (
          <span>
            {value &&
            (<a href="javascript:;">
                <Icon type="check" />
              </a>
            )}
          </span>
        ),
      }];
    // 弹出框添加
    const pickupColumns = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width:'120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className:'center',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className:'center',
        width:'80',
      }, {
        title: '操作',
        key: 'action',
        dataIndex: 'isCheck',
        width:'80',
        render: value => (
          <span>
             {value &&
             (<a href="javascript:;">
               <Icon type="check" />
             </a>)
             }
          </span>
        ),
      }];
    // 删除
    const columnsModuleApplication = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width:'120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className:'center',
        width:'400'
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className:'center',
      }, {
        title: '操作',
        key: 'action',
        width:'80',
        render: (text, record) => (
          <Popconfirm
            title="确定要删除此项吗?"
            onConfirm={() => this.deleteApplicationData(record._id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        ),
      }];
    // 删除columnsModuleDelivery
    const columnsModuleDelivery = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width:'120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className:'center',
        width:'400'
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className:'center',
      }, {
        title: '操作',
        key: 'action',
        width:'80',
        render: (text, record) => (
          <Popconfirm
            title="确定要删除此项吗?"
            onConfirm={() => this.deleteDeliveryData(record._id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        ),
      }];
    return (
      <div>
        <Row className="head-action-bar-line mb20">
          <Col span={8}>申请材料</Col>
          <Col span={16}>
            <div className="pull-right">
              <Button onClick={this.showApplicationModule}>
                添加材料
              </Button>
            </div>
          </Col>

          <Modal
            title="申请新增材料"
            visible={applicationVisible}
            maskClosable={true}
            footer={null}
            onCancel={this.handleApplicationModuleCancel}
          >
            <Table
              columns={applicationColumns}
              pagination={true}
              dataSource={materialData}
              onRowClick={this.onApplicationRowChange}
            />
          </Modal>
        </Row>
        <div>
          <Table
            columns={columnsModuleApplication}
            pagination={false}
            dataSource={applicationData}
          />
        </div>
        <Row className="head-action-bar-line mb20 mt30">
          <Col span={8}>交车材料</Col>
          <Col span={16}>
            <div className="pull-right">
              <Button onClick={this.showPickupModule}>
                添加材料
              </Button>
            </div>

          </Col>
          <Modal
            title="交车新增材料"
            visible={pickupModuleVisible}
            maskClosable={true}
            footer={null}
            onCancel={this.handlePickupModuleCancel}
          >
            <Table
              columns={pickupColumns}
              dataSource={materialData}
              pagination={true}
              onRowClick={this.onPickupRowChange}
            />
          </Modal>
        </Row>

        <Table
          columns={columnsModuleDelivery}
          dataSource={deliveryData}
          pagination={false}
        />

        <Row type="flex" justify="center" className="mt40">
            <Button
              type="primary"
              onClick={this.handleMaterial
              }>
              保存
            </Button>
        </Row>
      </div>
    );
  }
}

export default AddMaterialSetting;

