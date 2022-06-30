import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AddTask from "../../Staff/AddTask/AddTask"

const Reviewer = () => {
  return (
    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={9} className="d-flex justify-content-between">
        <div>
          <h2>Reviewer</h2>
        </div>
        <div>
         <AddTask title="Add Reviewer" value="reviewer" />
        </div>
      </Col>
      {/* <Col sm={6} className="d-flex justify-content-between"/> */}
      

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

      {/* {domains && domains.map((domain, index) =>{
        return ( */}
        <Col className="m-0" sm={12} >
          <Col sm={9} className="py-2 mb-2 cp rounded-3 bg">
            <Row className="m-0">
              <Col className="textdark" sm={2}>
               #1
              </Col>
              <Col className="textdark" sm={4}>
               Michu
              </Col>

              <Col className="textdark d-flex justify-content-center" sm={6}>
                <AddTask title="Edit" value="updateDomain"  />
                <Button className="coh px-4 ms-2" >Delete</Button>
              </Col>
            </Row>
          </Col>
        </Col>
      {/* )})} */}
      
    </Row>
  )
}

export default Reviewer