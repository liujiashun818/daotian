import React from 'react';
import { Modal } from 'antd';

import BaseModal from '../../../components/base/BaseModal';
import ImageAvatar from '../../../components/widget/ImageAvatar/ImageAvatar';

export default class ImageShow extends BaseModal {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    const { visible } = this.state;
    const { src, title, onError } = this.props;

    return (
      <span>
        <img
          src={src}
          alt={'暂未上传图片'}
          title={title}
          onError={onError}
          className="img"
          onClick={this.showModal}
        />

        <Modal
          title={title}
          visible={visible}
          onCancel={this.hideModal}
          onOk={this.handleSubmit}
          footer={null}
          width={748}
          maskClosable={false}
        >
          <div style={{ padding: '0 60px 0 60px' }}>
            <ImageAvatar
              src={src}
              width={500}
              height={500}
              border={50}
              color={[0, 0, 0, 0.3]}
              scale={1}
              rotate={0}
            />
          </div>
        </Modal>
      </span>
    );
  }
}
