// Bootstrap
import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from "../../../Context/AuthContext";

const Completed = ({name, batch}) => {
  const { allpaid, allCompletedPayments } = useContext(AuthContext);
  
  useEffect(() => {
    allCompletedPayments();
  },[]);

  return (
    <>
      <Col sm={12} className="py-2 my-2  px-4 rounded-3 bgdark">
        <Row className="m-0" xs={0}>
          <Col className="bgdark textlight" sm={1}>
            Batch
          </Col>
          <Col className="bgdark textlight" sm={3}>
            Name
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Date
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Type
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Amount
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Status
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row">
        <>
          {allpaid &&
            allpaid.map((paid, index) => {
              if ((name !== '' && batch !== '' && paid.student.includes(name) && paid.batch.includes(batch)) || ((name !== '' && batch === '' && paid.student.includes(name)) || (name === '' && batch !== '' &&  paid.batch.includes(batch))) || (name === '' && batch === '')) {
              return (
                <Col sm={12} className="py-2 mb-2 cp bg rounded-3">
                  <Row className="m-0">
                    <Col sm={1}>#{paid.batch} </Col>
                    <Col sm={3}>{paid.student} </Col>
                    <Col sm={2}>{paid.paid_date}</Col>
                    <Col sm={2}>{paid.types}</Col>
                    <Col sm={2}>{paid.paid}</Col>
                    <Col sm={2}>{paid.status}</Col>
                  </Row>
                </Col>
              )}
            })}

        </>
      </Col>
    </>
  );
};

export default Completed;
