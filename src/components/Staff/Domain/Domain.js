import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AddTask from "../../Staff/AddTask/AddTask"
import AuthContext from "../../../Context/AuthContext";
import LeadContext from "../../../Context/LeadContext";
import Confirm from "../Confirm/Confirm";
import { ButtonBase } from "@mui/material";
import {HiArrowLeft} from 'react-icons/hi'
import { useNavigate} from 'react-router-dom';

const Domain = () => {

  const { getDomains, domains, getNotifications } = useContext(AuthContext);
  const { deleteDomain } = useContext(LeadContext);

  const navigate = useNavigate();

  const message = "Are you sure you want to delete this domain?";
  const onConfirm = "If you delete this domain, all the students associated with it will be domainless!";

  useEffect(() => {
    getDomains();
    getNotifications()
  },[])

  return (
    <Row className="m-0 px-3 rounded-2 bglight py-3">
      <Col sm={9} className="d-flex justify-content-between">
        <div>
          <h2>Domain</h2>
        </div>
        <div>
         <AddTask title="Add Domain" value="domain" />


         {/* <div className="textlight bgdark d-flex justify-content-between my-3 mb-5 rounded-3 h-50 cp" onClick={() => navigate(-1)}>
          <div className="mt-2 ms-1 textlight mt-3"><HiArrowLeft size={20}/></div>
          <div className="d-flex justify-content-center pe-3"><Button><h6 className=" textlight">Back</h6></Button></div>
         </div> */}
         
         
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

      {domains ? domains.map((domain, index) =>{
        return (
        <Col className="m-0" sm={12} key={index}>
          <Col sm={9} className="py-2 mb-2 cp rounded-3 bg">
            <Row className="m-0">
              <Col className="textdark" sm={2}>
                #{index + 1}
              </Col>
              <Col className="textdark" sm={4}>
                {domain.name}
              </Col>

              <Col className="textdark d-flex justify-content-center" sm={6}>
                <AddTask title="Edit" value="updateDomain"  form={domain.id} />
                <div className="mx-1" >{" "}</div>
                <Confirm title="Delete" name={domain.name}  value={deleteDomain} message={message} onConfirm={onConfirm} form={domain.id} />
                {/* <Button className="coh px-4 ms-2" onClick={()=>{deleteDomain(domain.id)}}>Delete</Button> */}
              </Col>
            </Row>
          </Col>
        </Col>
      )
      
      })
    
    :
    
    [1,1,1,1,1,1,1,1].map(()=>{
      return (
        <Col className="m-0" sm={12} >
        <Col sm={9} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
             <div className="skeleton skeleton-id"></div>
            </Col>
            <Col className="textdark" sm={4}>
              <div className="skeleton skeleton-id"></div>
            </Col>

            <Col className="textdark d-flex justify-content-center" sm={6}>
            <div className="skeleton skeleton-id"></div>
              
            <div className="skeleton skeleton-id"></div>

            </Col>
          </Row>
        </Col>
      </Col>
        )
    })
    
    
    }
      
    </Row>
  );
};

export default Domain;
