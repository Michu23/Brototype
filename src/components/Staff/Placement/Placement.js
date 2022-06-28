import React, { useContext, useEffect, useState } from "react";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import style from "./Placement.module.css";
import LeadContext from "../../../Context/LeadContext";
import AddTask from "../AddTask/AddTask";
import Profile from './PlacementProfile'
import PlacementProfile from "./PlacementProfile";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";

const Placement = () => {
  const { getPlacements, placements } = useContext(LeadContext);
  const { getNotifications, user, setCurr_student } = useContext(AuthContext);
  const [batch, setBatch] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getPlacements();
    getNotifications()
  }, []);

  return (
    <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h2 className="me-4">Placements</h2>
          {/* <Button variant="contained" className="bgdark textlight w-100 h-50">
            Add
          </Button> */}
          <AddTask title="Add" value="placement" />
        </div>

        <div className="d-flex justify-content-end textlight">
          <Col
            xs={4}
            className={`py-1 my-1 textwhite mx-2 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Name</label>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className={`w-100 ${style.input}`} />
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
          <Col className="bgdark" sm={1}>
            Batch
          </Col>
          <Col className="bgdark" sm={2}>
            Name
          </Col>
          <Col className="bgdark" sm={2}>
            Domain
          </Col>
          <Col className="bgdark" sm={1}>
            LPA
          </Col>
          <Col className="bgdark" sm={2}>
            Location
          </Col>

          <Col className="bgdark" sm={4}>
            Designation
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        {placements && placements.map((placement) => {
          if ((name !== '' && batch !== '' && placement.student.user.username.includes(name) && placement.student.batch.name.includes(batch)) || ((name !== '' && batch === '' && placement.student.user.username.includes(name)) || (name === '' && batch !== '' &&  placement.student.batch.name.includes(batch))) || (name === '' && batch === '')) {
          return (
        <Link to={`/${user.position === "Lead" ? "lead" : "placement"}/placements/info`} style={{ textDecoration: 'none' }}
        onClick={()=>{setCurr_student(placement.student.id)}}>
          <Col sm={12} className="py-2 mb-2 cp rounded-3 bg" key={placement.id}>
            <Row className="m-0">
              <Col className="textdark" sm={1}>
                #{placement.student.batch.name}
              </Col>
              <Col className="textdark" sm={2}>
                {placement.student.user.username}
              </Col>
              <Col className="textdark" sm={2}>
                {placement.student.domain.name}
              </Col>
              <Col className="textdark" sm={1}>
                {placement.LPA}
              </Col>
              <Col className="textdark" sm={2}>
                {placement.location}
              </Col>
              <Col className="textdark d-flex" sm={4}>
              {placement.position}
              </Col>
            </Row>
          </Col>
        </Link>
          )}})}
      </Col>
    </Row>
  );
};

export default Placement;
