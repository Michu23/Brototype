import React, { useContext } from "react";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AuthContext from "../../Context/AuthContext";
import { Col, Container, Row } from "react-bootstrap";
import Logo from "./login.svg";

const Login = () => {
  let { loginUser, setSwap, errUser } = useContext(AuthContext);
  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col md={8}>
          <Box
            className="bg p-5 rounded-3 "
            sx={{
              marginTop: -1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img width="500px" height="100px" src={Logo} alt="" />
            <Typography component="h1" variant="h4">
              Login here
            </Typography>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                loginUser(e);
              }}
              className=" my-3"
            >
              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter username"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              {errUser && <small className="text-danger"> {errUser} </small>}
              <div className="d-flex justify-content-center mt-3">
                <button type="submit" className="btn btn-info mt-1">
                  Submit
                </button>
              </div>
            </form>
            <Grid container>
              <Grid item xs className="d-flex justify-content-between">
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
                <Link
                  href="#"
                  className="textdark"
                  variant="body2"
                  onClick={() => {
                    setSwap("reset");
                  }}
                >
                  {/* Reset password */}
                </Link>
              </Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

//  <Box component="form" noValidate sx={{ mt: 1 }}>
//             <TextField
//               margin="normal"
//               className="textfld"
//               sx={{ input: { color: "var(--dark)" } }}
//               InputLabelProps={{
//                 style: { color: "var(--dark)" },
//               }}
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="email"
//               autoComplete="email"
//               autoFocus
//             />
//             <TextField
//               margin="normal"
//               className="textfld"
//               sx={{ input: { color: "var(--dark)" } }}
//               InputLabelProps={{
//                 style: { color: "var(--dark)" },
//               }}
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//             />
//             <FormControlLabel
//               control={<Checkbox value="remember" color="primary" />}
//               label="Remember me"
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               className="signinbtn"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>

//           </Box>
