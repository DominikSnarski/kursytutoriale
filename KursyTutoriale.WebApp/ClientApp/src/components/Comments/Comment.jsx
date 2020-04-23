import React, { useState } from 'react';

function Comment({ comment }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  // const history = useHistory();

  return (
    <tbody>
      <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
        <td>
            {comment.username}
        </td>
          <td>{comment.content}</td>
        <td>{comment.insertDate}</td>
      </tr>
    </tbody>
  );
}
export default Comment;
