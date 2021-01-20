import React, { useState } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  deleteQuestion,
} from "../redux/actions/applicationActions";
import InterviewQuestionModal from "./InterviewQuestionModal";

const InterviewQuestionCard = ({ appId, questionId, question, answer }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <InterviewQuestionModal
        appId={appId}
        show={showModal}
        data={{question, answer}}
        isEditing={true}
        questionId={questionId}
        onClose={() => setShowModal(false)}
      />
        <Accordion defaultActiveKey="1">
          <Card className="question-card">
            <Card.Header>
              <label className="pt-4">{question}</label>
              <span className="delete-icon">
            <i
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setShowModal(true)
                
              }}
              className="edit-icon ri-pencil-line"
            ></i>
            <i
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                dispatch(deleteQuestion(appId, questionId));
              }}
              className=" ri-delete-bin-line col-auto"
            ></i>
          </span>
              <Accordion.Toggle style={{outline: "none", textDecoration: "none"}} as={Button} variant="link" eventKey="0">
                See answer!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>{answer}</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>      
    </>
  );
};

export default InterviewQuestionCard;
