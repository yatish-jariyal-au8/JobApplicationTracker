import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getForumQuestions,
  filterQuestions,
} from "../redux/actions/questionActions";
import CustomContainer from "../components/Container";
import { Form, Row, Button, Spinner } from "react-bootstrap";
import ForumQuestion from "../components/ForumQuestion";

const ForumPage = ({ history }) => {
  const allQuestions = useSelector((state) => state.question.forumQuestions);
  const isLoading = useSelector((state) => state.question.isLoading)
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getForumQuestions());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery === "") {
      dispatch(getForumQuestions());
    } else {
      dispatch(filterQuestions(searchQuery));
    }
  }, [searchQuery]);

  return (
    <CustomContainer>
      <div style={{ minHeight: "calc(100vh - 141px)" }}>
        <h3 className="text-center mt-2">
          <strong>Interview Questions</strong>
        </h3>
        <hr />
        <Row className="justify-content-center">
          <Form.Control
            placeholder="Enter question"
            className="col-md-6"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <Button className="col-auto ml-3">Search</Button>
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
        <Row>
          {allQuestions &&
            allQuestions.map((item, i) => (
              <ForumQuestion
                questionId={item._id}
                createdAt={item.createdAt}
                question={item.question}
                addedBy={item.addedBy}
                answer={item.answer}
              />
            ))}
        </Row>
      </div>
    </CustomContainer>
  );
};

export default ForumPage;
