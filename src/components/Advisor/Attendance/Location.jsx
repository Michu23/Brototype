import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import style from "./Placement.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const Location = () => {
  const { getLocations, allLocations, setLocationId, getNotifications } = useContext(AuthContext);
  useEffect(() => {
    getLocations();
    getNotifications()
  }, []);

  return (
    <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h2 className="me-4">Location</h2>
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark d-flex justify-content-center" sm={12}>
            All Locations
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        <Link to="/advisor/branches" style={{ textDecoration: "none" }}>
          <Col sm={12} className="py-2 mb-2 cp  rounded-3 ">
            <Row className="m-0 d-flex justify-content-center">
              {allLocations &&
                allLocations.map((place) => {
                  return (
                    <Link to="/advisor/branches">
                      <Col
                        className="textdark bg m-1 p-2 rounded-3 d-flex justify-content-center"
                        sm={3}
                        onClick={() => {
                          setLocationId(place.id);
                        }}
                      >
                        {place.place}
                      </Col>
                    </Link>
                  );
                })}
            </Row>
          </Col>
        </Link>
      </Col>
    </Row>
  );
};

export default Location;
