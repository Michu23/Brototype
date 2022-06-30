import React, { useContext, useState } from 'react'
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import style from "./Requests.module.css";
import Button from "@mui/material/Button";
import LeadContext from '../../../Context/LeadContext';
import AuthContext from '../../../Context/AuthContext';
/////////////////////////
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect } from 'react';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
/////////////////////////

const Branch = () => {
  const { deleteBranch } = useContext(LeadContext);
  const { allBranches, getBranch } = useContext(AuthContext);

  useEffect(() => {
    getBranch();
  }, []);
  return (
    <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h3 className="me-4">Branches</h3>
          <ModalBranch button="Add" title="Add Branch" />
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
            <input type="text"   className={`w-100 ${style.input}`} />
          </Col>

          <Button className=" mx-1 searchbtn">
            <ManageSearchRoundedIcon className="searchbtn" />
          </Button>
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={2}>
            Index
          </Col>
          <Col className="bgdark" sm={2}>
            Branch
          </Col>
          <Col className="bgdark" sm={2}>
            Location
          </Col>
          <Col className="bgdark" sm={2}>
            Students
          </Col>
          <Col className="bgdark text-center" sm={4}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
       
        {allBranches?.map((branch, index) => {
          return (
            <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
              <Row className="m-0">
                <Col className="textdark" sm={2}>
                  {index + 1}
                </Col>
                <Col className="textdark" sm={2}>
                  {branch.name}
                </Col>
                <Col className="textdark" sm={2}>
                  {branch.location}
                </Col>
                <Col className="textdark" sm={2}>
                  {branch.students}
                </Col>
                <Col className="textdark d-flex justify-content-center" sm={4}>
                <Button color="error" variant="contained" 
                onClick={()=>deleteBranch(branch.id)}> Delete</Button>
                </Col>
              </Row>
            </Col>
        )})}
          
      </Col>
    </Row>
  )
}

export default Branch


function ModalBranch({button, title}) {
  const { createBranch } = useContext(LeadContext);
  const { allLocations, getLocations } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    if (name !== ""){
      createBranch(name, location);
      setOpen(false);
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  useEffect(() => {
    getLocations()
  }, [])
  return (
    <div>
      <Button onClick={handleClickOpen} className="ml-1 h-50 bgdark textlight">
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
                Enter the Name of the Location
                <br></br>
                <br></br>
                <TextField
                  id="outlined-basic"
                  label="Branch "
                  variant="outlined"
                  placeholder="name of branch"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormControl className="my-1">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Location
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={location}
                      required
                      onChange={(e) => setLocation(e.target.value)}
                      autoWidth
                      maxHeight="200px"
                      label="Location"
                    >
                      {allLocations?.map((location) =>{
                          return (
                          <MenuItem key={location.id} value={location.id}>
                            {location.place}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
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