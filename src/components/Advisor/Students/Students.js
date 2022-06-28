import React, { useContext, useEffect, useState } from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import style from "./Tasks.module.css"
import style from "./Students.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AdvisorContext from "../../../Context/AdvisorContext";
import AddTask from "../AddTask/AddTask";
import AuthContext from "../../../Context/AuthContext";
import { useNavigate } from "react-router";

const Students = () => {

  const { setCurr_student, getNotifications } = useContext(AuthContext)
  const { getMyStudents, myStudents, sendTerminateRequest } = useContext(AdvisorContext);

  const navigate = useNavigate();

  const [batch, setBatch] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    getMyStudents();
    getNotifications()
  },[])

  return (
    <Row className={`m-0 px-3 rounded-2 bg py-3 ${style.tasks}`}>
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>My Students</h2>
        </div>
        <div className="d-flex">
          <TextField
            id="outlined-basic"
            label="Advisor"
            value={name} 
            onChange={(e)=>{setName(e.target.value)}}
            variant="outlined"
            className="mx-2 h-100"
          />
          <TextField
            id="outlined-basic"
            label="Batch"
            value={batch} 
            onChange={(e)=>{setBatch(e.target.value)}} 
            variant="outlined"
          />
          <Button variant="contained" color="primary" className="mx-2 h-100">
            <ManageSearchIcon />
          </Button>
        </div>
      </Col>
      <Col sm={12} className={`py-2 my-2  px-4 rounded-3 ${style.tableHead}`}>
        <Row className="m-0" xs={0}>
          <Col className={`${style.tableHeadText}`} sm={1}>
            Id
          </Col>
          <Col className={`${style.tableHeadText}`} sm={2}>
            Name
          </Col>
          <Col className={`${style.tableHeadText}`} sm={2}>
            Week
          </Col>
          <Col className={`${style.tableHeadText}`} sm={2}>
            Pending
          </Col>

          <Col className={`${style.tableHeadText}`} sm={2}>
            Advisor
          </Col>
          <Col className={`${style.tableHeadText}`} sm={3}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row">
        <>
          {myStudents && myStudents.map((student, index) => {
            if ((name !== '' && batch !== '' && student.advisor.includes(name) && student.batch.includes(batch)) || ((name !== '' && batch === '' && student.advisor.includes(name)) || (name === '' && batch !== '' &&  student.batch.includes(batch))) || (name === '' && batch === '')) {
            return(
            <Col
            sm={12}
            className={`py-2 mb-2 cp bglight rounded-3 ${style.tableBody}`}
            key={index}
            onClick={(e)=>{
              e.preventDefault()
              if ("navTo" === e.target.className.slice(0,5)) {
                setCurr_student(student.id)
                navigate('/advisor/group/taskslist')
              }
            }}
          >
            <Row className="navTo m-0">
              <Col className={`navTo ${style.tableBodyText}`} sm={1}>
                #{index + 1}
              </Col>
              <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                {student.name}
              </Col>
              <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                {student.week}
              </Col>
              <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                {student.pending}
              </Col>

              <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                {student.advisor}
              </Col>
              <Col className={`navTo ${style.tableBodyText} d-flex`} sm={3}>
                <AddTask title="SHIFT" value="shift" form={student.id}/>
                <Button variant="contained" color="error" onClick={()=>{sendTerminateRequest(student.id)}}>
                  Terminate
                </Button>
              </Col>
            </Row>
          </Col>
          )}})}
        </>
      </Col>
    </Row>
  );
};

export default Students;
