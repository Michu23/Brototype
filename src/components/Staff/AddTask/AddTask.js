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
import LeadContext from "../../../Context/LeadContext";
import { set } from "react-hook-form";

const AddTask = ({ title, value, form }) => {
  const {
    batches,
    domains,
    getBatches,
    getDomains,
    getNotificationsTypes,
    createNotifications,
  } = useContext(AuthContext) ;
  const {
    advisors,
    groupDetails,
    students,
    createBatch,
    createDomain,
    createGroup,
    createPlacement,
    getAdvisors,
    getStudents,
    studentManage,
    updateDomain,
    updateBatch,
    updateGroup,
  } = useContext(LeadContext);

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [domain, setDomain] = useState("");
  const [fee, setFee] = useState("");
  const [advisor, setAdvisor] = useState("");
  const [location, setLocation] = useState("");
  const [batch, setBatch] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const [designation, setDesignation] = useState("");
  const [LPA, setLPA] = useState("");
  const [student, setStudent] = useState("");
  const [address, setAddress] = useState("");
  const [count, setCount] = useState(0);

  const handleClickOpen = () => {
    if (value === "batch" || value === "updateBatch" || value === "group") {
      getAdvisors();
    } else if (value === "addgroup") {
      getAdvisors();
      getDomains();
      getBatches();
    } else if (value === "st_manage") {
      getBatches();
      getDomains();
    } else if (value === "addnotifications") {
      getNotificationsTypes();
    } else if (value === "placement") {
      getDomains();
      getBatches();
      getStudents();
    }

    setName(null);
    setDomain(null);
    setAdvisor(null);
    setLocation(null);
    setBatch(null);
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

  const findDomainName = (id) => {
    let domainName = "";
    domains.map((domain) => {
      if (domain.id === id) {
        domainName = domain.name;
      }
    });
    return domainName;
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (value === "batch") {
      createBatch(batch, advisor, location);
    } else if (value === "domain") {
      createDomain(domain);
    } else if (value === "addgroup") {
      createGroup(batch, name, advisor, domain);
    } else if (value === "updateDomain") {
      updateDomain(form, domain)
    }else if (value === "updateBatch") {
      updateBatch(form, advisor)
    }else if (value === "group") {
      updateGroup(groupDetails.id, name, advisor)
    }else if (value === "st_manage") {
      studentManage(form, batch, domain, fee)
    } else if (value === "addnotifications") {
      createNotifications(form, type, content);
    } else if (value === "placement") {
      createPlacement(student, name, location, designation, LPA, address, count);
    }
      setOpen(false); 
    }

  return (
    <div>
      <Button variant="contained" className="addtask" onClick={handleClickOpen}>
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
              {value === "addnotifications" && (
                 
                <Row className="my-2">
                  Enter the details accordingly to create a new notification.
                 <br></br>
                 <br></br>
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      autoWidth
                      label="Type"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      <MenuItem key="Placement" value="Placement">
                        Placement
                      </MenuItem>
                      <MenuItem key="AdvisorChange" value="AdvisorChange">
                      AdvisorChange
                      </MenuItem>
                      <MenuItem key="BatchShift" value="BatchShift">
                      BatchShift
                      </MenuItem>
                      <MenuItem key="Termination" value="Termination">
                      Termination
                      </MenuItem>
                      <MenuItem key="Message" value="Message">
                      Message
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <textarea
                    rows="4"
                    value={content}
                    className="w-100 noti-content"
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter content here.."
                  />
                </Row>
              )}

              {value === "domain" && (
                <Row className="my-2">
                  Enter the domain name here to create a new domain.
                 <br></br>
                 <br></br>
                  <TextField
                    id="outlined-basic"
                    label="Domain name"
                    variant="outlined"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Domain name"
                  />
                </Row>
              )}

              {value === "st_manage" && (
                <Row className="my-2">
                  Kindly select all the fields to update the student details.
                  <br></br>
                  <br></br>

                  <FormControl className="my-1">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Batch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      autoWidth
                      maxHeight="200px"
                      value={batch}
                      required
                      onChange={(e) => {
                        setBatch(e.target.value);
                      }}
                      label="Batch"
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
                  <FormControl className="my-1">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Domain
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={domain}
                      required
                      onChange={(e) => setDomain(e.target.value)}
                      autoWidth
                      maxHeight="200px"
                      label="Domain"
                      MenuProps={MenuProps}
                    >
                      {domains &&
                        domains.map((domain) =>{
                          return (
                          <MenuItem key={domain.id} value={domain.id}>
                            {domain.name}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                  <FormControl className="my-1">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Fee type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                      autoWidth
                      required
                      maxHeight="200px"
                      label="Domain"
                      MenuProps={MenuProps}
                    >
                          <MenuItem value="ISI" key="ISI">
                            ISI
                          </MenuItem>
                          <MenuItem value="Upfront" key="Upfront">
                            Upfront
                          </MenuItem>
                    </Select>
                  </FormControl>
                </Row>
              )}
              {value === "updateDomain" && (
                <Row className="my-2">
                  Enter the domain name here to update the domain.
                 <br></br>
                 <br></br>
                  <TextField
                    id="outlined-basic"
                    label="Domain name"
                    variant="outlined"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="Enter domain name here"
                  />
                </Row>
              )}
              {value === "batch" && (
                <Row className="my-2">
                  Enter the details necessary here to create a new batch.
                 <br></br>
                 <br></br>
                  <TextField
                    id="outlined-basic"
                    label="Batch name"
                    variant="outlined"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    placeholder="Enter batch name here.."
                  />
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Advisor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={advisor}
                      onChange={(e) => setAdvisor(e.target.value)}
                      autoWidth
                      label="Advisor name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {advisors &&
                        advisors.map((advisor) =>{
                          return (
                          <MenuItem key={advisor.id} value={advisor.id}>
                            {advisor.username}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                  <FormControl className="mb-4">
                    <InputLabel id="location-label">Location</InputLabel>
                    <Select
                      labelId="location-label"
                      id="location-selected"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      autoWidth
                      label="Advisor name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      <MenuItem value={"kochi"}>Kochi</MenuItem>
                      <MenuItem value={"calicut"}>Calicut</MenuItem>
                      <MenuItem value={"trivandrum"}>Trivandrum</MenuItem>
                      <MenuItem value={"dubai"}>Dubai</MenuItem>
                    </Select>
                  </FormControl>
                </Row>
              )}
              {value === "updateBatch" && (
                <Row className="my-2">
                  Enter the details necessary here to update the batch.
                  <br></br>
                  <br></br>
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Advisor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={advisor}
                      onChange={(e) => setAdvisor(e.target.value)}
                      autoWidth
                      label="Advisor"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {advisors &&
                        advisors.map((advisor) =>{
                          return (
                          <MenuItem key={advisor.id} value={advisor.id}>
                            {advisor.username}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                </Row>
              )}
              {value === "group" && (
                <Row className="my-2">
                  Enter the details necessary here to create a new group.
                  <br></br>
                  <br></br>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name here.."
                  />
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Advisor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={advisor}
                      onChange={(e) => setAdvisor(e.target.value)}
                      autoWidth
                      label="Advisor name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {advisors &&
                        advisors.map((advisor) =>{
                          return (
                          <MenuItem key={advisor.id} value={advisor.id}>
                            {advisor.username}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                </Row>
              )}
              {value === "addgroup" && (
                <Row className="my-2">
                  Enter the details necessary here to add a new group.
                  <br></br>
                  <br></br>
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Batch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      autoWidth
                      label="Batch name"
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
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name here.."
                    className="my-2"
                  />
                  <FormControl className="mt-4 mb-2">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Advisor
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={advisor}
                      onChange={(e) => setAdvisor(e.target.value)}
                      autoWidth
                      label="Advisor name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {advisors &&
                        advisors.map((advisor) =>{
                          return (
                          <MenuItem key={advisor.id} value={advisor.id}>
                            {advisor.username}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                  <FormControl className="my-4">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Domain
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      autoWidth
                      label="Domain name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {domains &&
                        domains.map((domain) =>{
                          return (
                          <MenuItem key={domain.id} value={domain.id}>
                            {domain.name}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                </Row>
              )}
              {value === "placement" && (
                <Row className="my-2">
                  Enter the details necessary here to add a new placement.
                  <br></br>
                  <br></br>
                  <FormControl className="my-2">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Batch
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={batch}
                      onChange={(e) => setBatch(e.target.value)}
                      autoWidth
                      label="Domain name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {batches &&
                        batches.map((batch) =>{
                          return (
                          <MenuItem key={batch.id} value={batch.name}>
                            {batch.name}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                  <FormControl className="my-2">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Domain
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      autoWidth
                      label="Domain name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {domains &&
                        domains.map((domain) =>{
                          return (
                          <MenuItem key={domain.id} value={domain.id}>
                            {domain.name}
                          </MenuItem>
                        )})}
                    </Select>
                  </FormControl>
                  <FormControl className="my-2">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Student
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={student}
                      onChange={(e) => setStudent(e.target.value)}
                      autoWidth
                      label="Student name"
                      maxHeight="200px"
                      MenuProps={MenuProps}
                    >
                      {students &&
                        students.map((student) =>{
                          if ((batch !== null && domain !== null && batch === student.batch && findDomainName(domain) === student.domain)) {
                          return (
                          <MenuItem key={student.id} value={student.id}>
                            {student.name}
                          </MenuItem>
                        )}})}
                    </Select>
                  </FormControl>
                  <TextField
                    id="outlined-basic"
                    label="Company Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter company name here.."
                    className="my-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Designation"
                    variant="outlined"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    placeholder="Enter designation here.."
                    className="my-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="LPA"
                    variant="outlined"
                    value={LPA}
                    onChange={(e) => setLPA(e.target.value)}
                    placeholder="Enter LPA here.."
                    className="my-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Location"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location here.."
                    className="my-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    variant="outlined"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter address here.."
                    className="my-2"
                  />
                  <TextField
                    id="outlined-basic"
                    label="Number of placements"
                    variant="outlined"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    placeholder="Number of placements"
                    className="my-2"
                  />
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
