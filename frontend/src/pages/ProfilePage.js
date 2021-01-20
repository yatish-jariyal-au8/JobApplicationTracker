import React, { useState, useEffect } from "react";
import bsCustomFileInput from "bs-custom-file-input";
import { Row, Form, Button, Col, Image } from "react-bootstrap";
import CustomContainer from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteResume,
  getResume,
  updateUser,
  uploadResume,
  downloadResume,
  uploadProfilePhoto,
  downloadProfilePhoto,
} from "../redux/actions/profileActions";

const ProfilePage = ({ history }) => {
  const user = useSelector((state) => state.auth.user);
  const resumes = useSelector((state) => state.profile.resumes);
  const profilePhotoURL = useSelector((state) => state.profile.profilePhotoURL);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState(user ? user.name : "");
  const [userEmail, setUserEmail] = useState(user ? user.email : "");
  const [githubLink, setGithubLink] = useState(user ? user.link : "");

  useEffect(() => {
    if (user) {
      setUserName(user.name);
      setUserEmail(user.email);
      setGithubLink(user.link || "");
    }
  }, [user]);

  console.log("photo", profilePhotoURL);

  useEffect(() => {
    if (user && user.id) {
      dispatch(getResume(user.id));
      // dispatch(downloadProfilePhoto(user.id));
    }
  }, [user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateUser(
        { name: userName, email: userEmail, link: githubLink },
        user.id
      )
    );
  };

  const uploadFile = () => {
    const fileUpload = document.getElementById("fileinput");
    fileUpload.click();
  };

  const handleChange = (e) => {
    const formData = new FormData();
    formData.append("resume", e.target.files[0]);
    dispatch(uploadResume(formData, user.id));
  };

  const uploadPhoto = () => {
    const fileUpload = document.getElementById("fileinput-photo");
    fileUpload.click();
  };

  const handleProfilePhotoChange = (e) => {
    bsCustomFileInput.init();
    const formData = new FormData();
    formData.append("profilePhoto", e.target.files[0]);

    dispatch(uploadProfilePhoto(formData, user.id));
  };

  const handleDeleteResume = (file) => {
    dispatch(deleteResume(user.id, file));
  };

  return (
    <CustomContainer>
      <h3 className="text-center mt-2">
        <strong>Profile</strong>
      </h3>
      <hr />
      <Row>
        <Button
          className="btn btn-primary mr-auto ml-3 mt-4"
          onClick={() => history.goBack()}
          variant="light"
        >
          Back
        </Button>
      </Row>
      <Row className="justify-content-center">
        <div
          className="col-auto"
          style={{
            height: "200px",
            width: "200px",
            backgroundColor: "#6c757d",
            borderRadius: "50%",
          }}
        >
          {profilePhotoURL ? (
            <Image fluid src={profilePhotoURL} alt="" />
          ) : (
            <>
              <div
                className="col-auto"
                style={{
                  height: "70px",
                  width: "70px",
                  backgroundColor: "#adb5bd",
                  borderRadius: "50%",
                  marginLeft: "50px",
                  marginTop: "25px",
                }}
              ></div>
              <div
                className="col-auto"
                style={{
                  height: "70px",
                  width: "90px",
                  backgroundColor: "#adb5bd",
                  borderRadius: "50% 50% 0% 0%",
                  marginLeft: "40px",
                }}
              ></div>
            </>
          )}
        </div>
      </Row>
      {/*<Row className="justify-content-center pt-3">
        <Button onClick={uploadPhoto}>Edit Photo</Button>
        <input
          type="file"
          id="fileinput-photo"
          onChange={handleProfilePhotoChange}
          hidden={true}
        />
      </Row>
      */}
      <Row className="justify-content-center">
        <Col lg={5} md={8} sm={10}>
          <Row className="justify-content-center py-4">
            <strong className="col-2 align-self-center">Name</strong>
            <Form.Control
              className="col-8"
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              value={userName}
              placeholder="Enter your name"
            />
          </Row>
          <Row className="justify-content-center ">
            <strong className="col-2 align-self-center">Email</strong>
            <Form.Control
              className="col-8"
              onChange={(e) => setUserEmail(e.target.value)}
              type="email"
              value={userEmail}
              placeholder="Enter email"
            />
          </Row>
          <Row className="justify-content-center py-4">
            <strong className="col-2 pt-2">Resume</strong>
            <Col className="pl-0" md={8}>
              <Button onClick={uploadFile}>Add Resume</Button>
              <input
                type="file"
                hidden={true}
                id="fileinput"
                onChange={handleChange}
              />
              {resumes &&
                resumes.map((resume, i) => (
                  <Row key={i} className="py-2">
                    <i className="ri-file-fill col-auto"></i>
                    <label
                      onClick={() => dispatch(downloadResume(user.id, resume))}
                      className="col pl-0"
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        maxWidth: "100%",
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      {resume}
                    </label>
                    <i
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteResume(resume)}
                      className="ri-delete-bin-line col-auto"
                    ></i>
                  </Row>
                ))}
            </Col>
          </Row>
          <Row className="justify-content-center ">
            <strong className="col-2 align-self-center">Link</strong>
            <Form.Control
              className="col-8"
              onChange={(e) => setGithubLink(e.target.value)}
              type="text"
              value={githubLink}
              placeholder="Enter Github Link"
            />
          </Row>
          <Row className="justify-content-center py-4">
            <Button className="col-auto" onClick={handleSubmit}>
              Save
            </Button>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center pt-5"></Row>
    </CustomContainer>
  );
};

export default ProfilePage;
