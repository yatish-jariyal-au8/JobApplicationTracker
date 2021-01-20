import React, { useState } from "react";
import { Row, Form, Button, Modal } from "react-bootstrap";
import {
  addInterviewQuestion
} from "../redux/actions/questionActions";
import { useDispatch, useSelector } from "react-redux";
import { setToastData } from "../redux/actions/toastActions";
import { editQuestion } from "../redux/actions/applicationActions";

const InterviewQuestion = ({ data = null, questionId, isEditing = false, appId, show, onClose }) => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch();
  const [question, setQuestion] = useState(data ? data.question : "")
  const [answer, setAnswer] = useState(data ? data.answer : "")

  const saveQuestion = () => {
    if(question.length > 0 && answer.length > 0) {
      if(isEditing) {
        dispatch(editQuestion(appId, questionId, question, answer));
      }
      else {
        dispatch(addInterviewQuestion(user.email, appId, question, answer))
      }
      onClose()
      setQuestion("")
      setAnswer("")
    }
    else {
      dispatch(setToastData('error', 'Please enter question and answer'))
    }
  }

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        Add Interview Question
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="justify-content-center">
          <Form.Label>Question</Form.Label>
            <Form.Control
              id="question"
              name="question"
              type="text"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              placeholder="Enter Question"
            />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Answer</Form.Label>
            <Form.Control
              id="answer"
              name="answer"
              type="text"
              as="textarea"
              rows={4}
              value={answer}
              onChange={(e) =>
                setAnswer(e.target.value)
              }
              placeholder="Enter Answer"
            />
          
        </Form.Group>
        <Row>
          <Button onClick={saveQuestion}>Save</Button>
        </Row>
      </Modal.Body>
        
    </Modal>
  );
};

export default InterviewQuestion;
