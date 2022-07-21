import React, { useContext, useEffect, useState } from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import style from "./Tasks.module.css"
import Button from "@mui/material/Button";
import LeadContext from "../../../Context/LeadContext";
import { useNavigate } from "react-router";
import AuthContext, { BaseLink } from "../../../Context/AuthContext";
import Confirm from "../Confirm/Confirm";

/////////////////////////
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
/////////////////////////

const Advisors = () => {

  const { getAdvisors, advisors, getProfile, blockAdvisor, advisorLink, reviewerReport, reviewerReports } = useContext(LeadContext);
  const { getNotifications } = useContext(AuthContext);

  const navigate = useNavigate();

  const message = "Are you sure you want to block this advisor?";
  const onConfirm = "If you block this advisor, All the students, batches and groups associated with her will be orphaned!";

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    getAdvisors();
    getNotifications()
    reviewerReport()
  },[])

  return (
    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>Reviewers</h2>
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
            Students
          </Col>
          <Col className="bgdark" sm={3}>
            Count
          </Col>
          <Col className="bgdark" sm={3}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
      {reviewerReports ? reviewerReports.map((reviewer, index) =>{
        return (
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
              #{index + 1}
            </Col>
            <Col className="textdark" sm={2}>
              {reviewer.name}
            </Col>
            <Col className="textdark" sm={2}>
              {reviewer.students}
            </Col>
            <Col className="textdark" sm={3}>
              {reviewer.reviews}
            </Col>

            <Col className="textdark d-flex" sm={3}>
              {/* <Button variant="contained" className="mx-1" color="error" onClick={() => {blockAdvisor(advisor.id)}}>Block</Button> */}
              <Confirm title="Block" name={reviewer.username}  message={message} onConfirm={onConfirm}  />

              {/* <Button className="bgdark textlight px-3 mx-1" onClick={ async () => {await getProfile(advisor.id)
          navigate("/lead/advisor/profile")}}>Profile</Button> */}
            </Col>
          </Row>
        </Col>
      )}):
     
      [1,1,1,1,1,1,1,1].map(()=>{
        return (
      <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
            <div className="skeleton skeleton-id"></div>

            </Col>
            <Col className="textdark" sm={2}>
            <div className="skeleton skeleton-id"></div>

            </Col>
            <Col className="textdark" sm={2}>
            <div className="skeleton skeleton-id"></div>

            </Col>
            <Col className="textdark" sm={3}>
            <div className="skeleton skeleton-id"></div>

            </Col>

            <Col className="textdark d-flex" sm={3}>
              {/* <Button variant="contained" className="mx-1" color="error" onClick={() => {blockAdvisor(advisor.id)}}>Block</Button> */}
              <div className="skeleton skeleton-id"></div>


              <div className="skeleton skeleton-id"></div>

         
            </Col>
          </Row>
        </Col>
         )
        })
        }
        
      </Col>
    </Row>
  );
};

export default Advisors;

function ChangeCode({button, title}) {
  const { changeLink } = useContext(LeadContext);

  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = () => {
    changeLink(code);
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {button}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box
              component="form"
              noValidate
              autoComplete="off"
              className="d-block p-3 px-5"
              style={{ width: "500px", height: "fit-content" }}
            >
              <Row className="my-2">
                Enter the code
                <br></br>
                <br></br>
                <TextField
                  id="outlined-basic"
                  label="Code  "
                  variant="outlined"
                  placeholder="Enter the link here"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </Row>
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}