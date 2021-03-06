import React, { useContext, useEffect, useState } from "react";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AddTask from "../../Staff/AddTask/AddTask";
import style from "./Students.module.css";
import { useNavigate } from "react-router";
import LeadContext from "../../../Context/LeadContext";
import AuthContext from "../../../Context/AuthContext";


const Students = () => {

    const { setCurr_student, getNotifications } = useContext(AuthContext)
    const { getStudents, students, getProfile } = useContext(LeadContext);
  
    const navigate = useNavigate();
  
    const [batch, setBatch] = useState('');
    const [name, setName] = useState('');
  
    useEffect(() => {
      getStudents();
      getNotifications()
    }, []);
  
    return (
      <Row className="m-0 px-3 rounded-2 bglight py-3">
        <Col sm={12} className="d-flex justify-content-between mb-2">
          <div className="d-flex">
            <h2 className="me-4">Students</h2>
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
              Week
            </Col>
            <Col className="bgdark" sm={2}>
              Group
            </Col>
            {/* <Col className="bgdark" sm={4}>
              Actions
            </Col> */}
          </Row>
        </Col>
  
        <Col className="m-0 row ">
          {students
            ? students.map((student) =>{
              if (((name !== '' && batch !== '' && student.name.toLowerCase().includes(name.toLowerCase()) && student.batch.toLowerCase().includes(batch.toLowerCase())) || ((name !== '' && batch === '' && student.name.toLowerCase().includes(name.toLowerCase())) || (name === '' && batch !== '' &&  student.batch.toLowerCase().includes(batch.toLowerCase()))) || (name === '' && batch === '')) && student.week >= 21) {
              return (
                <Col sm={12} className="py-3 mb-2 cp mt-1 rounded-3 bg"
                >
                  <Row className="m-0">
                    <Col className="textdark" sm={1}>
                      {student.batch}
                    </Col>
                    <Col className="textdark" sm={2}>
                      {student.name}
                    </Col>
                    <Col className="textdark" sm={2}>
                      {student.domain}
                    </Col>
                    <Col className="textdark" sm={1}>
                      {student.week}
                    </Col>
                    <Col className="textdark" sm={2}>
                      {student.group ? student.group : "Not Assigned"}
                    </Col>
                    {/* <Col className="navTo textdark" sm={4}>
                    </Col> */}
                  </Row>
                </Col>
              )}})
            :  [1,1,1,1,1,1,1,1].map(()=>{
              return (
            <Col
            sm={12}
            className={`py-2 mb-2 cp bg rounded-3 ${style.tableBody}`}
          >
            <Row className="navTo m-0">
              <Col className={`navTo ${style.tableBodyText}`} sm={1}>
              <div className="skeleton skeleton-id"></div>
  
              </Col>
              <Col className={`navTo ${style.tableBodyText}`} sm={2}>
              <div className="skeleton skeleton-id"></div>
  
              </Col>
              <Col className={`navTo ${style.tableBodyText}`} sm={2}>
              <div className="skeleton skeleton-id"></div>
  
              </Col>
              <Col className={`navTo ${style.tableBodyText}`} sm={1}>
              <div className="skeleton skeleton-id"></div>
  
              </Col>
  
              <Col className={`navTo ${style.tableBodyText}`} sm={2}>
              <div className="skeleton skeleton-id"></div>
  
              </Col>
              <Col className={`navTo ${style.tableBodyText} d-flex`} sm={3}>
              <div className="skeleton skeleton-id mx-2"></div>
  
              <div className="skeleton skeleton-id"></div>
  
              </Col>
            </Row>
          </Col>
           )
          })}
        </Col>
      </Row>
    );
  };
  
  export default Students;