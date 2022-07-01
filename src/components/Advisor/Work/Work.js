import React, { useEffect, useContext, useState } from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// import style from "./Tasks.module.css"
import style from "./Work.module.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import AuthContext from "../../../Context/AuthContext";
import AdvisorContext from "../../../Context/AdvisorContext";
import { useNavigate } from "react-router";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Margin } from "@mui/icons-material";

const Work = () => {
  const { setCurr_group, getNotifications } = useContext(AuthContext);
  const { getMyGroups, myGroups } = useContext(AdvisorContext);

  const navigate = useNavigate();

  const [batch, setBatch] = useState("");

  useEffect(() => {
    getMyGroups();
    getNotifications();
  }, []);

  return (
    <Row className={`m-0 px-3 rounded-2 bglight py-3 ${style.tasks}`}>
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>My Groups</h2>
        </div>
        <div>
          <TextField
            id="outlined-basic"
            label="Batch"
            InputProps={{
              style: {
                color: "var(--dark)",
              },
            }}
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            variant="outlined"
          />
          <Button className=" mx-1 h-100 searchbtn">
            <ManageSearchRoundedIcon className="searchbtn" />
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
            Batch
          </Col>
          <Col className={`${style.tableHeadText}`} sm={2}>
            Students
          </Col>

          <Col className={`${style.tableHeadText}`} sm={2}>
            Domain
          </Col>
          <Col className={`${style.tableHeadText}`} sm={3}>
            Review
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row">
        <>
          {myGroups
            ? myGroups.map((group, index) => {
                if (
                  (batch !== "" && group.batch.includes(batch)) ||
                  batch === ""
                ) {
                  return (
                    <Col
                      sm={12}
                      className={`py-2 mb-2 cp bg rounded-3 ${style.tableBody}`}
                      onClick={() => {
                        setCurr_group(group.id);
                        navigate("/advisor/group");
                      }}
                    >
                      <Row className="m-0">
                        <Col className={`${style.tableBodyText}`} sm={1}>
                          #{index + 1}
                        </Col>
                        <Col className={`${style.tableBodyText}`} sm={2}>
                          {group.name}
                        </Col>
                        <Col className={`${style.tableBodyText}`} sm={2}>
                          {group.batch}
                        </Col>
                        <Col className={`${style.tableBodyText}`} sm={2}>
                          {group.student}
                        </Col>

                        <Col className={`${style.tableBodyText}`} sm={2}>
                          {group.domain}
                        </Col>
                        <Col className={`${style.tableBodyText}`} sm={3}>
                          {Date().split(" ")[0]}
                        </Col>
                      </Row>
                    </Col>
                  );
                }
              })
            : [1, 1, 1, 1, 1, 1, 1, 1].map(() => {
                return (
                  <Col
                    sm={12}
                    className={`py-2 mb-2 cp bg rounded-3 ${style.tableBody}`}
                  >
                    <Row className="m-0">
                      <Col className={`${style.tableBodyText}`} sm={1}>
                        <div className="skeleton skeleton-id"></div>
                      </Col>
                      <Col className={`${style.tableBodyText}`} sm={2}>
                        <div className="skeleton skeleton-id"></div>
                      </Col>
                      <Col className={`${style.tableBodyText}`} sm={2}>
                        <div className="skeleton skeleton-id"></div>
                      </Col>
                      <Col className={`${style.tableBodyText}`} sm={2}>
                        <div className="skeleton skeleton-id"></div>
                      </Col>

                      <Col className={`${style.tableBodyText}`} sm={2}>
                        <div className="skeleton skeleton-id"></div>
                      </Col>
                      <Col className={`${style.tableBodyText}`} sm={3}>
                        <div className="skeleton skeleton-id"></div>
                      </Col>
                    </Row>
                  </Col>
                );
              })}
        </>
      </Col>
    </Row>
  );
};

export default Work;
