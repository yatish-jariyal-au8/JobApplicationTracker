import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import JobCard from "../components/JobCard";
import ApplicationDetails from "../components/ApplicationDetails";
import CustomContainer from "../components/Container";

const DashBoardPage = (props) => {
  const [modalShow, setModalShow] = useState(false);
  return !props.user ? (
    <Redirect to="/login" />
  ) : (
    <CustomContainer>
      <h3 className="text-center mt-2">
        <strong>Dashboard</strong>
      </h3>
      <hr />
      <Container fluid>
        <Row className="justify-content-center">
          <Col sm={10} xl={11}>
            <Button
              onClick={() => setModalShow(true)}
              className="btn btn-primary ml-auto btn-block my-3"
            >
              New Application
            </Button>            
            <Row>
              <h3 className="py-4">Applied</h3>
            </Row>
            <Row style={{overflow: "hidden"}}>
              <JobCard status="Applied" />
            </Row>
            <Row>
              <h3 className="py-4">Accepted</h3>
            </Row>
            <Row style={{overflow: "hidden"}}>
              <JobCard status="Accepted" />
            </Row>
            <Row>
              <h3 className="py-4">WishList</h3>
            </Row>
            <Row style={{overflow: "hidden"}}>
              <JobCard status="Wish List" />
            </Row>
            <Row >
              <h3 className="py-4">Rejected</h3>
            </Row>
            <Row style={{overflow: "hidden"}} className="pb-5">
              <JobCard status="Rejected" />
            </Row>
          </Col>
        </Row>
      </Container>
      <ApplicationDetails
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
        keyboard={false}
      />
    </CustomContainer>
  );
};

const mapStateToProps = (globalState) => {
  return {
    user: globalState.auth.user,
  };
};

export default connect(mapStateToProps)(DashBoardPage);
