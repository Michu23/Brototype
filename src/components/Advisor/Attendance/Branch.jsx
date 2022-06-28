import React, { useContext, useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';


const Branch = () => {

    const { getBranch, allBranches, setBranchid, getNotifications } = useContext(AuthContext);
  useEffect(() => {
    getBranch();
    getNotifications()
  }, []);

  return (
    <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h2 className="me-4">Branch</h2>
        </div>
      </Col>

      <Col sm={12} className="py-2 my-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark d-flex justify-content-center" sm={12}>
            All Branches
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        <Link to="/lead/placements/info" style={{ textDecoration: "none" }}>
          <Col sm={12} className="py-2 mb-2 cp  rounded-3 ">
            <Row className="m-0 d-flex justify-content-center">
              {allBranches &&
                allBranches.map((place) => {
                    console.log(place)
                    console.log(place.id)
                  return (
                    <Link to="/advisor/branches/students">
                      <Col
                        className="textdark bg m-1 p-2 rounded-3 d-flex justify-content-center"
                        sm={3}
                        onClick={() => {
                            setBranchid(place.id);
                        }}
                      >
                        {place.name}
                      </Col>
                    </Link>
                  );
                })}
            </Row>
          </Col>
        </Link>
      </Col>
    </Row>
  )
}

export default Branch