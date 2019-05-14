import React from 'react';

import EditVehicle from './EditVehicle';
import EditFinancial from './EditFinancial';

export default class EditFinancingInformation extends React.Component {
  render() {
    return (
      <div>
        {this.props.productDetail.type === '2'
          ? <EditFinancial
            editLoanFinance={this.props.editLoanFinance}
            editLoanFinanceResponse={this.props.editLoanFinanceResponse}
            productDetail={this.props.productDetail}
            isManager={this.props.isManager}
            product_id={this.props.product_id}
          />
          : <EditVehicle
            amountFixFinance={this.props.amountFixFinance}
            amountFixFinanceResponse={this.props.amountFixFinanceResponse}
            productDetail={this.props.productDetail}
            isManager={this.props.isManager}
            product_id={this.props.product_id}
          />}

      </div>

    );
  }
}
