import React, { useState } from 'react';
import { Container, Row, Col, Collapse, Media, Button } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import AppRoutes from '../../routing/AppRoutes';

function Comment({ comment }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const history = useHistory();

  return (
    <tbody>
      <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
        <td>
            {comment.user}
        </td>
          <td>{comment.comment}</td>
        <td>{comment.date}</td>
      </tr>
    </tbody>
  );
}
export default Comment;
