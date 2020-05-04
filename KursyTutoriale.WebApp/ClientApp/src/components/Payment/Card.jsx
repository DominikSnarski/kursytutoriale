import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';
import { PaymentService } from '../../api/Services/PaymentService';
import Button from '../../layouts/CSS/Button/Button';

function Card(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardId = props.card.id;
  const courseID = props.courseId;
  const discountCode = "";

  const userContext = React.useContext(UserContext);
  const history = useHistory();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalClickYes = () => {
    setIsModalOpen(!isModalOpen);

    PaymentService.removeCard(cardId, courseID)
      .then(() => history.push('/'))
      .then(() => history.push(`/userprofile/${userContext.id}`));
  }

  const handleSelect = () => {
    PaymentService.paymentWithSelectedCreditCard(
      courseID,
      cardId,
      discountCode
    ).then(() => {
      history.push(`/courseview/${courseID}`);
    });
  }

  return (
    <div>

    <tbody>
      <tr>
        <td>
            **** **** **** {props.card.last4Digits}
        </td>
        
        {props.deleteable === true && (
          <td>
          <Button
              text="Delete"
              color="red"
              width={75}
              height={40}
              fontSize={15}
              onClick={() => toggleModal()}
            ></Button>
            </td>
        )}       
          
          
          {props.deleteable === false && (
            <td>
          <Button
              text="Select"
              width={75}
              height={40}
              fontSize={15}
              onClick={() => handleSelect()}
            ></Button>
            </td>
          )}
          
      </tr>
    </tbody>

    <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Delete coment</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button onClick={() => toggleModalClickYes()} text="Yes" />
          <Button onClick={() => toggleModal()} text="Cancel" />
        </ModalFooter>
      </Modal>

    </div>
  );
}
export default Card;