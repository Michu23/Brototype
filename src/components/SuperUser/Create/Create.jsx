import React, { useEffect } from "react";
import Header from "../../Common/Header/Header";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const AdminCreate = () => {
  const { createLead, allLocations, getLocations, getNotifications } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    createLead(data);
  }

  useEffect(() => {
    getLocations();
    getNotifications()
  },[])

  return (
    <div>
      <div className="p-0 pt-5 m-0 w-100" style={{ height: "100vh" }}>
        <div
          className="container w-50 bg-light p-5 text-left"
          style={{
            borderRadius: "2px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <h4 className="text-center">
              Create New User
            </h4>
            <div className="form-group">
              <label>Full name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter name"
              />
            </div>
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
              <label>E-mail</label>
              <input
                type="email"
                name="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group">
              <label>Phone number</label>
              <input
                type="tel"
                name="phone"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter phone"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <select className="form-control" name="location">
                {allLocations &&
                  allLocations.map((location, index) => {
                    return (
                      <option key={index} value={location.id}>
                        {location.place}
                      </option>
                    )})}
              </select>
            </div>
            <div className="form-group">
              <label>Staff</label>
              <select className="form-control" name="staff">
                <option value="Lead">Lead</option>
                <option value="Placement">Placement</option>
                <option value="Finance">Finance</option>
              </select>
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

            <div className="d-flex justify-content-center ">
              <button type="submit" className="btn btn-info mt-3">
                Submit
              </button>
            </div>
            <div className="d-flex justify-content-center ">
              <Link to="/admin">
                <button className="btn btn-light mt-3">Back to homepage</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminCreate;