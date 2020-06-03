import {
  Spinner,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Form,
  Input,
} from 'reactstrap';
import React, { useState, useEffect } from 'react';
import './style.css';
import { ReportService } from '../../api/Services/ReportService';
import Button from '../../layouts/CSS/Button/Button';

const CourseReportModal = (props) => {
  const [reportCodes, setReportCodes] = useState([]);
  const [reportCodesLoaded, setReportCodesLoaded] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reportCodesLoading, setReportCodesLoading] = useState(false);

  useEffect(() => {
    if (!reportCodesLoading) {
      setReportCodesLoading(true);
      ReportService.getReportTypeCodes().then((response) => {
        setReportCodes(response.data);
        setReportCodesLoaded(true);
      });
    }
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    props.onSend(formData.get('comment'), selectedIndex);
  };
  const selectChanged = (e) => {
    setSelectedIndex(
      parseInt(e.target.options[e.target.selectedIndex].value, 10),
    );
  };
  if (!reportCodesLoaded) {
    return (
      <Modal isOpen={props.isOpen} toggle={props.toggle}>
        <Spinner />
      </Modal>
    );
  }
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Report Course</ModalHeader>
      <ModalBody>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Input type="select" onChange={selectChanged} name="typeSelect">
              {reportCodes.map((code, key) => {
                return (
                  <option key={key} value={code.code}>
                    {code.value}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Input type="textarea" name="comment" />
          </FormGroup>
          <ModalFooter>
            <FormGroup>
              <Button
                type="submit"
                color="success"
                onClick={props.toggle}
                text="Send"
              ></Button>{' '}
              <Button color="warning" onClick={props.toggle} text="Cancel">
                Cancel
              </Button>
            </FormGroup>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default CourseReportModal;
