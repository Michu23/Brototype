import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AddTask from "../../Staff/AddTask/AddTask";
import LeadContext from "../../../Context/LeadContext";
import AuthContext from "../../../Context/AuthContext";


const Batch = () => {

  const { batches, getBatches, getNotifications } = useContext(AuthContext);
  const { deleteBatch } = useContext(LeadContext);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    getBatches();
    getNotifications()
  },[])

  return (
    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={12} className="d-flex justify-content-between">
        <div>
          <h2>Batch</h2>
        </div>
        <div>
          <AddTask title="Add Batch" value="batch" />
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={1}>
            Batch
          </Col>
          <Col className="bgdark" sm={2}>
            Advisor
          </Col>
          <Col className="bgdark" sm={2}>
            Students
          </Col>
          <Col className="bgdark" sm={2}>
            Placed
          </Col>
          <Col className="bgdark text-center" sm={5}>
            Actions
          </Col>
        </Row>
      </Col>

      {batches && batches.map((batch) =>{
        return (
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bg" key={batch.id}>
          <Row className="m-0">
            <Col className="textdark" sm={1}>
              {batch.name}
            </Col>
            <Col className="textdark" sm={2}>
              {batch.advisor}
            </Col>
            <Col className="textdark" sm={2}>
              {batch.student}
            </Col>
            <Col className="textdark" sm={2}>
              {batch.placement}
            </Col>
            <Col className="textdark d-flex" sm={5}>
              <Button className="me-2" variant="contained" onClick={()=>{copyToClipboard("http://localhost:3000/signup/"+batch.code)}}>Link</Button>
              <AddTask title="Edit" value="updateBatch" form={batch.id} />
              <Button className="coh ms-3" onClick={()=>{deleteBatch(batch.id)}}>Delete</Button>
            </Col>
          </Row>
        </Col>
      )})}
    </Row>
  );
};

export default Batch;
