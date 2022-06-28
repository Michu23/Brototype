import React from "react";
//Bootstrap
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import style from './Payment.module.css';
import style from "./Payment.module.css";
import { useContext, useEffect, useState } from "react";
import { ShowChart } from "@mui/icons-material";
import AuthContext from "../../../Context/AuthContext";

const MyPayements = () => {
  const { myPayments, mypay } = useContext(AuthContext);

  useEffect(() => {
    myPayments();
  }, []);

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  return (
    <>
      {mypay &&
        mypay.map((item, index) => {
          if (item.status === "Expired") {
            return (
              <Col
                xs={12}
                key={index}
                className={`rounded-3 pt-4 pb-2 px-3 py-5 pb-3 row mx-0 my-2 ${style.crDiv}`}
              >
                <Col className="text-start " xs={4}>
                  <h6 className={` ${style.crMonth}`}> {item.month} 2022</h6>
                  <h3 className={`${style.crCash}`}>{formatter.format(item.amount)}</h3>
                </Col>
                <Col className="text-start " xs={4}>
                  <h6 className={` ${style.crMonth}`}>Status</h6>
                  <h6 className="h3 text-danger">{item.status}</h6>
                  
                </Col>
                <Col className="text-start " xs={4}>
                  <h6 className={` ${style.crMonth}`}>Type</h6>
                  <h6 className={` ${style.lastDate} textinfo`}>
                    {item.types}
                  </h6>
                  <h5 className="text-danger">Contact your advisor/lead with immediate effect</h5>

                </Col>
              </Col>
            );
          } else {
            return (
              <Col
                xs={12}
                key={index}
                className={`rounded-3 pt-4 pb-2 px-3 py-5 pb-3 row mx-0 my-2 ${style.crDiv}`}
              >
                <Col className="text-start " xs={4}>
                  <h6 className={` ${style.crMonth}`}> {item.month} 2022</h6>
                  <h3 className={`${style.crCash}`}>{formatter.format(item.totalamt)}</h3>
                </Col>
                <Col className="text-start " xs={4}>
                  <h6 className={` ${style.crMonth}`}>Status</h6>
                  <h6 className={` ${style.status}`}>{item.status}</h6>
                  <h6 className={` ${style.crMonth}`}>Date :</h6>
                  <h6 className={` ${style.lastDate} textinfo`}>
                    {item.paid_date}
                  </h6>
                </Col>
                <Col className="text-start " xs={4}>
                  <h6 className={` ${style.crMonth}`}>Type</h6>
                  <h6 className={` ${style.lastDate} textinfo`}>
                    {item.types}
                  </h6>
                </Col>
              </Col>
            );
          }
        })}
    </>
  );
};

export default MyPayements;
