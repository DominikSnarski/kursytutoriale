import React, { useState } from 'react';
// import './Details.css';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col, Collapse, Button } from 'reactstrap';
import { AdminService } from '../../api/Services/AdminService';
import { Link } from 'react-router-dom';

    const ModeratorDetails = (props) => {
      const history = useHistory();
      const [isOpen, setIsOpen] = useState(false);

      const handleButtonRemoveClick = () => {
        AdminService.removeModerator(props.user.id).then(() => history.push('/')).then(() => history.push('/adminMainPanel'));
      };
    

return (
      <tbody>
        <tr>

          <td>
          <Link
              to={`/userProfile/${props.user.id}`}
              style={{ color: '#eaebec', fontWeight: 'bold' }}
            >
              {props.user.userName}
            </Link>
            </td>
          <td>{props.user.email}</td>
          <td>{props.user.id}</td>
          <td><Button onClick={() => handleButtonRemoveClick()}>Remove moderator</Button></td>
        </tr>
      </tbody>
);
};

export default ModeratorDetails;
