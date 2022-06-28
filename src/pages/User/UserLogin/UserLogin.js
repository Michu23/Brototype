import Header from "../../../components/Common/Header/Header";
import Header2 from "../../../components/Common/Header2/Header2";
import AuthContext from "../../../Context/AuthContext";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { Container } from "react-bootstrap";



const UserLogin = () => {
  let {loginUser} = useContext(AuthContext)


  return (
    <>
      <div
        className="container-fluid p-0 m-0 bg-secondary"
        style={{ height: "100vh" }}
      >
        <Header />
        <Header2/>
        <div className="d-flex w-100 vh-75 justify-content-center align-items-center pt-5">
        <Container
          className=" w-25 bg-dark p-5 text-white text-left mt-5"
          style={{borderRadius: "2px" }}
        >
          <form onSubmit={(e)=>{e.preventDefault();
             loginUser(e)
             }}>
            <h4 className="text-center">
              Login here
            </h4>
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
            
            <div className="form-group pt-3 text-center text-muted">
                Not a user yet? <Link to="/signup">Signup</Link>
              </div>

            <div className="d-flex justify-content-center ">
              <button type="submit" className="btn btn-info mt-1">
                Submit
              </button>
            </div>
          </form>
        </Container>
      </div>
      </div>
    </>
  );
};

export default UserLogin;
