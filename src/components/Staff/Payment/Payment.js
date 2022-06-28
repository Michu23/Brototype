// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./Payment.module.css";
import Button from "@mui/material/Button";
import Completed from "./Completed";
import Pending from "./Pending";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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



function Payment() {
  const { allPendingPayments, allCompletedPayments } = useContext(AuthContext);
  const { getNotifications } = useContext(AuthContext);
  const [batch, setBatch] = useState('');
  const [name, setName] = useState('');

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    allPendingPayments();
    allCompletedPayments();
    getNotifications()
  }, []);

  const [active, setActive] = useState("Completed");

  return (
    <Row className="m-0 px-3 rounded-2 bg py-3 bglight">

<Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Completed" {...a11yProps(0)} />
          <Tab label="Pending" {...a11yProps(1)} />
          
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>Payments</h2>
        </div>
        <div className="d-flex justify-content-end textlight">
          <Col
            xs={4}
            className={`py-1 my-1 textwhite mx-2 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Name</label>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className={`w-100 ${style.input}`} />
          </Col>

          <Col
            xs={4}
            className={`py-1 textwhite my-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Batch</label>
            <input type="text" value={batch} onChange={(e)=>{setBatch(e.target.value)}} className={`w-100 ${style.input}`} />
          </Col>

          <Button className=" mx-1 searchbtn">
            <ManageSearchRoundedIcon className="searchbtn" />
          </Button>
        </div>
        <div>
          
        </div>
      </Col>
      <Completed name={name} batch={batch}/>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>Pending</h2>
        </div>
        <div className="d-flex justify-content-end textlight">
          <Col
            xs={4}
            className={`py-1 my-1 textwhite mx-2 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Name</label>
            <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className={`w-100 ${style.input}`} />
          </Col>

          <Col
            xs={4}
            className={`py-1 textwhite my-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
          >
            <label className={`${style.label}`}>Batch</label>
            <input type="text" value={batch} onChange={(e)=>{setBatch(e.target.value)}} className={`w-100 ${style.input}`} />
          </Col>

          <Button className=" mx-1 searchbtn">
            <ManageSearchRoundedIcon className="searchbtn" />
          </Button>
        </div>
        
      </Col>
        <Pending name={name} batch={batch}/>
      </TabPanel>
      
    </Box>
{/*       
      {active === "Pending" && <Pending name={name} batch={batch} />}
      {active === "Completed" && <Completed name={name} batch={batch} />} */}
    </Row>
  );
}

export default Payment;
