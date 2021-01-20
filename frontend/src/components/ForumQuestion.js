import React from "react";
import { Col, Row, Accordion, Card, Button } from "react-bootstrap";

const ForumQuestion = ({ question, answer, addedBy }) => {
  return (
    <Col md={6} className="py-3">
      <Accordion defaultActiveKey="1">
        <Card>
          <Card.Header>
            <Row>
              <Col>
                <Row>
                  <label>{question}</label>
                </Row>
                <Row className="pl-0">
                    <Accordion.Toggle className="pl-0" as={Button} variant="link" eventKey="0">
                      See answer!
                    </Accordion.Toggle>
                  </Row>

                <Row className="justify-content-end">
                  <label style={{ fontSize: 12, color: "#555" }}>
                    Added By: {addedBy}
                  </label>
                </Row>
              </Col>
            </Row>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>{answer}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Col>
  );
};

export default ForumQuestion;
