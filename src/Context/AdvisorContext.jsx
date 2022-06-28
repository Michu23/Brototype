import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Navigate, useNavigate } from "react-router";
import AuthContext from "./AuthContext";

const AdvisorContext = createContext();
export default AdvisorContext;

export const AdvisorProvider = ({ children }) => {
  //Asign the useNavigate hook to a variable
  const navigate = useNavigate();

  const { authTokens, curr_manifest, getStudentManifest } =
    useContext(AuthContext);

  //Define the state of the context
  const [myStudents, setMyStudents] = useState(null);
  const [myGroups, setMyGroups] = useState(null);
  const [myGroupDetails, setMyGroupDetails] = useState(null);

  //Create function

  const addTask = async (task) => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/add/task",
        {
          task: task,
          manifest: curr_manifest,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        getStudentManifest(curr_manifest);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  };

  const deleteTask = async (id) => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/delete/task",
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        getStudentManifest(curr_manifest);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  };

  const reviewPassed = async (form, reviewer, remark, date, status) => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/review/passed",
        {
          form: form,
          reviewer: reviewer,
          remark: remark,
          next_review: date,
          manifest: curr_manifest,
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        getStudentManifest(curr_manifest);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  };

  const reviewRepeated = async (form, reviewer, remark, date, status) => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/review/repeated",
        {
          form: form,
          reviewer: reviewer,
          remark: remark,
          next_review: date,
          manifest: curr_manifest,
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        getStudentManifest(curr_manifest);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  };

  //Read function

  const getMyGroups = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/batch/view/mygroups",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setMyGroups(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMyStudents = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/student/view/mystudents",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setMyStudents(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMyGroupDetails = async (groupId) => {
    await axios
      .post(
        "http://127.0.0.1:8000/batch/view/mygroup/details",
        { id: groupId },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setMyGroupDetails(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //Update function

  const taskComplete = async (taskId) => {
    await axios.post('http://127.0.0.1:8000/manifest/complete/task',{'task':taskId},{
        headers: {Authorization : `Bearer ${authTokens.access}`}
    }).then(res=>{
        console.log(res.data)
        getStudentManifest(curr_manifest)
    }).catch(err=>{
        console.log(err)
    })
  }
  // Other function

  const sendShiftRequest = async (studentId, shiftTo) => {
    await axios.post('http://127.0.0.1:8000/student/request/shift',{
        'student':studentId,
        'shift_to':shiftTo,
      },{
        headers: {Authorization : `Bearer ${authTokens.access}`}
    }).then(res=>{
        console.log(res.data)
        getMyStudents()
    }).catch(err=>{
        console.log(err)
    })
  }

  const sendTerminateRequest = async (studentId) => {
    await axios.post('http://127.0.0.1:8000/student/request/terminate',{
        'student':studentId,
      },{
        headers: {Authorization : `Bearer ${authTokens.access}`}
    }).then(res=>{
        console.log(res.data)
        getMyStudents()
    }).catch(err=>{
        console.log(err)
    })
  }












// >>>>>>> main
  const contextData = {
    //Create
    addTask,
    reviewPassed,
    reviewRepeated,

    //Read
    getMyGroups,
    getMyStudents,
    getMyGroupDetails,

    //Update
    taskComplete,
    deleteTask,

    //Send request
    sendShiftRequest,
    sendTerminateRequest,

    //State functions
    setMyStudents,
    setMyGroups,
    setMyGroupDetails,

    //State variables
    myStudents,
    myGroups,
    myGroupDetails,
    

  };
  return (
    <AdvisorContext.Provider value={contextData}>
      {children}
    </AdvisorContext.Provider>
  );
};
