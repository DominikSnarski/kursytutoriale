import React from 'react';

function Card({ card }) {

  return (
    <tbody>
      <tr>
        <td>
            {card.number}
        </td>
      </tr>
    </tbody>
  );
}
export default Card;