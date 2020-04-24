import React, { useState } from 'react';
import {
  Popover,
  PopoverHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from 'reactstrap';
import { UserContext } from '../../contexts/UserContext';
import Button from '../../layouts/CSS/Button/Button';

function Comment(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpvoteOpen, setIsUpvoteOpen] = useState(false);
  const [isDownvoteOpen, setIsDownvoteOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userContext = React.useContext(UserContext);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleUpvote = () => {
    setIsUpvoteOpen(!isUpvoteOpen);
    setTimeout(() => {
      setIsUpvoteOpen(false);
    }, 1500);
  };

  const toggleDownvote = () => {
    setIsDownvoteOpen(!isDownvoteOpen);
    setTimeout(() => {
      setIsDownvoteOpen(false);
    }, 1500);
  };

  // const history = useHistory();

  return (
    <div>
      <tbody>
        <tr onClick={() => toggle()} style={{ cursor: 'pointer' }}>
          <td>{props.comment.username}</td>
          <td>{props.comment.content}</td>
          <td>{props.comment.insertDate}</td>
          <td id="Upvote">&#128077;</td>

          <Popover
            placement="top"
            isOpen={isUpvoteOpen}
            target="Upvote"
            toggle={() => toggleUpvote()}
          >
            <PopoverHeader>+1</PopoverHeader>
          </Popover>
          <td id="Downvote">&#128078;</td>

          <Popover
            placement="top"
            isOpen={isDownvoteOpen}
            target="Downvote"
            toggle={() => toggleDownvote()}
          >
            <PopoverHeader>-1</PopoverHeader>
          </Popover>
        </tr>
        {isOpen && userContext.userid === props.ownerId && (
          <tr>
            <Button
              text="Delete"
              color="red"
              width={50}
              height={30}
              fontSize={10}
              onClick={() => toggleModal()}
            ></Button>
          </tr>
        )}
      </tbody>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Delete coment</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button onClick={() => toggleModal()} text="Yes" />
          <Button onClick={() => toggleModal()} text="Cancel" />
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default Comment;
