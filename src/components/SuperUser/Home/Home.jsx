import Header from "../../Common/Header/Header";
import AuthContext from "../../../Context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ManageSearchRoundedIcon from "@mui/icons-material/ManageSearchRounded";
import { Row, Col } from "react-bootstrap";
import style from "./Requests.module.css";
import Button from "@mui/material/Button";

const AdminHome = () => {
  const { leads, getLeads, deleteLead, getNotifications } = useContext(AuthContext);

  useEffect(() => {
    getLeads();
    getNotifications()
  }, []);


  return (
    <>
    <Row className="m-0 p-3 rounded-2 pb-0">
      <Col sm={12} className="d-flex justify-content-between mb-2">
        <div className="d-flex">
          <h3 className="me-4">Leads</h3>
          <Link to="/admin/create/lead"><Button className="ml-1 h-50 bgdark textlight">Add</Button></Link>
          
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
            <input type="text" className={`w-100 ${style.input}`} />
          </Col>

          <Button className=" mx-1 searchbtn">
            <ManageSearchRoundedIcon className="searchbtn" />
          </Button>
        </div>
      </Col>

      <Col sm={12} className="py-2 mt-2 bgdark  px-4 rounded-3">
        <Row className="m-0 textlight" xs={0}>
          <Col className="bgdark" sm={1}>
            Index
          </Col>
          <Col className="bgdark" sm={2}>
            Name
          </Col>
          <Col className="bgdark" sm={2}>
            Location
          </Col>
          <Col className="bgdark" sm={2}>
            Position
          </Col>
          <Col className="bgdark" sm={2}>
            Phone
          </Col>
          <Col className="bgdark text-center" sm={2}>
            Actions
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row ">
        <Col sm={12} className="py-2 mb-2 cp rounded-3 bglight">
        {leads ?
                leads.map((lead, index) => {
                  return (
          <Row className="m-0"  key={index}>
          
            <Col className="textdark" sm={1}>
            #{index+1}
            </Col>
            <Col className="textdark" sm={2}>
            {lead.name}
            </Col>
            <Col className="textdark" sm={2}>
            {lead.user.username}
            </Col>
            <Col className="textdark" sm={2}>
            {lead.user.username}
            </Col>
            <Col className="textdark" sm={2}>
            {lead.user.username}
            </Col>
            <Col className="textdark d-flex justify-content-center" sm={2}>
              <Button color="error" variant="contained" className="pb-1">
                Delete
              </Button>
            </Col>
           
          </Row>
           );
          }):
          
           [1,1,1,1,1,1,1,1].map(()=>{
        return (
      <Row className="m-0 my-2 p-1 py-2 bg"   >
          
              <Col className="textdark" sm={1}>
              <div className="skeleton skeleton-id"></div>

              </Col>
              <Col className="textdark" sm={2}>
              <div className="skeleton skeleton-id"></div>

              </Col>
              <Col className="textdark" sm={2}>
              <div className="skeleton skeleton-id"></div>

              </Col>
              <Col className="textdark" sm={2}>
              <div className="skeleton skeleton-id"></div>

              </Col>
              <Col className="textdark" sm={2}>
              <div className="skeleton skeleton-id"></div>

              </Col>
              <Col className="textdark d-flex justify-content-center" sm={2}>
              <div className="skeleton skeleton-id"></div>

              </Col>
             
            </Row>
         )
        })
          
          
          }
        </Col>
      </Col>
    </Row>
      {/* <div className="container-fluid p-0 m-0 ">

        <div className="container">
          <table
            className="table text-center bs"
            
          >
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">{lead.name}</th>
                <th scope="col">{lead.user.username}</th>
                <th scope="col">
                  <Link to="/admin/create/lead">
                    <button className="btn btn-dark px-3">+ Add User</button>
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {leads &&
                leads.map((lead, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">#{index+1}</th>
                      <td>{lead.name}</td>
                      <td>{lead.user.username}</td>
                      <td className="d-flex justify-content-center">
                        <div className="d-flex">
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => {deleteLead(lead.id)}}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div> */}
    </>
  );
};

export default AdminHome;