import React from 'react';
import { Button, message, Popconfirm } from 'antd';

import api from '../../../middleware/api';

export default class Shield extends React.Component {
  static defaultProps = {
    disabled: false,
  };

  constructor(props) {
    super(props);

    this.handleShield = this.handleShield.bind(this);
  }

  handleShield() {
    api.ajax({
      url: api.question.shield(),
      type: 'post',
      data: { question_id: this.props.id },
    }, () => {
      message.success('问题屏蔽成功');
      // location.reload();
      this.props.handleSuccess();
    }, err => {
      message.error(`问题屏蔽失败[${err}]`);
    });
  }

  render() {
    const { shape, disabled } = this.props;

    return (
      <span>
        {disabled ? (
          <span>
              {shape === 'button' ? <Button type="primary" disabled={disabled}>屏蔽问题</Button> :
                <a href="javascript:" disabled={disabled}>屏蔽问题</a>
              }
            </span>
        ) : <Popconfirm
          placement="topRight"
          title="你确定要屏蔽问题内容吗？"
          onConfirm={this.handleShield}
        >
          {shape === 'button' ? <Button type="primary" disabled={disabled}>屏蔽问题</Button> :
            <a href="javascript:" disabled={disabled}>屏蔽问题</a>
          }
        </Popconfirm>
        }
      </span>
    );
  }
}
