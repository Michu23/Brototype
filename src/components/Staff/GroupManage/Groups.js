import React, { useContext, useState } from "react";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AddTask from "../../Staff/AddTask/AddTask";
import style from "./Groups.module.css";
import LeadContext from "../../../Context/LeadContext";
import AuthContext from "../../../Context/AuthContext";

const Groups = () => {

  const { deleteGroup, groupDetails, getGroupLess, groupLessers, addInGroup, rmFromGroup } = useContext(LeadContext);
  const { getNotifications } = useContext(AuthContext);

  const [add, setAdd] = useState("dont");

  const handleShow = () => {
    getGroupLess();
    setAdd("show");
    getNotifications()
  };

  return (
    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h2 className="me-4">#20 A</h2>
          <AddTask title="Edit" value="group" />
          <Button color="error" variant="contained" size="small" className="h-50 ms-2" onClick={()=>{deleteGroup(groupDetails.id)}} >Delete</Button>
        </div>

        <div className="d-flex justify-content-end textlight">
          <Col
            xs={4}
            className={`py-1 my-1 textwhite mx-2 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Collage</label>
            <input type="text" className={`w-100 ${style.input}`} />
          </Col>
          <Col
            xs={4}
            className={`py-1 textwhite my-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Collage</label>
            <input type="text" className={`w-100 ${style.input}`} />
          </Col>

          <Button className=" mx-1 searchbtn">
            <ManageSearchRoundedIcon  className="searchbtn" />
          </Button>
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={2}>
            Batch
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

          <Col className="bgdark" sm={2}></Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        { groupDetails ? groupDetails.student.map((student, index) =>{
          return (
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
              #{index + 1}
            </Col>

            <Col className="textdark" sm={2}>
              {student.user}
            </Col>
            <Col className="textdark" sm={2}>
              {groupDetails.domain}
            </Col>
            <Col className="textdark" sm={2}>
              {student.week}
            </Col>
            <Col className="textdark d-flex justify-content-end" sm={4}>
              <Button className="completed w-50" onClick={()=>{rmFromGroup(student.id)}}>Remove</Button>
            </Col>
          </Row>
        </Col>
            )}): null}
      </Col>
      <Row>
        <Col className="m-0 my-3 row d-flex justify-content-end">
          {add === "dont" ? (
            <Button className="completed w-25" onClick={() => {handleShow()}}>
              Add more
            </Button>
          ) : (
            <Button className="completed w-25" onClick={() => setAdd("dont")}>
              Back
            </Button>
          )}
        </Col>
      </Row>

      {add === "show" && (
        <Col className="m-0 row ">
          { groupLessers && groupLessers.map((student, index) =>{
            return (
            <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
            <Row className="m-0">
              <Col className="textdark" sm={2}>
                #{index + 1}
              </Col>

              <Col className="textdark" sm={2}>
                {student.user}
              </Col>
              <Col className="textdark" sm={2}>
                {groupDetails.domain}
              </Col>
              <Col className="textdark" sm={2}>
                {student.week}
              </Col>

              <Col className="textdark d-flex justify-content-end" sm={4}>
                <Button className="completed w-50" onClick={()=>{addInGroup(student.id)}}>Add</Button>
              </Col>
            </Row>
          </Col>
          )})}
          {/* <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
            <Row className="m-0">
              <Col className="textdark" sm={2}>
                #20
              </Col>

              <Col className="textdark" sm={2}>
                Wafi
              </Col>
              <Col className="textdark" sm={2}>
                Python
              </Col>
              <Col className="textdark" sm={2}>
                18
              </Col>

              <Col className="textdark d-flex justify-content-end" sm={4}>
                <Button className="completed w-50">Add</Button>
              </Col>
            </Row>
          </Col> */}
          {/* <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
            <Row className="m-0">
              <Col className="textdark" sm={2}>
                #20
              </Col>

              <Col className="textdark" sm={2}>
                Wafi
              </Col>
              <Col className="textdark" sm={2}>
                Python
              </Col>
              <Col className="textdark" sm={2}>
                18
              </Col>

              <Col className="textdark d-flex justify-content-end" sm={4}>
                <Button className="completed w-50">Add</Button>
              </Col>
            </Row>
          </Col> */}
        </Col>
      )}
    </Row>
  );
};

export default Groups;
