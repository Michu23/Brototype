import React, { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AuthContext from "../../../Context/AuthContext";
import LeadContext from "../../../Context/LeadContext";
/////////////////////////
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
/////////////////////////

const Reviewer = () => {
  const { deleteReviewer } = useContext(LeadContext);
  const { reviewers, getReviewers } = useContext(AuthContext);

  useEffect(() => {
    getReviewers();
  }, []);
  return (
    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={9} className="d-flex justify-content-between">
        <div>
          <h2>Reviewer</h2>
        </div>
        <div>
         <ReviewerModal button="Add" title="Add Reviewer" action="create" />
        </div>
      </Col>

      <Col sm={9} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={2}>
            ID
          </Col>
          <Col className="bgdark" sm={4}>
            Name
          </Col>
          <Col className="bgdark text-center" sm={6}>
            Actions
          </Col>
        </Row>
      </Col>

      {reviewers?.map((reviewer, index) =>{
        return (
        <Col className="m-0" sm={12} >
          <Col sm={9} className="py-2 mb-2 cp rounded-3 bg">
            <Row className="m-0">
              <Col className="textdark" sm={2}>
               #{index+1}
              </Col>
              <Col className="textdark" sm={4}>
                {reviewer.name}
              </Col>
              <Col className="textdark d-flex justify-content-center" sm={6}>
                <ReviewerModal button="Edit" title="Edit Reviewer" action="update" id={reviewer.id} />
                <Button className="coh px-4 ms-2" onClick={()=>deleteReviewer(reviewer.id)} >Delete</Button>
              </Col>
            </Row>
          </Col>
        </Col>
      )})}
      
    </Row>
  )
}

export default Reviewer

function ReviewerModal({button, title, action, id}) {
  const { createReviewer, updateReviewer } = useContext(LeadContext);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name !== ""){
      if (action === "create"){
        createReviewer(name);
      } else if (action === "update"){
        updateReviewer(id, name);
      }
      setOpen(false);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div>
      <Button onClick={handleClickOpen} className="ml-1 px-lg-4 bgdark textlight">
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
                Enter the Name of the Reviewer
                <br></br>
                <br></br>
                <TextField
                  id="outlined-basic"
                  label="Reviewer Name"
                  variant="outlined"
                  placeholder="name of reviewer"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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