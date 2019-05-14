import React from 'react';
import { Button, Checkbox, Col, message, Radio, Row } from 'antd';

import api from '../../../middleware/api';

const RadioGroup = Radio.Group;

export default class Role extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      permissionMap: new Map(),  // 根级权限
      selectedRoleId: '',
    };

    [
      'handleSubmit',
      'handleRadioChange',
      'handleCheckboxChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.getAllDepartmentRoles();
    this.getPermissions('0');
  }

  handleSubmit(e) {
    e.preventDefault();

    const { selectedRoleId, permissionMap } = this.state;
    if (!selectedRoleId) {
      message.warning('请先选择角色');
      return false;
    }

    const checkedIds = this.assembleCheckedIds(permissionMap);

    api.ajax({
      url: api.admin.permission.updateByRole(),
      type: 'post',
      data: {
        role: selectedRoleId,
        item_ids: checkedIds.toString(),
      },
    }, () => {
      message.success('设置成功');
    }, error => {
      message.error(`设置失败[${error}]`);
    });
  }

  handleRadioChange(e) {
    const roleId = e.target.value;
    this.setState({ selectedRoleId: roleId });
    this.getRolePermissions(roleId);
  }

  handleCheckboxChange(item, e) {
    const checked = e.target.checked;
    const { permissionMap } = this.state;

    const parentItem = permissionMap.get(item.parent_id);
    const items = parentItem.items;
    item.checked = checked;
    items.set(item._id, item);
    parentItem.items = items;
    permissionMap.set(item.parent_id, parentItem);

    this.setState({ permissionMap });
  }

  getAllDepartmentRoles() {
    api.ajax({ url: api.user.getAllDepartmentRoles() }, data => {
      const { roles } = this.state;
      roles.push(...data.res.roles);
      this.setState({ roles });
    });
  }

  getDepartmentRoles(departmentId) {
    api.ajax({ url: api.user.getDepartmentRoles(departmentId) }, data => {
      const { roles } = this.state;
      roles.push(...data.res.roles);
      this.setState({ roles });
    });
  }

  getRolePermissions(roleId) {
    api.ajax({ url: api.admin.permission.getByRole(roleId) }, data => {
      const { list } = data.res;

      const { permissionMap } = this.state;

      permissionMap.forEach(permission => {
        const itemsMap = permission.items;
        if (itemsMap && itemsMap.size > 0) {
          // 1. set all to false
          itemsMap.forEach(subItem => {
            subItem.checked = false;
            itemsMap.set(subItem._id, subItem);
          });

          // 2. set checked to true
          list.map(item => {
            const checkedItem = itemsMap.get(item.item_id);
            if (checkedItem) {
              checkedItem.checked = true;
              itemsMap.set(checkedItem._id, checkedItem);
            }
          });
        }

        permission.items = itemsMap;
        permissionMap.set(permission._id, permission);
      });

      this.setState({ permissionMap });
    });
  }

  getPermissions(parentId) {
    api.ajax({ url: api.admin.permission.list(parentId) }, data => {
      const { list } = data.res;

      const { permissionMap } = this.state;

      if (list.length > 0) {
        if (String(parentId) === '0') {// 一级节点
          list.forEach(item => {
            permissionMap.set(item._id, item);

            this.getPermissions(item._id);
          });
        } else {
          permissionMap.forEach(mapItem => {
            if (mapItem._id === parentId) {
              const currentMapItem = permissionMap.get(parentId);

              const subMap = new Map();
              list.forEach(item => {
                item.checked = false; // 是否选中
                subMap.set(item._id, item);
              });

              currentMapItem.items = subMap;
              permissionMap.set(parentId, currentMapItem);
            }
          });
        }

        this.setState({ permissionMap });
      }
    });
  }

  assembleCheckedIds(permissionMap) {
    const ids = [];
    permissionMap.forEach(rule => {
      const items = rule.items;
      if (items && items.size > 0) {
        items.forEach(item => item.checked && ids.push(item._id));
      }
    });

    return ids;
  }

  renderPermission(permissionMap) {
    const htmls = [];

    if (permissionMap.size === 0) {
      return null;
    }

    permissionMap.forEach(rule => {
      htmls.push(
        <div className="mb15" key={rule._id}>
          <h4 className="mt10 mb10">{rule.name}</h4>
          <Row>
            {rule.items && rule.items.size > 0 && Array.from(rule.items.values()).map(item => (
              <Col span={4}>
                <Checkbox
                  checked={item.checked}
                  onChange={this.handleCheckboxChange.bind(this, item)}
                  key={item._id}
                >
                  {item.name}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </div>,
      );
    });

    return htmls;
  }

  render() {
    const { roles, permissionMap } = this.state;

    const radioStyle = {
      display: 'block',
      height: '36px',
      lineHeight: '36px',
    };

    return (
      <div>
        <Row className="head-action-bar-line-sm">
          <Col span={4}>
            <h3 className="action-title">角色类型</h3>
          </Col>
          <Col span={18}>
            <h3 className="action-title">功能</h3>
          </Col>
          <Col span={2}>
            <div className="pull-right">
              <Button type="primary" onClick={this.handleSubmit}>保存</Button>
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={4}>
            <div style={{ width: 200 }}>
              <RadioGroup onChange={this.handleRadioChange}>
                {roles && roles.map(item => <Radio value={item._id} style={radioStyle}
                                                   key={item._id}>{item.name}</Radio>)}
              </RadioGroup>
            </div>
          </Col>
          <Col span={20}>
            {this.renderPermission(permissionMap)}
          </Col>
        </Row>
      </div>
    );
  }
}
