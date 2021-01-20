import React, { useEffect, useState } from "react";
import CustomContainer from "../components/Container";
import { useSelector, useDispatch } from "react-redux";
import { getApplications } from "../redux/actions/applicationActions";
import PieChart from "../components/PieChart";
import LineGraph from "../components/LineGraph";
import { Container, Row, Col, Button } from "react-bootstrap";
import StackedColumnChart from "../components/StackedColumnChart";
import moment from "moment";

const DataAnalysisPage = ({ history }) => {
  const user = useSelector((state) => state.auth.user);
  const applications = useSelector((state) => state.app.applications);
  const [graphState, setGraphState] = useState(null);
  const [pieGraphState, setPieGraphState] = useState(null);
  const [filtered, setFiltered] = useState({
    Applied: 0,
    Accepted: 0,
    Rejected: 0,
    "Wish List": 0,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (filtered) {
      setPieGraphState({
        options: {
          series: Object.values(filtered),
          chart: {
            type: "pie",
          },
          labels: Object.keys(filtered),
        },
      });
    }
  }, [filtered]);

  const getCount = (status) => {
    const temp = {};
    applications.forEach((app) => {
      const filtered = app.timeline.filter((item) => item.status === status);
      if (filtered.length > 0) {
        const d = new Date(filtered[0].time);
        const date = moment(d).format("DD/MM/yyyy");
        if (temp[date]) {
          temp[date] += 1;
        } else {
          temp[date] = 1;
        }
      }
    });
    return temp;
  };

  useEffect(() => {
    if (applications) {
      //timeline-> status -> week
      const applied = getCount("Applied");
      const accepted = getCount("Accepted");
      const rejected = getCount("Rejected");

      setGraphState({
        series: [
          {
            name: "applied",
            data: Object.values(applied),
          },
          {
            name: "accepted",
            data: Object.values(accepted),
          },
          {
            name: "rejected",
            data: Object.values(rejected),
          },
        ],
        options: {
          chart: {
            height: 350,
            width: "100%",
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            categories: Object.keys(applied),
          },
        },
      });
    }
  }, [applications]);

  useEffect(() => {
    if (user) dispatch(getApplications(user.email));
  }, [user, dispatch]);

  useEffect(() => {
    if (applications) {
      const x = { ...filtered };
      applications.forEach((item) => {
        x[item.status] += 1;
      });
      setFiltered(x);
    }
  }, [applications, dispatch]);

  return (
    <CustomContainer>
      <h3 className="text-center mt-2">
        <strong>Data Visualization</strong>
      </h3>
      <hr />
      <Container fluid>
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
          <Col xs={6}>
            <PieChart graphState={pieGraphState} />
          </Col>
          <Col xs={6}>
            <StackedColumnChart applications={applications} />
          </Col>
        </Row>
        <Row>
          <LineGraph graphState={graphState} />
        </Row>
      </Container>
    </CustomContainer>
  );
};

export default DataAnalysisPage;
