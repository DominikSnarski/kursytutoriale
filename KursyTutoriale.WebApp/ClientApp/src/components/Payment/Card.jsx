import React from 'react';

function Card({ card }) {

  return (
      
    <tbody>
      <tr>
        <td>
            **** **** **** {card.last4Digits}
        </td>
      </tr>
    </tbody>
  );
}
export default Card;