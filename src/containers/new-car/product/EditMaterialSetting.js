import React from 'react';
import { Button, Checkbox, Col, Icon, Modal, Popconfirm, Row, Table } from 'antd';

class EditMaterialSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      applicationVisible: false,
      pickupModuleVisible: false,
      deliveryData: [],
      applicationData: [],
      materialData: new Map(),
    };

    [
      'showApplicationModule',
      'showPickupModule',
      'handlePickupModuleCancel',
      'handleApplicationModuleCancel',
      'handleSubmit',
      'deleteApplicationData',
      'deleteDeliveryData',
      'onApplicationRowChange',
      'onPickupRowChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    const productDetail = this.props.productDetail;
    this.props.getMaterialList(0, -1, productDetail.resource_id);
  }

  componentDidMount() {
    const { productInfo } = this.props;
    this.setState({
      applicationData: productInfo.application_material_list,
      deliveryData: productInfo.pickup_material_list,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.materialData) {
      let materialListData2 = nextProps.materialData.list;
      for (let i = 0; i < materialListData2.length; i++) {
        materialListData2[i].isCheck = false;
      }
      this.setState({ materialData: materialListData2 });
    }
  }
//处理申请材料 展示问题
  showApplicationModule() {
  let {materialData,applicationData}=this.state;
  for(let i = 0; i < applicationData.length; i++){
    for(let j = 0; j < materialData.length; j++){
      if (Number(applicationData[i]._id)  === Number(materialData[j]._id)) {
        materialData[j].isCheck = true;
      }
    }
  }
    this.setState({
      applicationVisible: true,
      materialData:materialData,
    });
  }

  showPickupModule() {
    let {materialData,deliveryData}=this.state;
    for(let i = 0; i < deliveryData.length; i++){
      for(let j = 0; j < materialData.length; j++){
        if (Number(deliveryData[i]._id)  === Number(materialData[j]._id)) {
          materialData[j].isCheck = true;
        }
      }
    }
    this.setState({
      pickupModuleVisible: true,
      materialData:materialData,
    });
  }

  handlePickupModuleCancel() {
    let handleMaterialData = this.calculateMaterialData();
    this.setState({
      pickupModuleVisible: false,
      materialData: handleMaterialData,
    });
  }

  handleApplicationModuleCancel() {
    let handleMaterialData = this.calculateMaterialData();
    this.setState({
      applicationVisible: false,
      materialData: handleMaterialData,
    });
  };

  calculateMaterialData() {
    let handleMaterialData = this.state.materialData;
    for (let j = 0; j < handleMaterialData.length; j++) {
      handleMaterialData[j].isCheck = false;
    }
    return handleMaterialData;
  }
  handleSubmit() {
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
    const data = {
      product_id: this.props.product_id,
      application_material_ids: strApplication_material_ids,
      pickup_material_ids: strPickup_material_ids,
    };
    this.props.editMaterial(data);
  }

  deleteApplicationData(_id) {
    const applicationData = [...this.state.applicationData];
    let materialData = this.state.materialData;
    for (let i = 0; i < materialData.length; i++) {
      console.log(Number(materialData._id) === Number(_id));
      if (Number(materialData[i]._id) === Number(_id)) {
        materialData[i].isCheck = false;
      }
      this.setState({
        applicationData: applicationData.filter(applicationData => applicationData._id !== _id),
        materialData: materialData,
      });

    }
  }

  deleteDeliveryData(_id) {
    const deliveryData = [...this.state.deliveryData];
    let materialData = this.state.materialData;
    for (let i = 0; i < materialData.length; i++) {
      if (Number(materialData[i]._id) === Number(_id)) {
        materialData[i].isCheck = false;
      }
      this.setState({
        deliveryData: deliveryData.filter(deliveryData => deliveryData._id !== _id),
        materialData: materialData,
      });
    }
  }
  //点击行申请材料
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
  //点击行交车材料
  onPickupRowChange(part){
    const { materialData } = this.state;
    materialData.map((item, index) => {
      if (Number(item._id) === Number(part._id)) {
        materialData[index].isCheck = !(materialData[index].isCheck);
      }
    });
    this.setState({ materialData });
    const deliveryData = this.state.deliveryData;
    if (part.isCheck == true) {
      this.setState({ deliveryData: [...deliveryData, part] });
    }
    if (part.isCheck == false) {
      this.deleteDeliveryData(part._id);
    }
  }
  render() {
    const { isManager } = this.props;
    const { deliveryData, applicationData, materialData, pickupModuleVisible, applicationVisible } = this.state;

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
        width:'80',
      }, {
        title: '操作',
        key: 'action',
        dataIndex: 'isCheck',
        width:'80',
        render: (value) => (
          <span>
            {value &&<a href="javascript:;">
                <Icon type="check" />
              </a>}
          </span>
        ),
      }];

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
      render: (value) => (
          <span>
             {value &&
             (<a href="javascript:;">
               <Icon type="check" />
             </a>)
             }
          </span>

        ),
      }];

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
        width:'400',
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
        width:'400',
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
              <Button
                style={{ float: 'right' }}
                disabled={isManager}
                onClick={this.showApplicationModule}
              >
                添加材料
              </Button>
            </div>
          </Col>

          <Modal
            title="申请新增材料"
            maskClosable={true}
            footer={null}
            visible={applicationVisible}
            onCancel={this.handleApplicationModuleCancel}
          >
            <Table
              disabled={isManager}
              columns={applicationColumns}
              dataSource={materialData}
              pagination={true}
              onRowClick={this.onApplicationRowChange}
            />
          </Modal>
        </Row>

        <div>
          <Table
            columns={columnsModuleApplication}
            dataSource={applicationData}
            pagination={false}
          />
        </div>

        <Row className="head-action-bar-line mb20 mt30">
          <Col span={8}>交车材料</Col>
          <Col span={16}>
            <div className='pull-right'>
              <Button
                disabled={isManager}
                onClick={this.showPickupModule}
              >
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
              pagination={false}
              onRowClick={this.onPickupRowChange}
            />
          </Modal>
        </Row>

        <Table
          columns={columnsModuleDelivery}
          dataSource={deliveryData}
          pagination={false}
        />

        <Row type="flex" justify="center" className='mt40'>
            <Button
              type="primary"
              disabled={isManager}
              onClick={this.handleSubmit}
            >保存</Button>
        </Row>

      </div>
    );
  }
}

export default EditMaterialSetting;

