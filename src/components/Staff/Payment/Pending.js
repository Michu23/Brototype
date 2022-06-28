import React, { useContext, useEffect, useState } from "react";
// Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "@mui/material/Button";
import AuthContext from "../../../Context/AuthContext";
import StyleContext from "../../../Context/StyleContext";

//////////////////////////////////////////
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
//////////////////////////////////////////

const Pending = ({name, batch}) => {
  const { allPendingPayments, allpending, cashpaid, sendForm } =
    useContext(AuthContext);
  const {infoToast} = useContext(StyleContext);


  useEffect(() => {
    allPendingPayments();
  }, []);

  return (
    <>
      <Col sm={12} className="py-2 my-2  px-4 rounded-3 bgdark">
        <Row className="m-0" xs={0}>
          <Col className="bgdark textlight" sm={1}>
            Batch
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Name
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Type
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Status
          </Col>
          <Col className="bgdark textlight" sm={2}>
            Pending
          </Col>
          <Col className="bgdark textlight" sm={3}>
            Action
          </Col>
        </Row>
      </Col>

      <Col className="m-0 row">
        {allpending &&
          allpending.map((pending, index) => {
            if ((name !== '' && batch !== '' && pending.student.includes(name) && pending.batch.includes(batch)) || ((name !== '' && batch === '' && pending.student.includes(name)) || (name === '' && batch !== '' &&  pending.batch.includes(batch))) || (name === '' && batch === '')) {
            if (pending.status === "Expired") {
              return (
                <Col sm={12} className="py-2 mb-2 cp bg rounded-3">
                  <Row className="m-0">
                    <Col sm={1}>{pending.batch}</Col>
                    <Col sm={2}> {pending.student} </Col>
                    <Col sm={2}>{pending.types}</Col>
                    <Col sm={2}>{pending.status}</Col>
                    <Col sm={2} className="text-danger">
                      {pending.amount}
                    </Col>

                    <Col sm={3} className="d-flex justify-content-end">
                      
                      <AmountModal title="Send Form" action={sendForm} id={pending.id} />
                      <Button
                        variant="contained"
                        color="secondary"
                        className="coh"
                        onClick={() => {
                          cashpaid(pending.paymentid);
                          infoToast("Payment Received in hand");
                        }}
                      >
                        Paid
                      </Button>
                    </Col>
                  </Row>
                </Col>
              );
            } else {
              return (
                <Col sm={12} className="py-2 mb-2 cp bg rounded-3">
                  <Row className="m-0">
                    <Col sm={1}>{pending.batch}</Col>
                    <Col sm={2}> {pending.student} </Col>
                    <Col sm={2}>{pending.types}</Col>
                    <Col sm={2}>{pending.status}</Col>
                    <Col sm={2} className="text-danger">
                      {pending.amount}
                    </Col>

                    <Col sm={3} className="d-flex justify-content-end">
                     
                      <Button
                        variant="contained"
                        color="secondary"
                        className="coh"
                        onClick={() => {
                          cashpaid(pending.paymentid);
                        }}
                      >
                        Paid
                      </Button>
                    </Col>
                  </Row>
                </Col>
              );
            }}
          })}
      </Col>
    </>
  );
};

export default Pending;


const AmountModal = ({ title, action, id }) => {

  const {infoToast} = useContext(StyleContext);

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    action(id, amount);
    infoToast("Form Sent to the Student")
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
                <Row className="my-2">
                  Since the student has failed to pay the amount on time, Please enter the fine amount the student should pay apart from the amount he has to pay.
                  <br/><br/>You can leave it blank if the student has been given excuse for this time.<br/><br/>
                  <TextField
                    id="outlined-basic"
                    label="Amount"
                    variant="outlined"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter Amount"
                  />
                </Row>
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
  )
}