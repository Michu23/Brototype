import React, { useContext } from "react";
import Header from "../../../components/Common/Header/Header";
import Header2 from "../../../components/Common/Header2/Header2";
import AuthContext from "../../../Context/AuthContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(4, "Username should contain 6 characters")
    .required("Userame is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should contain 6 characters")
    .required("Password is required"),
  cpassword: yup.string().oneOf([yup.ref("password"), null]),
  batch: yup.number().required("Batch is required"),
});

const UserReg = () => {
  let { signupUser, errUser } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div>
      <div
        className="container-fluid p-0 m-0 bg-secondary"
        style={{ height: "100%" }}
      >
        <Header />
        <Header2 />
        <div className="d-flex w-100 vh-75 justify-content-center align-items-center pt-5">
          <div
            className="container w-25 bg-dark p-5 pb-0 mb-5 text-white text-left"
            style={{ borderRadius: "2px" }}
          >
            <form onSubmit={handleSubmit(signupUser)}>
              <div className="">
                <h1 className="mb-0 fs-3 text-center">Sign Up</h1>
                <br />

                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    {...register("username")}
                    placeholder="Username"
                  />
                  <label className="text-danger">
                    {errUser}
                    {errors.username?.message}
                  </label>
                </div>
                <div className="form-group">
                  <label>Batch</label>
                  <input
                    type="text"
                    name="batch"
                    className="form-control"
                    {...register("batch")}
                    placeholder="batch"
                  />
                  <label className="text-danger">{errors.batch?.message}</label>
                </div>
                <div className="form-group">
                  <label>E-mail</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    {...register("email")}
                  />
                  <label className="text-danger">{errors.email?.message}</label>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    aria-describedby="emailHelp"
                    {...register("password")}
                    placeholder="Enter Password"
                  />
                  <label className="text-danger">
                    {errors.password?.message}
                  </label>
                </div>
                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    name="cpassword"
                    type="password"
                    className="form-control"
                    {...register("cpassword")}
                    placeholder=" Confirm Password"
                  />
                  <label className="text-danger">
                    {errors.cpassword && "Passwords doesn't match"}
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="card-body flex-grow-0">
                <div className="form-group pb-3 text-center text-muted">
                  Already have an account? <Link to="/signin">Sign in</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReg;
