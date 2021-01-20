import React from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { Button, Col, Row, Modal, Form } from "react-bootstrap";
import { createApplication } from "../redux/actions/applicationActions";
import { useSelector } from "react-redux";

const ApplicationDetails = (props) => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      company: "",
      status: "",
      location: "",
      designation: "",
      url: "",
      salary: "",
      salary2: "",
      date: ""
    },
    onSubmit: ({
      company,
      status,
      location,
      designation,
      url,
      salary,
      salary2,
      date
    }) => {
      const finalSalary = `${salary}-${salary2}`;
      // This will run when the form is submitted
      dispatch(
        createApplication({
          email: user.email,
          company,
          status,
          location,
          designation,
          url,
          salary: finalSalary,
          date
        })
      );
      props.onHide();
      formik.resetForm()
    },
  });

  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Job Application Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            className="baseForm py-5"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            {/* company input */}
            <Form.Group
              as={Row}
              className="justify-content-center  align-items-center"
            >
              <Form.Label className="col-3">Company</Form.Label>
              <Col xs={5}>
                <Form.Control
                  id="company"
                  name="company"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.company}
                  placeholder="Enter Company"
                />
              </Col>
            </Form.Group>
            {/* designaton input */}
            <Form.Group
              as={Row}
              className="justify-content-center  align-items-center"
            >
              <Form.Label className="col-3">Designation</Form.Label>
              <Col xs={5}>
                <Form.Control
                  id="designation"
                  name="designation"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.designation}
                  placeholder="Enter Designation"
                />
              </Col>
            </Form.Group>
            {/* status input */}
            <Form.Group
              as={Row}
              className="justify-content-center  align-items-center"
            >
              <Form.Label className="col-3">Status</Form.Label>
              <Col xs={5}>
                <Form.Control
                  onChange={formik.handleChange}
                  id="status"
                  name="status"
                  as="select"
                  custom
                >
                  <option value="">Select Status</option>
                  <option value="Applied">Applied</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Wish List">Wish List</option>
                </Form.Control>
              </Col>
            </Form.Group>

            {/* location input */}
            <Form.Group
              as={Row}
              className="justify-content-center align-items-center"
            >
              <Form.Label className="col-3">Location</Form.Label>
              <Col xs={5}>
                <Form.Control
                  id="location"
                  name="location"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.location}
                  placeholder="Enter Location"
                />
              </Col>
            </Form.Group>
            {/* URL input input */}
            <Form.Group
              as={Row}
              className="justify-content-center  align-items-center"
            >
              <Form.Label className="col-3">Job Listing URL</Form.Label>
              <Col xs={5}>
                <Form.Control
                  id="url"
                  name="url"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.url}
                  placeholder="Enter Job Listing URL"
                />
              </Col>
            </Form.Group>
            {/* salary input */}
            <Form.Group
              as={Row}
              className="justify-content-center  align-items-center"
            >
              <Form.Label className="col-3">Salary</Form.Label>
              <Col xs={5}>
                <Row className="align-items-center">
                  <Col className="pl-0">
                    <Form.Control
                      id="salary"
                      name="salary"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.salary}
                      placeholder="Enter Salary"
                    />
                  </Col>
                  <span className="col-auto">to</span>
                  <Col className="pr-0">
                    <Form.Control
                      id="salary2"
                      name="salary2"
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.salary2}
                      placeholder="Enter Salary"
                    />
                  </Col>
                </Row>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="justify-content-center">
              <Form.Label className="col-3">Interview Date</Form.Label>
              <Col xs={5}>
                <Form.Control
                  id="date"
                  name="date"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.date}
                />
              </Col>
            </Form.Group>
            <Row className="mt-5 justify-content-center">
              <Button className="btn btn-primary mr-2" onClick={props.onHide}>
                Close
              </Button>
              <Button type="submit" className="btn btn-primary">
                Submit
              </Button>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ApplicationDetails;
