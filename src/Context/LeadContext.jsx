import { createContext, useContext, useState } from "react";
// import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";
import AuthContext, { BaseUrl } from "./AuthContext";

const LeadContext = createContext();
export default LeadContext;

export const LeadProvider = ({ children }) => {
  //Asign the useNavigate hook to a variable
  const navigate = useNavigate();

  const { authTokens, getDomains, setProfile, getBatches } = useContext(AuthContext);

  //Define the state of the context
  const [advisorsNames, setAdvisorsNames] = useState(null);
  const [advisors, setAdvisors] = useState(null);
  const [groups, setGroups] = useState(null);
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupLessers, setGroupLessers] = useState(null);
  const [placements, setPlacements] = useState(null);
  const [requests, setRequests] = useState(null);
  const [students, setStudents] = useState(null);
  const [advisorLink, setAdvisorLink] = useState(null);


  //Create function


  const createBatch = async (batch, advisor, location) => {
    console.log(advisor, location, batch);
    await axios.post(BaseUrl + "batch/create/batch",
        {
          'advisor': advisor,
          'location': location,
          'name': batch,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getBatches();
      }).catch((err) => {
        console.log(err);
      });
  };

  const createDomain = async (domain) => {
    await axios.post("http://127.0.0.1.:8000/user/create/domain",
        {
          name: domain,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getDomains();
      }).catch((err) => {
        console.log(err);
      });
  };

  const createGroup = async (batch, name, advisor, domain) => {
    console.log(batch, name, advisor, domain);
    await axios.post(BaseUrl + "batch/create/group",
        {
          batch: batch,
          name: name,
          advisor: advisor,
          domain: domain,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getGroups();
      }).catch((err) => {
        console.log(err);
      });
  };

  const createPlacement = async (student, name, location, designation, LPA, address, count) => {
    await axios.post(BaseUrl + "student/create/placement",
        {
          student: student,
          name: name,
          location: location,
          designation: designation,
          lpa: LPA,
          address: address,
          count: count,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }).then((res) => {
          console.log(res.data);
          getPlacements();
        }).catch((err) => {
          console.log(err);
        })
  }

  //Read function
  

  const getAdvisors = async () => {
    await axios
      .post(
        BaseUrl + "admins/view/advisors",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setAdvisors(res.data.advisors);
        setAdvisorLink(res.data.link.code)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAdvisorsNames = async () => {
    await axios.post(BaseUrl + "admins/view/advisors/names",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        setAdvisorsNames(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getGroups = async () => {
    await axios.post(BaseUrl + "batch/view/groups",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        setGroups(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getGroupDetails = async (groupId) => {
    await axios.post(BaseUrl + "batch/view/group/details",
        { id: groupId },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        setGroupDetails(res.data);
        console.log("datas", res.data);
        navigate("/lead/groups/manage");
      }).catch((err) => {
        console.log(err);
      });
  };

  const getGroupLess = async () => {
    await axios.post(BaseUrl + "batch/view/group/less",
        {
          domain: groupDetails.domain,
          batch: groupDetails.batch,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        setGroupLessers(res.data);
        console.log("datas", res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getPlacements = async () => {
    await axios.get(BaseUrl + "student/view/placements",
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }).then((res) => {
        setPlacements(res.data);
        console.log("datas", res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getProfile = async (userId) => {
    await axios.post(BaseUrl + "user/view/profile",
        {
          "userId": userId,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        setProfile(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getRequests = async () => {
    await axios.post(BaseUrl + "student/view/requests", {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }).then((res) => {
        setRequests(res.data);
        console.log("datas", res.data);
      }).catch((err) => {
        console.log(err);
      });
  }

  const getStudents = async () => {
    await axios.get(BaseUrl + "student/view/students",
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Update function


  const updateBatch = async (batch, advisor) => {
    await axios.post(BaseUrl + "batch/update/batch",
        {
          'advisor': advisor,
          'id': batch,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getBatches();
      }).catch((err) => {
        console.log(err);
      });
  };

  const updateDomain = async (domainId, domain) => {
    await axios.post("http://127.0.0.1.:8000/user/update/domain",
        {
          'id': domainId,
          'new_name': domain,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getDomains();
      }).catch((err) => {
        console.log(err);
      });
  };

  const updateGroup = async (groupId, name, advisor) => {
    await axios.post("http://127.0.0.1.:8000/batch/update/group",
        {
          'id': groupId,
          'new_name': name,
          'advisor': advisor
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getDomains();
      }).catch((err) => {
        console.log(err);
      });
  };
  
  //Delete function


  const deleteAdvisor = async (advisorId) => {
    await axios.post(BaseUrl + "admins/delete/advisor",
        {
          'id': advisorId,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        getAdvisors();
      }).catch((err) => {
        console.log(err);
      });
  };

  const deleteBatch = async (batchId) => {
    await axios.post(BaseUrl + "batch/delete/batch",
        { id: batchId },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getBatches();
      }).catch((err) => {
        console.log(err);
      });
  };

  const deleteDomain = async (domainId) => {
    await axios.post(BaseUrl + "user/delete/domain",
        { id: domainId },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getDomains();
      }).catch((err) => {
        console.log(err);
      });
  };

  const deleteGroup = async (groupId) => {
    await axios.post(BaseUrl + "batch/delete/group",
        { id: groupId },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getGroups();
        navigate("/lead/groups");
      }).catch((err) => {
        console.log(err);
      });
  };

  //Other functions


  const addInGroup = async (userId) => {
    await axios.post(BaseUrl + "batch/add/group",
        {
          student: userId,
          group: groupDetails.id,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getGroupDetails(groupDetails.id);
        getGroupLess(groupDetails.domain);
      }).catch((err) => {
        console.log(err);
      });
  };

  const rmFromGroup = async (userId) => {
    await axios.post(BaseUrl + "batch/remove/group",
        {
          student: userId,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        console.log(res.data);
        getGroupDetails(groupDetails.id);
        getGroupLess(groupDetails.domain);
      }).catch((err) => {
        console.log(err);
      });
  };

  const studentManage = async (student, batch, domain,fee) => {
    await axios.post(BaseUrl + "student/manage/student", {
      'student':student,
      'batch':batch,
      'domain':domain,
      'fee':fee,
    },{
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res=>{
      console.log(res.data)
      getStudents();
    }).catch(err=>{
      console.log(err.response.data);
      console.log(err)
    })
  };

  const shiftAccept = async (id,amount) => {
    await axios.post(BaseUrl + "student/shift/accept", {
      'id':id,
      'amount':amount,
    },{
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res=>{
      getRequests()
    }).catch(err=>{
      console.log(err.response.data);
      console.log(err)
    })
  }

  const shiftReject = async (id) => {
    await axios.post(BaseUrl + "student/shift/reject", {
      'id':id,
    },{
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res=>{
      getRequests()
    }).catch(err=>{
      console.log(err.response.data);
      console.log(err)
    })
  }

  const terminateAccept = async (id) => {
    await axios.post(BaseUrl + "student/terminate/accept", {
      'id':id,
    },{
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res=>{
      getRequests()
    }).catch(err=>{
      console.log(err.response.data);
      console.log(err)
    })
  }

  const terminateReject = async (id) => {
    await axios.post(BaseUrl + "student/terminate/reject", {
      'id':id,
    },{
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res=>{
      getRequests()
    }).catch(err=>{
      console.log(err.response.data);
      console.log(err)
    })
  }

  const contextData = {
    //Create
    createBatch,
    createDomain,
    createGroup,
    createPlacement,

    //Read
    getAdvisors,
    getAdvisorsNames,
    getGroups,
    getGroupDetails,
    getGroupLess,
    getPlacements,
    getProfile,
    getRequests,
    getStudents,

    //Update
    updateBatch,
    updateDomain,
    updateGroup,

    //Delete
    deleteAdvisor,
    deleteBatch,
    deleteDomain,
    deleteGroup,

    //Others
    addInGroup,
    rmFromGroup,
    studentManage,
    shiftAccept,
    shiftReject,
    terminateAccept,
    terminateReject,

    //State functions
    setAdvisors,
    setAdvisorsNames,
    setAdvisorLink,
    setGroups,
    setGroupDetails,
    setGroupLessers,
    setPlacements,
    setRequests,
    setStudents,

    //State variables
    advisors,
    advisorsNames,
    advisorLink,
    groups,
    groupDetails,
    groupLessers,
    placements,
    requests,
    students
  };
  return (
    <LeadContext.Provider value={contextData}>{children}</LeadContext.Provider>
  );
};