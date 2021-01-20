import React from "react";
import Timeline from "@material-ui/lab/Timeline";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

export default function OppositeContentTimeline({ timeline }) {
  const formatDate = (time) => {
    const formatted = moment(time).format("DD MMM, YYYY");
    return formatted;
  };

  const getColor = (status) => {
    switch (status) {
      case "Applied":
        return "#f8961e";
      case "Accepted":
        return "#90be6d";
      case "Rejected":
        return "#f94144";
      case "Wish List":
        return "#577590";
      default:
        return "white";
    }
  };

  return (
    <React.Fragment>
      <Timeline align="alternate">
        {timeline.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent>
              <Typography color="white">{formatDate(item.time)}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot style={{ background: getColor(item.status) }} />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography style={{ color: getColor(item.status), fontWeight: "bolder" }}>
                {item.status}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </React.Fragment>
  );
}
