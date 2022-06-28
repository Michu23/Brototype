import React, { useEffect, useContext, useState } from 'react'
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import './Profile.module.css';
import style from "./Profile.module.css";
import Button from "@mui/material/Button";
import AuthContext from "../../../Context/AuthContext";
import id from "../../Common/Profile/ID.jpg"
import src from "../../Common/Profile/defualtProPic.jpg"
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import ProfilePic from "../../Common/Crop/Crop";
import StyleContext from "../../../Context/StyleContext";
import LeadContext from '../../../Context/LeadContext';

const PlacementProfile = () => {

    const { profile, updatePlacementProfile, getPlacementProfile, education, placement, user, getDomains, domains, getNotifications, curr_student } = useContext(AuthContext);
    const { getProfile } = useContext(LeadContext);
  const {infoToast,errorToast } = useContext(StyleContext);

  const [experience, setExperience] = useState(null);
  

  useEffect(() => {
    getDomains();
    getNotifications()
    getProfile(curr_student)
    getPlacementProfile(curr_student)
  },[])

  useEffect(() => {
    setExperience(education?.experience)
  },[education])

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      student: curr_student,
      education: e.target.education.value,
      stream: e.target.stream.value,
      courses: e.target.courses.value,
      backlogs: e.target.backlogs.value,
      experience: experience,
      company: e.target.company.value,
      duration: e.target.duration.value
    }
    updatePlacementProfile(data);
  }


  return (
    <>
    <Row className={`m-0 p-3 rounded-2 ${style.profile}`}>
        <Col className="text-start ps-2" xs={12}>
          <h2>Student Profile</h2>
        </Col>
        <form
          className="row m-0"
          onSubmit={handleSubmit}
        >
          <Col xs={12} md={6} className="p-0">
            <Col className={`px-3 py-0 mb-4 d-flex justify-content-center`} >
              <img src={profile ? profile.photo : src} alt="Profile pic" className="w-100 rounded-circle" />
            </Col>
          </Col>
          <Col xs={12} md={6} className="p-0">
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>First name</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.first_name}
                />
              </Col>
            </Col>
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Last name</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.last_name}
                />
              </Col>
            </Col>
            
            
            <Col xs={12} className="py-1 px-0">
              
              <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Email</label>
              <input
                type="email"
                className={`w-100 ${style.input}`}
                value={profile?.email}
              />
            </Col>
            </Col>
            <Col xs={12} className="py-1 px-0">
            <Col
              className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Mobile</label>
              <input
                type="tel"
                className={`w-100 ${style.input}`}
                value={profile?.mobile}
              />
            </Col>
              
            </Col>

            {/* <Col xs={12} className="py-1 px-0">
            <Col
              className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Batch</label>
              <input
                type="number"
                name="batch"
                className={`w-100 ${style.input}`}
                
              />
            </Col>
            </Col> */}
            {/* <Col xs={12} className="py-1 px-0">
            <Col
              className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Domain</label>
                <input
                  type="number"
                  name="domain"
                  className={`w-100 ${style.input}`}
                  value={profile?.domain}
                />
            </Col>
            </Col> */}
          </Col>

        <Row className='mt-3'>
            <h4>Placement Profile</h4>
          
          <Col xs={12} md={6} className="py-1 pe-md-1 px-0">
          <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Count</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={placement?.count}
                />
              </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 ps-md-1">
            <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Company name</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={placement?.company}
                />
              </Col>
          </Col>
          
          
          <Col xs={12} md={6} className="py-1 px-0 pe-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>LPA</label>
              <input
                type="number"
                className={`w-100 ${style.input}`}
                value={placement?.LPA}
              />
            </Col>
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 mt-2 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Designation</label>
              <input
                type="text"
                className={`w-100 ${style.input}`}
                value={placement?.position}
              />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 ps-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}> Company Address</label>
              <textarea
                rows="4"
                className={`w-100 ${(style.input, style.textarea)}`}
                value={placement?.address}
              />
            </Col>
          </Col>
          
          {/* <Col xs={12} md={6} className="py-1 pe-md-1 px-0">
            <Col
              className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Education</label>
              <input
                type="text"
                name="education"
                className={`w-100 ${style.input}`}
                defaultValue={profile && profile.education}
              />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 ps-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>College</label>
              <input
                type="text"
                name="college"
                className={`w-100 ${style.input}`}
                defaultValue={profile && profile.college}
              />
            </Col>
          </Col> */}

          
          </Row>

          <Row className='mt-3'>
            <h4>Education</h4>
          <Col xs={12} md={6} className="py-1 px-0 pe-md-1">
            <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Last education</label>
                <input
                  type="text"
                  name="education"
                  className={`w-100 ${style.input}`}
                  value={education?.education}
                />
              </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 ps-md-1 px-0">
          <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Stream</label>
                <input
                  type="text"
                  name="stream"
                  className={`w-100 ${style.input}`}
                  value={education?.stream}
                />
              </Col>
          </Col>
          
          
          <Col xs={12} md={6} className="py-1 px-0 pe-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Courses Studied</label>
              <textarea
                rows="4"
                name="courses"
                className={`w-100 ${(style.input, style.textarea)}`}
                value={education?.courses}
                />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 ps-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Backlogs</label>
              <input
                type="number"
                name="backlogs"
                className={`w-100 ${style.input}`}
                value={education?.backlogs}
                />
            </Col>
            {/* {education?.experience ? (<Col
              className={`py-1 pb-3 text-start mt-2 ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Experience</label>
              {education?.experience === true ? <input
                type="number"
                className={`w-100 ${style.input}`}
                value="Yes"
                /> : <input
                type="number"
                className={`w-100 ${style.input}`}
                value="No"
                />}
            </Col>):( */}
            <Col
              className={`p-2 text-start rounded-3 mt-2 ${style.inputField}`}
            >
              <FormControl className="w-100">
                <InputLabel id="demo-simple-select-autowidth-label">
                  Experience ( if )
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  autoWidth
                  label="experience ( if )"
                  maxHeight="200px"
                  value={education?.experience ? education?.experience : false}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  {(!education || education.experience === true) && 
                  <MenuItem key="yes" value={true}>
                    Yes
                  </MenuItem>}
                  {(!education || education.experience === false) &&
                  <MenuItem key="no" value={false}>
                    No
                  </MenuItem>}
                </Select>
              </FormControl>
            </Col>
            {/* )} */}
          </Col>
          {(experience === true) && (<>
            <Col xs={12} md={6} className="py-1 pe-md-1 px-0">
              <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Company name</label>
                <input
                  type="text"
                  name="company"
                  className={`w-100 ${style.input}`}
                  value={education?.company}
                />
              </Col>
            </Col>
            <Col xs={12} md={6} className="py-1 px-0 ps-md-1">
              <Col
                className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Duration</label>
                <input
                  type="text"
                  name="duration"
                  className={`w-100 ${style.input}`}
                  value={education?.duration}
                />
              </Col>
            </Col>
          </>)}
          </Row>


          


          <Row className='mt-4'>
            <h4>Student Profile</h4>
          <Col xs={12} md={6} className="py-1 px-0 pe-md-1">
            <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Gender</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.gender}
                />
              </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 ps-md-1 px-0">
          <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Date of Birth</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.dob}
                />
              </Col>
          </Col>
          <Col xs={12} md={6} className="p-0 pe-md-1">
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Father's Name</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.father}
                />
              </Col>
            </Col>
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Father's Contact</label>
                <input
                  type="tel"
                  className={`w-100 ${style.input}`}
                  value={profile?.father_contact}
                />
              </Col>
            </Col>
          </Col>
          <Col xs={12} md={6} className="p-0 ps-md-1">
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Mother's Name</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.mother}
                />
              </Col>
            </Col>
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Mother's Contact</label>
                <input
                  type="tel"
                  className={`w-100 ${style.input}`}
                  value={profile?.mother_contact}
                />
              </Col>
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 pe-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Name of Guardian</label>
              <input
                type="text"
                className={`w-100 ${style.input}`}
                value={profile?.guardian}
              />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 ps-md-1 px-0">
            <Col
              className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>
                Relationship with guardian
              </label>
              <input
                type="text"
                className={`w-100 ${style.input}`}
                value={profile?.relation}
              />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 pe-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Address</label>
              <textarea
                rows="4"
                className={`w-100 ${(style.input, style.textarea)}`}
                value={profile?.address}
              />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 ps-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Village</label>
              <input
                type="text"
                className={`w-100 ${style.input}`}
                value={profile?.village}
              />
            </Col>
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 mt-2 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Taluk</label>
              <input
                type="text"
                className={`w-100 ${style.input}`}
                value={profile?.taluk}
              />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 pe-md-1 px-0">
            <Col
              className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>Education</label>
              <input
                type="text"
                className={`w-100 ${style.input}`}
                value={profile?.education}
              />
            </Col>
          </Col>
          <Col xs={12} md={6} className="py-1 px-0 ps-md-1">
            <Col
              className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
            >
              <label className={`${style.label}`}>College</label>
              <input
                type="text"
                className={`w-100 ${style.input}`}
                value={profile?.college}
              />
            </Col>
          </Col>

          <Col xs={12} md={6} className="p-0 pe-md-1">
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Experience</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.experience}
                />
              </Col>
            </Col>
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 pb-3 text-start ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Company</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.company}
                />
              </Col>
            </Col>
            <Col xs={12} className="py-1 px-0">
              <Col
                className={`py-1 text-start pb-3 ps-3 rounded-3 ${style.inputField}`}
              >
                <label className={`${style.label}`}>Designation</label>
                <input
                  type="text"
                  className={`w-100 ${style.input}`}
                  value={profile?.designation}
                />
              </Col>
            </Col>
          </Col>
          <Col className="py-1 px-0 ps-md-1" xs={12} md={6}>
            <Col
              className={`p-2 text-start rounded-3 d-flex justify-content-center ${style.inputField} ${style.heightFull}`}
            >
              <img src={profile ? profile.govtid : id} alt="Profile pic" className="w-100" />
            </Col>
          </Col>
          </Row>

          {!education &&(<Col className="m-0 p-0">
            <Col className="submitProfileDiv mt-3">
              <Button
                className="submitProfile"
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
              <Button
                className="submitProfile ms-3 bg-dark text-white"
                color="primary"
              >
                Cancel
              </Button>
            </Col>
          </Col>)}
        </form>
      </Row></>
  )
}

export default PlacementProfile