import React from 'react';
import BaseList from '../../../components/base/BaseList';

export default class CommonProblem extends BaseList {
  render() {
    return (
      <div className="common-problem mt20">
        <div className="head-action-bar-line">
          <p className="question">1、所有的短信类型都是计费的吗？</p>
          <p>
            以水稻汽车名义发送的提醒不扣费，例如短信验证码、短信余额提醒，其余短信类型计费。计费短信类型目前包括：保养提醒，续保提醒，年检提醒，生日提醒，套餐卡到期提醒，优惠券到账提醒，优惠券过期提醒，提车提醒，客户评价。</p>
        </div>
        <div className="head-action-bar-line mt20">
          <p className="question">2、为什么计费量会大于发送总量？</p>
          <p>短信计费规则为：每67字（包含标点符号和空格）计算为1条短信，含有标签（如门店、优惠券）的短信以实际发送字符数计算，超过67个字符会发送2条短信。</p>
        </div>
        <div className="head-action-bar-line mt20">
          <p className="question">3、短信余额可以无限期使用吗？</p>
          <p>短信余额有效期为1年，从充值当日起开始计算。具体有效期可在短信充值—充值记录内查看。</p>
        </div>
        <div className="head-action-bar-line mt20">
          <p className="question">4、设置短信提醒有什么好处？</p>
          <p>短信提醒可帮助维系客户关系，提升客户到店率。</p>
        </div>
        <div className="head-action-bar-line mt20">
          <p className="question">5、如何开发票？</p>
          <p>如需开发票，请线下联系客服人员，发票会以邮寄的形式送到您手上。客服电话为：400-091-8118。</p>
        </div>
      </div>
    );
  }
}
