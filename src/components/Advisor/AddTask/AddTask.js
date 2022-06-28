import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Row } from "react-bootstrap";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AuthContext from "../../../Context/AuthContext";
import AdvisorContext from "../../../Context/AdvisorContext";

const AddTask = ({ title, value, form }) => {
  const {
    batches,
    reviewers,
    getBatches,
    getReviewers,
  } = useContext(AuthContext) ;

  const {
    reviewPassed,
    reviewRepeated,
    sendShiftRequest,
  } = useContext(AdvisorContext);
  

  const [open, setOpen] = useState(false);
  const [reviewer, setReviewer] = useState(null);
  const [batch, setBatch] = useState(29);
  const [remark, setRemark] = useState(null);
  const [date, setDate] = useState(null);
  const [status, setStatus] = useState(null);


  const handleClickOpen = () => {
    if (value === "completed" || value === "repeated") {
      getReviewers()
    } else if (value === "shift") {
      getBatches()
    }
    setReviewer(null);
    setRemark(null);
    setDate(null);
    setStatus(null);
    setOpen(true);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 450,
      },
    },
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    if (value === "completed" ) {
      reviewPassed(form, reviewer, remark, date, status)
    } else if (value === "repeated") {
      reviewRepeated(form, reviewer, remark, date, status)
    } else if (value === "shift") {
      e.stopPropagation()
      sendShiftRequest(form, batch)
    }
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" className="addtask" onClick={handleClickOpen}>
        {title}
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
              {(value === "completed" || value === "repeated") && (
                <Row className="my-2">
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Reviewer
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={reviewer}
                      onChange={(e) => setReviewer(e.target.value)}
                      autoWidth
                      label="Reviewer name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {reviewers &&
                        reviewers.map((reviewer) =>{
                          return (
                          <MenuItem key={reviewer.id} value={reviewer.id}>
                            {reviewer.name}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                  <FormControl className="mb-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      autoWidth
                      label="Status"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      { value === "completed" ?
                      <MenuItem key={1} value={'Task Completed'}> Task Completed </MenuItem> :
                      <MenuItem key={3} value={'Task Critical'}> Task Critical </MenuItem>}
                      { value === "completed" ? 
                      <MenuItem key={2} value={'Need Improvement'}> Need Improvement </MenuItem> :
                      <MenuItem key={4} value={'Repeat Review'}> Repeat Review </MenuItem>}
                      
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Remark"
                    variant="outlined"
                    value={remark}
                    onChange={(e) => setRemark(e.target.value)}
                    placeholder="Enter remark here"
                  />
                  <input type="date" className="mt-4 py-3 rounded border-1" value={date}
                    onChange={(e) => {setDate(e.target.value)}}></input>
                </Row>
              )}
              {(value === "shift") && (
                <Row className="my-2">
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Shift to
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      autoWidth
                      label="Reviewer name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {batches &&
                        batches.map((batch) =>{
                          return (
                          <MenuItem key={batch.id} value={batch.id}>
                            {batch.name}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                </Row>
              )}
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
};

export default AddTask;
