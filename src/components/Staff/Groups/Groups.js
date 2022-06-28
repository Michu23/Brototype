import React, { useContext, useEffect, useState } from "react";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AddTask from "../../Staff/AddTask/AddTask";
import style from "./Groups.module.css";
import LeadContext from "../../../Context/LeadContext";
import AuthContext from "../../../Context/AuthContext";

const Groups = () => {

  const { groups, getGroups, getGroupDetails } = useContext(LeadContext);
  const { getNotifications } = useContext(AuthContext);
  const [advisor, setAdvisor] = useState('');
  const [batch, setBatch] = useState('');

  useEffect(() => {
    getGroups();
    getNotifications()
  },[])

  return (

    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h2 className="me-4">Groups</h2>
          <AddTask title="Add" value="addgroup" />
        </div>

        <div className="d-flex justify-content-end textlight">
          <Col
            xs={4}
            className={`py-1 my-1 textwhite mx-2 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Advisor</label>
            <input type="text" value={advisor} onChange={(e)=>{setAdvisor(e.target.value)}} className={`w-100 ${style.input}`} />
          </Col>
          <Col
            xs={4}
            className={`py-1 textwhite my-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Batch</label>
            <input type="text" value={batch} onChange={(e)=>{setBatch(e.target.value)}} className={`w-100 ${style.input}`} />
          </Col>

          <Button className=" mx-1 searchbtn">
            <ManageSearchRoundedIcon className="searchbtn" />
          </Button>
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={2}>
            Batch
          </Col>
          <Col className="bgdark" sm={2}>
            Advisor
          </Col>
          <Col className="bgdark" sm={2}>
            Name
          </Col>
          <Col className="bgdark" sm={2}>
            Domain
          </Col>
          <Col className="bgdark" sm={2}>
            Students
          </Col>

          <Col className="bgdark" sm={2}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">

        {groups && groups.map((group, index) => {
          if ((advisor !== '' && batch !== '' && group.advisor.includes(advisor) && group.batch.includes(batch)) || ((advisor !== '' && batch === '' && group.advisor.includes(advisor)) || (advisor === '' && batch !== '' &&  group.batch.includes(batch))) || (advisor === '' && batch === '')) {
          return (
              
          <Col Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
            <Row className="m-0">
              <Col className="textdark" sm={2}>
                #{index + 1}
              </Col>
              <Col className="textdark" sm={2}>
                {group.advisor}
              </Col>
              <Col className="textdark" sm={2}>
                {group.name}
              </Col>
              <Col className="textdark" sm={2}>
                {group.domain}
              </Col>
              <Col className="textdark" sm={2}>
                {group.student}
              </Col>
              <Col className="textdark d-flex" sm={2}>
                  <Button variant="contained" size="medium" className="h-100 bginfo" onClick={()=>{getGroupDetails(group.id)}}>Manage</Button>
              </Col>
            </Row>
          </Col>
            )
          }
        })}
      </Col>
    </Row>
  );
};

export default Groups;
