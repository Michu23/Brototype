import React, { useContext } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AuthContext from "../../Context/AuthContext";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "./login.svg";

const Reset = () => {
  let {reset_password, setSwap } = useContext(AuthContext);
  return (
    <Container  >
      <Row className="d-flex justify-content-center my-3">
        <Col md={8}>
          <Box
            className="bg p-5 rounded-3 d-flex justify-content-center"
            sx={{
              marginTop: -1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img width="500px" height="100px" src={Logo} alt="" />
            <Typography component="h5" variant="h6">
              Enter your email to reset your password
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                reset_password(e.target.email.value);
              }}
              className=" my-3 w-100"
            >
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-info mt-1">
                  Submit
                </button>
              </div>
            </form>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  className="textdark"
                  variant="body2"
                  onClick={() => {
                    setSwap("video");
                  }}
                >
                  Back
                </Link>
              </Grid>
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default Reset;

