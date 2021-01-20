import React, { useEffect, useState, useRef } from "react";
import { Card, CardDeck, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getApplications,
  deleteApplication,
} from "../redux/actions/applicationActions";
import { Link } from "react-router-dom";

const Cards = (props) => {
  const user = useSelector((state) => state.auth.user);
  const applications = useSelector((state) => state.app.applications);
  const isLoading = useSelector((state) => state.app.isLoading)
  const dispatch = useDispatch();
  const [cards, setCards] = useState([]);

  const scrollRef = useRef(null)

  const appColor = (status) => {
    switch (status) {
      case "Wish List":
        return "#4cc9f0";
      case "Applied":
        return "#ffd166";
      case "Accepted":
        return "#06d6a0";
      case "Rejected":
        return "#FF8F66";
      default:
        return "black";
    }
  };

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= (186*4+220)
  };

  const scrollRight = () => {
    scrollRef.current.scrollLeft += (186*4+220)
  }
  useEffect(() => {
    if (applications) {
      setCards(applications.filter((item) => item.status === props.status));
    }
  }, [applications, props]);

  useEffect(() => {
    dispatch(getApplications(user.email));
  }, [user, dispatch]);

  if (!cards || (cards && cards.length === 0)) {
    return (
      <label style={{ fontStyle: "italic", color: "#666" }}>
        No Applications
      </label>
    );
  }
  return isLoading ? <Spinner animation="border" size="sm" /> : (
    <div className="d-flex align-items-center" style={{maxWidth: "calc(100vw - 183px"}}>
      {cards && cards.length > 3 && <Button style={{position: "absolute", left: -60, display: "flex"}} variant="light" onClick={scrollLeft}><i class="ri-arrow-left-s-line ri-lg"></i></Button>}
      <CardDeck ref={scrollRef} className="py-3 card-deck-scroll">
        {cards &&
          cards.map((card) => (
            <Link
              key={card._id}
              style={{ textDecoration: "none", color: "black" }}
              to={`/application/${card._id}`}
            >
              <Card
                className="job-card"
                style={{
                  color: "#333",
                  width: "18rem",
                  backgroundColor: appColor(card.status),
                  padding: 10,
                }}
              >
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    dispatch(deleteApplication(card._id, user.email));
                  }}
                  className="delete-icon"
                >
                  <i className="ri-delete-bin-fill ri-lg col-auto"></i>
                </span>
                <Card.Body>
                  <Card.Title>{card.company}</Card.Title>
                  <Card.Text className="mb-2">
                    Status: <strong>{card.status}</strong>
                  </Card.Text>
                  <Card.Text>Location: {card.location}</Card.Text>
                  <Card.Text>Salary: {card.salary}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
      </CardDeck>
      {cards && cards.length > 3 && <Button style={{position: "absolute", right: -60, display: "flex"}} variant="light" onClick={scrollRight}><i class="ri-arrow-right-s-line ri-lg"></i></Button>}
    </div>
  );
};

export default Cards;
