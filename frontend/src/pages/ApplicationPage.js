import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  getOneApplication,
  editApplication,
  getQuestions,
} from "../redux/actions/applicationActions";
import { Redirect, useParams } from "react-router-dom";
import { Row, Col, Form, Tab, Tabs, Button } from "react-bootstrap";
import CustomContainer from "../components/Container";
import Timeline from "../components/Timeline";
import InterviewQuestionModal from "../components/InterviewQuestionModal";
import InterviewQuestionCard from "../components/InterviewQuestionCard";
import moment from 'moment'

const ApplicationPage = ({ history }) => {
  const user = useSelector((state) => state.auth.user);
  const questions = useSelector((state) => state.question.questions);
  const dispatch = useDispatch();
  const application = useSelector((state) => state.app.currentApp);
  let company, designation, location, salary, url, status, timeline, date;
  if (application) {
    company = application.company;
    designation = application.designation;
    location = application.location;
    salary = application.salary;
    url = application.url;
    status = application.status;
    timeline = application.timeline;
    date = application.date;
  }
  console.log("date", date)


  const { id } = useParams();
  const [read, setRead] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      company: company || "",
      designation: designation || "",
      location: location || "",
      status: status || "",
      url: url || "",
      salary: salary ? salary.split("-")[0] : "",
      salary2: salary ? salary.split("-")[1] : "",
      date: moment(date).format("yyyy-MM-DD") || "",
    },
    onSubmit: ({
      company,
      salary,
      salary2,
      designation,
      status,
      url,
      location,
      date,
    }) => {
      const finalSalary = salary + "-" + salary2;
      let updatedTimeline = timeline;
      if (status !== application.status) {
        updatedTimeline = [...timeline, { status: status, time: new Date() }];
      }
      dispatch(
        editApplication(id, {
          company,
          salary: finalSalary,
          email: user.email,
          designation,
          status,
          url,
          date,
          location,
          timeline: updatedTimeline,
        })
      );
      setRead(!read);
    },
  });

  useEffect(() => {
    dispatch(getOneApplication(id));
    dispatch(getQuestions(id));
  }, [dispatch, id]);

  if (!user && !localStorage.getItem("user")) {
    return <Redirect to="/login" />;
  }
  return application ? (
    <CustomContainer>
      <Row>
        <Col xs={9}>
          <Tabs defaultActiveKey="basic" id="uncontrolled-tab-example">
            <Tab eventKey="basic" title="Basic">
              <h3 className="text-center mt-2">
                <strong>Application Details</strong>
              </h3>
              <hr />
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
                      readOnly={!read}
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
                      readOnly={!read}
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
                      disabled={!read}
                      value={formik.values.status}
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
                      readOnly={!read}
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
                      readOnly={!read}
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
                          readOnly={!read}
                        />
                      </Col>
                      <span>to</span>
                      <Col className="pr-0">
                        <Form.Control
                          id="salary2"
                          name="salary2"
                          type="text"
                          onChange={formik.handleChange}
                          value={formik.values.salary2}
                          placeholder="Enter Salary"
                          readOnly={!read}
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
                      readOnly={!read}
                      onChange={formik.handleChange}
                      value={formik.values.date}
                    />
                  </Col>
                </Form.Group>
                <Row className="mt-5">
                  <Button
                    className="btn btn-primary m-auto"
                    onClick={() => history.goBack()}
                    variant="light"
                  >
                    Back
                  </Button>

                  <Button
                    className="btn btn-primary ml-auto mr-2"
                    onClick={() => setRead(true)}
                  >
                    Edit
                  </Button>

                  <Button disabled={!read} type="submit" className="btn btn-primary mr-auto">
                    Save
                  </Button>
                </Row>
              </Form>
            </Tab>
            <Tab
              eventKey="interview"
              title="Interview"
              style={{ minHeight: "calc(100vh - 181px)" }}
            >
              <InterviewQuestionModal
                appId={id}
                show={showModal}
                onClose={() => setShowModal(false)}
              />
              <Row className="justify-content-center mt-3 px-5">
                <Button
                  onClick={() => setShowModal(true)}
                  className="btn btn-primary btn-block"
                >
                  Add Question
                </Button>
              </Row>
              <Row>
                <Button
                  className="btn btn-primary mr-auto ml-3 mt-4"
                  onClick={() => history.goBack()}
                  variant="light"
                >
                  Back
                </Button>
              </Row>

              <Row className="pt-5">
                {questions &&
                  questions.map((item) => (
                    <Col md={6} className="pb-3" key={item._id}>
                      <InterviewQuestionCard
                        appId={id}
                        questionId={item._id}
                        question={item.question}
                        answer={item.answer}
                      />
                    </Col>
                  ))}
              </Row>
            </Tab>
          </Tabs>
        </Col>
        <Col
          xs={3}
          style={{ backgroundColor: "#013a63", color: "white", paddingTop: 20 }}
        >
          <Timeline
            timeline={
              application && application.timeline ? application.timeline : []
            }
          />
        </Col>
      </Row>
    </CustomContainer>
  ) : (
    <></>
  );
};

export default ApplicationPage;
