import React, { useContext, useEffect } from "react";
import "./Pending.css";
import AuthContext from "../../../Context/AuthContext";
import { FaTrashAlt } from "react-icons/fa";

const Pending = () => {
  
  const { getPendings, pendings, getNotifications,deletePendings } = useContext(AuthContext);

  useEffect(() => {
    getPendings();
    getNotifications();
  },[])

  return (
    <div className="main-div">
      <div className="contain-div">
      { pendings.length > 0 ? <> 
        <div className="view-div">
          <h4 className="title-view">Pending</h4>
        </div>
        <div className="content-div">
           <h3 className="title-content">Pending</h3>
           <hr></hr>
           <div className="">
{pendings.map((pending) => {
            return (
            <div className=" d-flex justify-content-between">
              <div>
                <p key={pending.id}>{pending.taskname}</p>
              </div>
              <div>
                <FaTrashAlt onClick={((e)=>{
              e.preventDefault();
              deletePendings(pending.id);
            }
              )} className="cp" />
              </div>
            
            
            </div>
          )})}
           </div>
          
        </div> </> :
        <div className="view-div-2">
            <h4 className="title-view">No Pendings</h4>
        </div> }
      </div>
    </div>
  );
};

export default Pending;
