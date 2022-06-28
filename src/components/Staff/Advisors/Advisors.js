import React, { useContext, useEffect } from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import style from "./Tasks.module.css"
import Button from "@mui/material/Button";

import LeadContext from "../../../Context/LeadContext";
import { useNavigate } from "react-router";
import AuthContext from "../../../Context/AuthContext";

const Advisors = () => {

  const { getAdvisors, advisors, getProfile, deleteAdvisor, advisorLink } = useContext(LeadContext);
  const { getNotifications } = useContext(AuthContext);

  const navigate = useNavigate();

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    getAdvisors();
    getNotifications()
  },[])

  return (
    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>Advisors</h2>
        </div>
        <div>
          <Button className="searchbtn w-75" 
          onClick={()=>{copyToClipboard("http://localhost:3000/signup/"+advisorLink)}}>Link</Button>
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={2}>
            ID
          </Col>
          <Col className="bgdark" sm={2}>
            Name
          </Col>
          <Col className="bgdark" sm={2}>
            Batch
          </Col>
          <Col className="bgdark" sm={3}>
            Groups
          </Col>

          <Col className="bgdark" sm={3}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
      {advisors && advisors.map((advisor, index) =>{
        return (
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
              #{index + 1}
            </Col>
            <Col className="textdark" sm={2}>
              {advisor.username}
            </Col>
            <Col className="textdark" sm={2}>
              {advisor.batch[0]} {advisor.batch[1] && "-"} {advisor.batch[1]}
            </Col>
            <Col className="textdark" sm={3}>
              {advisor.groups}
            </Col>

            <Col className="textdark d-flex" sm={3}>
              <Button variant="contained" className="mx-1" color="error" onClick={() => {deleteAdvisor(advisor.id)}}>Delete</Button>
              <Button className="coh mx-1" onClick={ async () => {await getProfile(advisor.id)
          navigate("/lead/advisor/profile")}}>Profile</Button>
            </Col>
          </Row>
        </Col>
      )})}
        
      </Col>
    </Row>
  );
};

export default Advisors;
