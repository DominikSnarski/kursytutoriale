import React from 'react';

function Transaction({ transaction }) {
  return (
    <tbody>
      <tr>
        <td>{transaction.amount / 100}</td>
        <td>**** **** **** {transaction.paymentMethodDetails}</td>
        <td>{transaction.orderItemName}</td>
        <td>
          {transaction.date
            .toLocaleString()
            .substring(0, transaction.date.toLocaleString().length - 9)}
        </td>
      </tr>
    </tbody>
  );
}
export default Transaction;
