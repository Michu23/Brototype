import React, { useContext, useEffect, useState } from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import style from "./Tasks.module.css"
import Button from "@mui/material/Button";
import LeadContext from "../../../Context/LeadContext";
import { useNavigate } from "react-router";
<<<<<<< HEAD
import AuthContext,{ BaseUrl } from "../../../Context/AuthContext";
=======
import AuthContext, { BaseUrl } from "../../../Context/AuthContext";
/////////////////////////
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
/////////////////////////
>>>>>>> 55c48117313414a44a2767bfaed27d200bb22e5c

const Advisors = () => {

  const { getAdvisors, advisors, getProfile, blockAdvisor, advisorLink } = useContext(LeadContext);
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
          {advisorLink ? <div className="d-flex">
            <ChangeCode button="Change" title="Change Old Link" />
            <Button className="ms-2 w-75 bgdark textlight"
              onClick={()=>{copyToClipboard(BaseUrl + "signup/" + advisorLink)}}>Link</Button>
          </div>:<>
            <ChangeCode button="Add Link" title="Add New Link" />
          </>}
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
              <Button variant="contained" className="mx-1" color="error" onClick={() => {blockAdvisor(advisor.id)}}>Block</Button>
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