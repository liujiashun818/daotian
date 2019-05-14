import React from 'react';

import AddVehicle from './AddVehicle';
import AddFinancial from './AddFinancial';

export default class AddFinancingInformation extends React.Component {

  render() {
    return (
      <div>
        {this.props.type === '2'
          ? (
            <AddFinancial
              editLoanFinance={this.props.editLoanFinance}
              editLoanFinanceResponse={this.props.editLoanFinanceResponse}
              createProductResponse={this.props.createProductResponse}
            />)
          : (
            <AddVehicle
              amountFixFinance={this.props.amountFixFinance}
              amountFixFinanceResponse={this.props.amountFixFinanceResponse}
              createProductResponse={this.props.createProductResponse}
            />
          )}
      </div>
    );
  }
}
