import React, { useContext, useEffect } from "react";
import style from "./Placement.module.css";
import { Row, Col } from "react-bootstrap";
import Button from "@mui/material/Button";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import AuthContext from "../../../Context/AuthContext";

const Students = () => {
  const { getBranchStudents, branchStudents, getNotifications } = useContext(AuthContext);
  useEffect(() => {
    getBranchStudents();
    getNotifications()
  }, []);

  return (
    <Row className="m-0 p-3 rounded-2 pb-0">
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
            <input type="text" className={`w-100 ${style.input}`} />
          </Col>

          <Col
            xs={4}
            className={`py-1 textwhite my-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Batch</label>
            <input type="text" className={`w-100 ${style.input}`} />
          </Col>

          <Button className=" mx-1 searchbtn">
            <ManageSearchRoundedIcon className="searchbtn" />
          </Button>
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={1}>
            #
          </Col>
          <Col className="bgdark" sm={2}>
            Name
          </Col>
          <Col className="bgdark" sm={2}>
            Batch
          </Col>
          <Col className="bgdark" sm={1}>
            Week
          </Col>
          <Col className="bgdark" sm={2}></Col>

          <Col className="bgdark" sm={4}>
            
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        {branchStudents &&
          branchStudents.map((student, index) => {
            console.log(student);
            return (
              <Col sm={12} className="py-2 mb-2 cp rounded-3 bg" key={index}>
                <Row className="m-0">
                  <Col className="textdark" sm={1}>
                    #{index + 1}
                  </Col>
                  <Col className="textdark" sm={2}>
                    {student.user.username}
                  </Col>
                  <Col className="textdark" sm={2}>
                    {student.batch.name}
                  </Col>
                  <Col className="textdark" sm={1}>
                    {student.week}
                  </Col>
                  <Col className="textdark" sm={2}></Col>
                  <Col className="textdark d-flex" sm={4}></Col>
                </Row>
              </Col>
            );
          })}
      </Col>
    </Row>
  );
};

export default Students;
