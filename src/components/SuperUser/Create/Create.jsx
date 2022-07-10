import React, { useEffect } from "react";
import Header from "../../Common/Header/Header";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup
    .string()
    .min(6, "Username should contain 6 characters")
    .required("Userame is required"),

  email: yup.string().email("Invalid email").required("Email is required"),
  fullname: yup.string().required("Fullname is required"),
  phone: yup.string().required("Phone number is required").min(10, "Phone number should contain 10 characters").max(10, "Phone number should contain 10 characters"),

  password: yup
    .string()
    .min(6, "Password should contain 6 characters")
    .required("Password is required"),
  cpassword: yup.string().oneOf([yup.ref("password"), "Passwords not matching"]),
});

const AdminCreate = () => {
  const { createLead, allLocations, getLocations, getNotifications } =
    useContext(AuthContext);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const data = new FormData(e.target);
  //   createLead(data);
  // }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getLocations();
    getNotifications();
  }, []);

  return (
    <div>
      <div className="p-0 pt-5 m-0  w-100">
        <div
          className="container w-50 bglight p-5 text-left bs rounded-3"
          style={{
            borderRadius: "2px",
          }}
        >
          <form onSubmit={handleSubmit(createLead)} className="w-100">
            <h2 className="text-center textdark">New Staff</h2>
            <div className="form-group mt-4">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                {...register("fullname")}
                aria-describedby="emailHelp"
                placeholder="Enter name"
              />
              <label className="text-danger">
                     
                      {errors.fullname && errors.fullname.message}
                    </label>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                {...register("username")}
                aria-describedby="emailHelp"
                placeholder="Enter username"
              />
              <label className="text-danger">
              {errors.username && errors.username.message}
                    </label>
            </div>
            <div className="form-group">
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                {...register("email")}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
              <label className="text-danger">
              {errors.email && errors.email.message}
                    </label>
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="tel"
                name="phone"
                {...register("phone")}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter phone"
              />
              <label className="text-danger">
              {errors.phone && errors.phone.message}
                    </label>
            </div>
            <div className="form-group">
              <label>Location</label>
              <select
                className="form-control"
                name="location"
                {...register("location")}
              >
                {allLocations &&
                  allLocations.map((location, index) => {
                    return (
                      <option key={index} value={location.id}>
                        {location.place}
                      </option>
                    );
                  })}
              </select>
              <label className="text-danger">
              {errors.location && errors.location.message}
                    </label>

            </div>
            <div className="form-group">
              <label>Staff</label>
              <select
                className="form-control"
                name="staff"
                {...register("staff")}
              >
                <option value="Lead">Lead</option>
                <option value="Placement">Placement</option>
                <option value="Finance">Finance</option>
              </select>
              <label className="text-danger">
              {errors.staff && errors.staff.message}
                    </label>
            </div>
            <div className="form-group mb-4">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("password")}
                className="form-control"
                placeholder="Password"
              />
              <label className="text-danger">
              {errors.password && errors.password.message}
                    </label>
            </div>
            <div className="form-group mb-4">
              <label>Password</label>
              <input
                name="password"
                type="password"
                {...register("cpassword")}
                className="form-control"
                placeholder="Password"
              />
              <label className="text-danger">
              {errors.cpassword && errors.cpassword.message}
                    </label>
            </div>

            <div className="d-flex justify-content-center ">
              <button type="submit" className="btn btn-info mt-3">
                Submit
              </button>
            </div>
            <div className="d-flex justify-content-center ">
              <Link to="/admin">
                <button className="btn btn-light mt-3">Go Back</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreate;
