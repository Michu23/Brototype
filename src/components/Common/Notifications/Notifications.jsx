import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthContext from "../../../Context/AuthContext";
import Button from "@mui/material/Button";
import Add from "../../Staff/AddTask/AddTask";

const Notifications = () => {
  const { notifications, user_is, deleteNotifications, getNotifications } = useContext(AuthContext);
  var bgColor;
  useEffect(() => {
    getNotifications()
  },[])
  return (
    <Container fluid className="p-4 textdark">
      <div className="d-flex justify-content-between">
        <h2>My Notifications</h2>

        {user_is === "lead" && <Add title="Add" value="addnotifications"></Add>}
      </div>

      {notifications &&
        notifications.map((notification, index) => {
          return (
            <Row className="mx-2 mt-3 rounded-3 slides">
              <Col
                xs={3}
                className="my-auto d-flex justify-content-center text-muted"
              >
                {notification.created}
              </Col>
              <Col xs={1}>
                <div
                  className={`vertical ${
                    notification.type === "Placement"
                      ? `bggreen`
                      : notification.type === "Message"
                      ? `bgyellow`
                      : notification.type === "Termination"
                      ? `bgred`
                      : notification.type === "AdvisorChange"
                      ? `bgblue`
                      : notification.type === "BatchShift"
                      ? `bginfo`
                      : `bginfo`
                  }`}
                ></div>
              </Col>
              <Col xs={6} className="my-auto">
                <p className="notitype">{notification.type}</p>
                {notification.content}
              </Col>
              <Col xs={2} className="my-auto d-flex justify-content-end">
                {user_is === "lead" && (
                  <Button
                    variant="contained"
                    color="error"
                    className="dltbtn"
                    onClick={() => {
                      deleteNotifications(notification.id);
                    }}
                  >
                    Delete
                  </Button>
                )}
              </Col>
              {user_is === "lead" && (
              <span class="tooltiptext">{notification.creator}</span>
        )}

            </Row>
          );
        })}

      {/* <Row className="mx-2 mt-3 rounded-3 slides">
        <Col
          xs={3}
          className="my-auto d-flex justify-content-center text-muted"
        >
          18/06/17
        </Col>
        <Col xs={1}>
          <div class="vertical"></div>
        </Col>
        <Col xs={8} className="my-auto">
          Rishi has been placed at Banglore with 7.2 LPA
        </Col>
      </Row>
      <Row className="mx-2 mt-3 rounded-3 slides">
        <Col
          xs={3}
          className="my-auto d-flex justify-content-center text-muted"
        >
          18/06/17
        </Col>
        <Col xs={1}>
          <div class="vertical"></div>
        </Col>
        <Col xs={8} className="my-auto">
          Rishi has been placed at Banglore with 7.2 LPA
        </Col>
      </Row>
      <Row className="mx-2 mt-3 rounded-3 slides">
        <Col
          xs={3}
          className="my-auto d-flex justify-content-center text-muted"
        >
          18/06/17
        </Col>
        <Col xs={1}>
          <div class="vertical"></div>
        </Col>
        <Col xs={8} className="my-auto">
          Rishi has been placed at Banglore with 7.2 LPA
        </Col>
      </Row>
      <Row className="mx-2 mt-3 rounded-3 slides">
        <Col
          xs={3}
          className="my-auto d-flex justify-content-center text-muted"
        >
          18/06/17
        </Col>
        <Col xs={1}>
          <div class="vertical"></div>
        </Col>
        <Col xs={8} className="my-auto">
          Rishi has been placed at Banglore with 7.2 LPA
        </Col>
      </Row>
      <Row className="mx-2 mt-3 rounded-3 slides">
        <Col
          xs={3}
          className="my-auto d-flex justify-content-center text-muted"
        >
          18/06/17
        </Col>
        <Col xs={1}>
          <div class="vertical"></div>
        </Col>
        <Col xs={8} className="my-auto notifycontent">
          Rishi has been placed at Banglore with 7.2 LPA Rishi has been placed
          at Banglore with 7.2 LPA Rishi has been placed at Banglore with 7.2
          LPA Rishi has been placed at Banglore with 7.2 LPA
          Rishi has been placed at Banglore with 7.2 LPA Rishi has been placed
          at Banglore with 7.2 LPA Rishi has been placed at Banglore with 7.2
          LPA Rishi has been placed at Banglore with 7.2 LPA
        </Col>
      </Row>
      <Row className="mx-2 mt-3 rounded-3 slides">
        <Col
          xs={3}
          className="my-auto d-flex justify-content-center text-muted"
        >
          18/06/17
        </Col>
        <Col xs={1}>
          <div class="vertical"></div>
        </Col>
        <Col xs={8} className="my-auto">
          Rishi has been placed at Banglore with 7.2 LPA
        </Col>
      </Row> */}
    </Container>
  );
};

export default Notifications;
