import React, {useEffect, useContext, useState} from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

// import style from "./Tasks.module.css"
import style from "./Group.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AuthContext from "../../../Context/AuthContext";
import AdvisorContext from "../../../Context/AdvisorContext";
import AddTask from "../AddTask/AddTask";

const Work = () => {

  const { setCurr_student, curr_group, getNotifications } = useContext(AuthContext);
  const { myGroupDetails, getMyGroupDetails } = useContext(AdvisorContext);
  
  const navigate = useNavigate();

  const [name, setName] = useState('');

  useEffect(() => {
    getMyGroupDetails(curr_group)
    getNotifications()
  },[])

  return (
    <Row className={`m-0 px-3 rounded-2 bg py-3 ${style.tasks}`}>
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>My Students</h2>
        </div>
        <div>
        <TextField
            id="outlined-basic"
            label="Student"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
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
          <Col className={`${style.tableHeadText}`} sm={3}>
           Name
          </Col>
          <Col className={`${style.tableHeadText}`} sm={2}>
             Week
          </Col>
          <Col className={`${style.tableHeadText}`} sm={2}>
            Pending
          </Col>
          
          <Col className={`${style.tableHeadText}`} sm={2}>
            Count
          </Col>
          <Col className={`${style.tableHeadText}`} sm={2}>
            Review
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row">
        <>
            {myGroupDetails && myGroupDetails.map((student, index) => {
              if ((name !== '' && student.name.includes(name)) || (name === '')) {
              return (
              <Col
              sm={12}
              className={`py-2 mb-2 cp bglight rounded-3 ${style.tableBody}`}
              onClick={(e) => {
                e.preventDefault()
              if ("navTo" === e.target.className.slice(0,5)) {
                setCurr_student(student.id)
                navigate('/advisor/group/taskslist')
              }}} >
              <Row className="navTo m-0">
                <Col className={`navTo ${style.tableBodyText}`} sm={1}>
                  #{index + 1}
                </Col>
                <Col className={`navTo ${style.tableBodyText}`} sm={3}>
                  {student.name}
                </Col>
                <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                  {student.week}
                </Col>
                <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                  {student.pending}
                </Col>
                
                <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                  {student.count}
                </Col>
                <Col className={`navTo ${style.tableBodyText}`} sm={2}>
                <AddTask title="401" value="shift" form={student.id}/>
                </Col>
              </Row>
            </Col>
            )}})}
        </>
      </Col>
    </Row>
  )
}

export default Work
