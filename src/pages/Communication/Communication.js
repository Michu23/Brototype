import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/Common/Header/Header";
import Header2 from "../../components/Common/Header2/Header2";
import NavBox from "../../components/Common/NavBox/NavBox";
import Notification from "../../components/Common/Notification/Notification";
import { PrivateRouteCommunication } from "../../Utils/PrivateRoute";
const Communication = ({child}) => {
  return (
    <PrivateRouteCommunication>
    <Container fluid className="mx-0 p-0">
      <Header />
      <Header2 />
      <Row className="mx-5 mt-4  d-none d-lg-flex ">
        <Col md={3}>
          <Row className="bg rounded-3 bs">
            <NavBox />
          </Row>
          <Row className="mt-4 bg rounded-3 mb-5 bs">
            <Notification />
          </Row>
        </Col>
        <Col md={8} className="bglight rounded-3 p-0 mx-5 me-0 pb-5 mb-3 bs">
            {child} 
        </Col>
      </Row>
      <Row className="d-md-flex d-lg-none ">
        {child}
      </Row>
    </Container>
    </PrivateRouteCommunication>
  );
};

export default Communication;