
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import style from "./Requests.module.css";
import React, { useContext, useEffect, useState } from "react";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import LeadContext from "../../../Context/LeadContext";

//////////////////////////////////////////
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//////////////////////////////////////////
import AuthContext from "../../../Context/AuthContext";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Requests = () => {

  const { getRequests, requests, terminateAccept, terminateReject, shiftAccept, shiftReject } = useContext(LeadContext);
  const { getNotifications } = useContext(AuthContext);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      getRequests();
      getNotifications()
    },[])

  return (
    <>
        <Box  className="m-2 p-0 w-100">
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Batch Shift" {...a11yProps(0)} />
          <Tab label="Termination" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h3 className="me-4">Batch Shift Requests</h3>
          
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

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={2}>
            Batch
          </Col>
          <Col className="bgdark" sm={2}>
            Name
          </Col>
          <Col className="bgdark" sm={2}>
            Week
          </Col>
          <Col className="bgdark" sm={2}>
            Advisor
          </Col>
          <Col className="bgdark text-center" sm={4}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        {requests && requests.shift.length > 0 ? requests.shift.map((request) => {
          return (
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
            {request.batch}
            </Col>
            <Col className="textdark" sm={2}>
            {request.name}
            </Col>
            <Col className="textdark" sm={2}>
            {request.week}
            </Col>
            <Col className="textdark" sm={2}>
            {request.advisor}
            </Col>
            <Col className="textdark d-flex justify-content-end" sm={4}>
             <AmountModal title={'Accept'} action={shiftAccept} id={request.id} />
             <Button color="error" variant="contained" onClick={()=>{shiftReject(request.id)}}>Reject</Button>
            </Col>
           
          </Row>
        </Col>)}) : null}
          
      </Col>
    </Row>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h3 className="me-4">Termination Requests</h3>
          
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

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={2}>
            Batch
          </Col>
          <Col className="bgdark" sm={2}>
            Name
          </Col>
          <Col className="bgdark" sm={2}>
            Week
          </Col>
          <Col className="bgdark" sm={2}>
            Advisor
          </Col>
          <Col className="bgdark text-center" sm={4}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        {requests && requests.terminate.length > 0 ? requests.terminate.map((request) => {
          return (
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
              {request.batch}
            </Col>
            <Col className="textdark" sm={2}>
            {request.name}
            </Col>
            <Col className="textdark" sm={2}>
            {request.week}
            </Col>
            <Col className="textdark" sm={2}>
            {request.advisor}
            </Col>
            <Col className="textdark d-flex justify-content-end" sm={4}>
             <Button onClick={()=>{terminateAccept(request.id)}}>Accept</Button>
             <Button onClick={()=>{terminateReject(request.id)}}>Reject</Button>
            </Col>
            
          </Row>
        </Col>)}) : null}
          
      </Col>
    </Row>
      </TabPanel>
      
    </Box>
    </>
  )
}

export default Requests


const AmountModal = ({ title, action, id }) => {


  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    action(id, amount);
    setOpen(false);
  }

  return (
    <div>
      <Button className='textlight bgdark mx-2 px-3' onClick={handleClickOpen}>
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
                <Row className="my-2">
                  Payment slip will be listed on students payment page.<br/><br/>
                  Enter the amount to be paid.<br/>
                  Leave it blank if no fine exists.
                  <br/>
                  <TextField
                    className='mt-2'
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
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
  )
}