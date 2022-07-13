import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import "./Back.css";
import Button from "@mui/material/Button";

const Back = () => {
  const navigate = useNavigate();

  return (
    <div id="mySidenav" className="sidenav cp" onClick={() => navigate(-1)}>
    <div href="#" id="about" className="p-3">
        <div className="d-flex justify-content-between">
            <div className="">
            <div className="mt-2 ms-1 textlight mt-1"><HiArrowLeft size={20}/></div>
            </div>
            <div>
                
                <div className="d-flex justify-content-center pe-3"><Button><h4 className=" textlight">Back</h4></Button></div>
                
            </div>
        </div>
    </div>
    </div>
  );
};

export default Back;
