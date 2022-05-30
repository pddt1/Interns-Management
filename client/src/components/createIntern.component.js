import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, FloatingLabel, Button } from "react-bootstrap";
import UserService from "../services/user.service";

export default function CreateIntern(props) {
  const [validated, setValidated] = useState(false);
  const [intern, setIntern] = useState({
    fullName: "",
    phoneNumber: "",
    year: "",
    major: "",
    startDay: "",
    endDay: "",
    result: false,
  });
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    setIntern({
      fullName: "",
      phoneNumber: "",
      year: "",
      major: "",
      startDay: "",
      endDay: "",
      result: false,
    });
    setValidated(false);
    setCvFile(null);
  }, [props.isOpen]);
  function handleInput(e) {
    var { name, value } = e.target;
    setIntern((preValue) => {
      return {
        ...preValue,
        [name]: name === "result" ? !preValue.result : value,
      };
    });
    console.log(intern);
  }
  function handleSubmit(e) {
    const form = e.currentTarget;

    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("cv", cvFile);
      for (var key in intern) {
        formData.append(key, intern[key]);
      }
      UserService.addIntern(formData).then(
        (res) => {
          props.onAdd(res.data.data);
          props.hideModal();
        },
        (err) => {
          alert(err.message);
          props.hideModal();
        }
      );
    }
    setValidated(true);
  }
  function handleFile(e) {
    setCvFile(e.target.files[0]);
  }
  return (
    <Modal show={props.isOpen} onHide={() => props.hideModal()}>
      <Modal.Header>
        <Modal.Title>Create Intern Field</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel
            className="mb-2"
            controlId="formFullName"
            label="Full Name"
          >
            <Form.Control
              required
              type="text"
              placeholder="your fullname"
              name="fullName"
              onChange={handleInput}
              value={intern.fullName}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-2"
            controlId="formPhone"
            label="Phone Number"
          >
            <Form.Control
              required
              type="tel"
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleInput}
              value={intern.phoneNumber}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-2" controlId="formMajor" label="Major">
            <Form.Control
              required
              type="text"
              placeholder="Major"
              name="major"
              onChange={handleInput}
              value={intern.major}
            />
          </FloatingLabel>
          <FloatingLabel
            className="mb-2"
            controlId="formGrade"
            label="Year in university"
          >
            <Form.Select required onChange={handleInput} name="year">
              <option value=""> Select</option>
              <option value="1">1st year</option>
              <option value="2">2nd year</option>
              <option value="3">3rd year</option>
              <option value="4">4nd year</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel className="mb-2" label="Start day" controlId="sdob">
            <Form.Control
              required
              type="date"
              placeholder="Date of Birth"
              name="startDay"
              onChange={handleInput}
              value={intern.startDay}
            />
          </FloatingLabel>
          <FloatingLabel className="mb-2" label="End day" controlId="edob">
            <Form.Control
              required
              type="date"
              placeholder="Date of Birth"
              name="endDay"
              onChange={handleInput}
              value={intern.endDay}
            />
          </FloatingLabel>
          <Form.Group className="mb-2" controlId="internresult">
            <Form.Label style={{ paddingRight: "5px" }}>
              <h6>Internship result:</h6>{" "}
            </Form.Label>
            <Form.Check
              inline
              label="Passed"
              name="result"
              onChange={handleInput}
              value={intern.result}
            ></Form.Check>
          </Form.Group>
          <Form.Group controlId="formFileSm" className="mb-2">
            <Form.Label>Upload CV</Form.Label>
            <Form.Control
              required
              type="file"
              size="sm"
              name="cv"
              onChange={handleFile}
            />
          </Form.Group>
          <div className="button-intern">
            <button onClick={() => props.hideModal()}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </Form>
      </Modal.Body>
      {/* <Modal.Footer>
          
        </Modal.Footer> */}
    </Modal>
  );
}
