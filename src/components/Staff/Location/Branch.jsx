import React from 'react'
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import style from "./Requests.module.css";
import Button from "@mui/material/Button";


const Branch = () => {
  return (
    <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h3 className="me-4">Branches</h3>
          <Button className="ml-1 h-50 bgdark textlight">
          Add
            </Button>
          
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
       
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bg">
          <Row className="m-0">
            <Col className="textdark" sm={2}>
            #1
            </Col>
            <Col className="textdark" sm={2}>
            Kubz
            </Col>
            <Col className="textdark" sm={2}>
            Kochi
            </Col>
            <Col className="textdark" sm={2}>
            33
            </Col>
            <Col className="textdark d-flex justify-content-center" sm={4}>
            
             <Button color="error" variant="contained" >Delete</Button>
            </Col>
           
          </Row>
        </Col>
          
      </Col>
    </Row>
  )
}

export default Branch