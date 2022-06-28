//Bootstrap
import { Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import style from './Payment.module.css';
import style from "./Payment.module.css";
import { useContext, useEffect, useState } from "react";
import { ShowChart } from "@mui/icons-material";
import AuthContext from "../../../Context/AuthContext";
import MyPays from "./MyPayements";
import StyleContext from "../../../Context/StyleContext";

function Payment() {
  const {
    showPayment,
    amount,
    status,
    rent,
    shiftpay,
    rentpay,
    upfront,
    showUpFront,
    showShiftPayment,
    upfrontamount,
    upfrontstatus,
    shiftamount,
    shiftstatus,
    displayRazorpay,
    rentid,
    upfrontid,
    shiftid,
    myPayments,
    mypay,
    finepay,
    fineamount,
    finestatus,
    fineid,
    showFinePayment,
    getNotifications,
  } = useContext(AuthContext);

  const {infoToast} = useContext(StyleContext);

  const [btn, setBtn] = useState("True");
  const [upfrontbtn, setUpfrontBtn] = useState("True");
  const [shiftbtn, setShiftBtn] = useState("True");
  const [price, setPrice] = useState("");
  const [cash, setCash] = useState("");
  const [upfrontprice, setUpfrontPrice] = useState("");
  const [upfrontcash, setUpfrontCash] = useState("");
  const [shiftprice, setShiftPrice] = useState("");
  const [shiftcash, setShiftCash] = useState("");

  const today = new Date();
  let month = today.toLocaleString("default", { month: "long" });
  let year = new Date().getFullYear();

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  });

  

  useEffect(() => {
    showPayment();
    showUpFront();
    showShiftPayment();
    myPayments();
    showFinePayment();
    getNotifications()
  }, []);

  return (
    <Row className={`m-0 rounded-2 px-3 ${style.payment}`}>
      <Col className="text-start pt-4 pb-2" xs={12}>
        <h3>My Payments</h3>
      </Col>

      {rent && (
        <Col xs={12} className={`rounded-3 p-3  ${style.crDiv}`}>
          <Row className="m-0">
            <Col xs={4} className={`text-start ps-md-4`}>
              <h5 className={`${style.crMonth}`}>
                {month} {year}
              </h5>
              <h3 className={`${style.crCash}`}>{formatter.format(amount)}</h3>
            </Col>
            <Col xs={8} className={`text-start d-flex ps-md-4`}>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Last Date:</h5>
                <h5 className={`${style.lastDate}`}>
                  03/{month}/{year}
                </h5>
                <div className="mt-3">
                  <h5 className={`${style.crMonth}`}>Type:</h5>
                  <h5 className={`${style.lastDate} textinfo`}>Rent</h5>
                </div>
              </Col>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Status: </h5>
                <h5 className={` ${style.status}`}>{status}</h5>
              </Col>
            </Col>
          </Row>

          
            <Row className="mx-0 my-2 paybutton">
              <Col xs={12}>
                <Button
                  size="lg"
                  onClick={() => displayRazorpay(amount, "Rent", rentid)}
                  className={`w-100 ${style.btn}`}
                >
                  UPI
                </Button>
              </Col>
              
            
            </Row>
          
        </Col>
      )}
      {upfront && (
        <Col xs={12} className={`rounded-3 p-3  ${style.crDiv}`}>
          <Row className="m-0">
            <Col xs={4} className={`text-start ps-md-4`}>
              <h5 className={`${style.crMonth}`}>
                {month} {year}
              </h5>
              <h3 className={`${style.crCash}`}>{formatter.format(upfrontamount)}</h3>
            </Col>
            <Col xs={8} className={`text-start d-flex ps-md-4`}>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Last Date:</h5>
                <h5 className={`${style.lastDate}`}>
                  03/{month}/{year}
                </h5>
                <div className="mt-3">
                  <h5 className={`${style.crMonth}`}>Type:</h5>
                  <h5 className={`${style.lastDate} textinfo`}>Upfront</h5>
                </div>
              </Col>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Status: </h5>
                <h5 className={` ${style.status}`}>{upfrontstatus}</h5>
              </Col>
            </Col>
          </Row>

          
            <Row className="mx-0 my-2 paybutton">
              <Col xs={12}>
                <Button
                  size="lg"
                  onClick={() =>
                    displayRazorpay(upfrontamount, "Upfront", upfrontid)
                  }
                  className={`w-100 ${style.btn}`}
                >
                  UPI
                </Button>
              </Col>
            </Row>
         
        </Col>
      )}
      {shiftpay && (
        <Col xs={12} className={`rounded-3 p-3  ${style.crDiv}`}>
          <Row className="m-0">
            <Col xs={4} className={`text-start ps-md-4`}>
              <h5 className={`${style.crMonth}`}>
                {month} {year}
              </h5>
              <h3 className={`${style.crCash}`}>{formatter.format(shiftamount)}</h3>
            </Col>
            <Col xs={8} className={`text-start d-flex ps-md-4`}>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Last Date:</h5>
                <h5 className={`${style.lastDate}`}>
                  03/{month}/{year}
                </h5>
                <div className="mt-3">
                  <h5 className={`${style.crMonth}`}>Type:</h5>
                  <h5 className={`${style.lastDate} textinfo`}>Batch Shift</h5>
                </div>
              </Col>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Status: </h5>
                <h5 className={` ${style.status}`}>{shiftstatus}</h5>
              </Col>
            </Col>
          </Row>

          
            <Row className="mx-0 my-2 paybutton">
              <Col xs={12}>
                <Button
                  size="lg"
                  onClick={() =>
                    displayRazorpay(shiftamount, "BatchShift", shiftid)
                  }
                  className={`w-100 ${style.btn}`}
                >
                  UPI
                </Button>
              </Col>
            </Row>
         
        </Col>
      )}
      {finepay && (
        <Col xs={12} className={`rounded-3 p-3  ${style.crDiv}`}>
          <Row className="m-0">
            <Col xs={4} className={`text-start ps-md-4`}>
              <h5 className={`${style.crMonth}`}>
                {month} {year}
              </h5>
              <h3 className={`${style.crCash}`}>{formatter.format(fineamount)}</h3>
            </Col>
            <Col xs={8} className={`text-start d-flex ps-md-4`}>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Last Date:</h5>
                <h5 className={`${style.lastDate}`}>
                  03/{month}/{year}
                </h5>
                <div className="mt-3">
                  <h5 className={`${style.crMonth}`}>Type:</h5>
                  <h5 className={`${style.lastDate} textinfo`}>Fine Amount</h5>
                </div>
              </Col>
              <Col xs={6} className={`text-start ps-md-4`}>
                <h5 className={`${style.crMonth}`}>Status: </h5>
                <h5 className={` ${style.status}`}>{finestatus}</h5>
              </Col>
            </Col>
          </Row>
            <Row className="mx-0 my-2 paybutton">
              <Col xs={12}>
                <Button
                  size="lg"
                  onClick={() =>
                    displayRazorpay(fineamount, "Fine", fineid)
                  }
                  className={`w-100 ${style.btn}`}
                >
                  UPI
                </Button>
              </Col>
            </Row>
         
        </Col>
      )}
      <MyPays/>
    </Row>
  );
}

export default Payment;
