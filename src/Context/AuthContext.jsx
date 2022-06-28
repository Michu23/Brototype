import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";
import StyleContext from "./StyleContext";

import FormData from "form-data";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const { successToast, warningToast, infoToast } = useContext(StyleContext);
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  const [errUser, setErrUser] = useState();
  const [profile, setProfile] = useState(null);
  const [domains, setDomains] = useState(null);
  const [signUpBatch, setSignUpBatch] = useState(null);
  const [studentTasks, setStudentTasks] = useState(null);
  const [studentManifest, setStudentManifest] = useState(null);
  const [curr_manifest, setCurr_manifest] = useState(null);
  const [curr_student, setCurr_student] = useState(null);
  const [curr_group, setCurr_group] = useState(null);
  const [reviewers, setReviewers] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [swap, setSwap] = useState("video");
  const [swap2, setSwap2] = useState("video");
  const [types, setTypes] = useState(null);
  const [pendings, setPendings] = useState([]);
  const [batches, setBatches] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [rent, setRent] = useState(false);
  const [shiftpay, setShiftpay] = useState(false);
  const [finepay, setFinepay] = useState(false);
  const [upfront, setUpfront] = useState(false);
  const [leads, setLeads] = useState(null);
  const [education, setEducation] = useState(null);
  const [placement, setPlacement] = useState(null);

  const signupUser = async ({ username, email, password }) => {
    const check = signUpBatch === 0 ? true : false;
    await axios
      .post("http://127.0.0.1:8000/user/signup", {
        username: username,
        email: email,
        password: password,
        batch: signUpBatch,
        is_staff: check,
        location: selectedPlace
      })
      .then((res) => {
        console.log(res.data);
        stndingData(username, password);
      })
      .catch((err) => {
        console.log(err.response.data);
        console.log(err);
      });
  };

  const stndingData = async (username, password) => {
    await axios
      .post("http://127.0.0.1:8000/user/token", { username, password })
      .then((res) => {
        setAuthTokens(res.data);
        setUser(jwt_decode(res.data.access));
        localStorage.setItem("authTokens", JSON.stringify(res.data));
        const position = jwt_decode(res.data.access).position;
        if (position === "Admin") {
          navigate("/lead");
          infoToast("Welcome admin , Its Miras and Shafeeq of batch 20 who did this web application, Kindly assure our high salary placements");
        } else if (position === "Advisor") {
          navigate("/advisor");
          infoToast("Welcome Advisor");
        } else if (position === "Communication") {
          navigate("/");
          infoToast("Welcome Communication Team");
        } else if (position === "Finance") {
          navigate("/finance");
          infoToast("Welcome Finance Head");
        } else if (position === "Lead") {
          navigate("/lead");
          infoToast("Welcome Lead");
        } else if (position === "Placement") {
          navigate("/placement");
          infoToast("Welcome Placement Cell");
        } else if (position === "Student") {
          navigate("/");
          infoToast("Welcome Student");
        } else if (position === "Outsider") {
          logoutUser();
          warningToast("You are not authorized to access this page");
        }
      })
      .catch((err) => {
        setErrUser("Username or Password is incorrect");
      });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    stndingData(username, password);
  };

  const logoutUser = async () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    localStorage.removeItem("notification");
    setSwap("video");
    setSwap2("video");
    navigate("/signin");
    infoToast("Logged Out Successfully");
  };

  const reset_password = async (email) => {
    console.log(email);
    await axios
      .post("http://127.0.0.1:8000/user/password_reset/done/", { email }, { headers: { "Content-Type": "application/json" } })
      .then((res) => {
        infoToast("Password reset link has been sent to your email");
      }).catch((err) => {
        warningToast("Email not found");
      }).finally(() => {
        setTimeout(() => {
          navigate("/signin");
        }, 3000);
      }
      );
  }

  const reset_password_confirm = async (e,uid,token,new_password,re_new_password) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirm_password = e.target.confirm_password.value;
    const body = {
      uid: uid,
      token: token,
      new_password: new_password,
      re_new_password: re_new_password
    }
    if (password === confirm_password) {
      await axios
        .post("http://127.0.0.1:8000/user/reset_password_confirm", body , { headers: { "Content-Type": "application/json" } })
        .then((res) => {
          infoToast("Password changed successfully");
        }).catch((err) => {
          warningToast("Password not changed");
        }).finally(() => {
          setTimeout(() => {
            navigate("/signin");
          }, 3000);
        }
        );
    } else {
      warningToast("Password not changed");
    }
  }

  const getMyProfile = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/user/view/profile",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDomains = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/user/view/domain",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setDomains(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const backendUpdate = async (data) => {
    await axios
      .post("http://127.0.0.1:8000/user/update/profilephoto", data, {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        console.log(res.data);
        getMyProfile();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getReviewers = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/admins/view/reviewers",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setReviewers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBatches = async () => {
    await axios.post("http://127.0.0.1:8000/batch/view/batches",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      ).then((res) => {
        setBatches(res.data);
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  const getStudentTasks = async (studentId) => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/view/tasklist",
        { id: studentId },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setStudentTasks(res.data);
        console.log(res.data);
        if (user.position === "Student") {
          navigate("/taskslist");
        } else if (user.position === "Advisor") {
          navigate("/advisor/group/taskslist");
        } else if (user.position === "Lead") {
          navigate("/lead/students/taskslist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getChartData = async () => {
    await axios
      .get("http://127.0.0.1:8000/manifest/view/chartdata", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        setChartData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPendings = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/view/pendings",
        {
          id: curr_student,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPendings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePendings = async (id) => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/delete/pendings",
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setPendings(res.data);
        getPendings();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStudentManifest = async (manifestId) => {
    await axios
      .post(
        "http://127.0.0.1:8000/manifest/view/manifest",
        { id: manifestId },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setStudentManifest(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isLinkValid = async (link) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/user/validate/link",
      { link: link },
      {}
    );
    return res;
  };

  const updateProfile = async (e, govtid) => {
    e.preventDefault();
    var domain = null;
    if (user.position === "Student") {
      var domain = e.target.domain.value;
    }
    await axios
      .post(
        "http://127.0.0.1:8000/user/update/profile",
        {
          first_name: e.target.first_name.value,
          last_name: e.target.last_name.value,
          dob: e.target.dob.value,
          domain: domain,
          gender: e.target.gender.value,
          email: e.target.email.value,
          mobile: e.target.mobile.value,
          father: e.target.father.value,
          father_contact: e.target.father_contact.value,
          mother: e.target.mother.value,
          mother_contact: e.target.mother_contact.value,
          guardian: e.target.guardian.value,
          relation: e.target.relation.value,
          address: e.target.address.value,
          village: e.target.village.value,
          taluk: e.target.taluk.value,
          education: e.target.education.value,
          college: e.target.college.value,
          experience: e.target.experience.value,
          company: e.target.company.value,
          designation: e.target.designation.value,
          govtid: govtid,
        },
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [notifications, setNotifications] = useState([]);
  const getNotifications = async () => {
    axios.post("http://127.0.0.1:8000/user/view/notifications",{},{ headers: { Authorization: `Bearer ${authTokens.access}` } }
      ).then((res) => {
        console.log(res.data);
        setNotifications(res.data);
      }).catch((err) => {
        console.log(err);
      })
  };

  const getNotificationsTypes = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/user/types",
        {},
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createNotifications = async (type, content) => {
    await axios
      .post(
        "http://127.0.0.1:8000/user/create/notification",
        {
          type: type,
          content: content,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNotifications = async (id) => {
    await axios
      .post(
        "http://127.0.0.1:8000/user/delete/notification",
        { id: id },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(0);
  const [rentid, setRentId] = useState(0);

  const showPayment = async () => {
    await axios
      .get("http://127.0.0.1:8000/payment/pay", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status === "Paid") {
          setRent(false);
        } else {
          setAmount(res.data.amount);
          setStatus(res.data.status);
          setRentId(res.data.id);
          setRent(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [upfrontstatus, setUpfrontstatus] = useState(0);
  const [upfrontamount, setUpfrontamount] = useState(0);
  const [upfrontid, setUpfrontId] = useState(0);

  const showUpFront = async () => {
    await axios
      .get("http://127.0.0.1:8000/payment/upfrontpay", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        if (res.data.status === "Paid") {
          setUpfront(false);
        } else {
          console.log(res.data);
          setUpfrontamount(res.data.amount);
          setUpfrontstatus(res.data.status);
          setUpfrontId(res.data.id);
          setUpfront(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [shiftamount, setShiftamount] = useState(0);
  const [shiftstatus, setShiftstatus] = useState(0);
  const [shiftid, setShiftId] = useState(0);

  const showShiftPayment = async () => {
    await axios
      .get("http://127.0.0.1:8000/payment/shiftpay", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        if (res.data.status !== "Paid") {
          setShiftamount(res.data.amount);
          setShiftstatus(res.data.status);
          setShiftId(res.data.id);
          setShiftpay(true);
        } else {
          setShiftpay(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [fineamount, setFineamount] = useState(0);
  const [finestatus, setFinestatus] = useState(0);
  const [fineid, setFineId] = useState(0);

  const showFinePayment = async () => {
    await axios
      .get("http://127.0.0.1:8000/payment/FinePayments", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.status !== "Paid") {
          setFineamount(res.data.amount);
          setFinestatus(res.data.status);
          setFineId(res.data.id);
          setFinepay(true);
        } else {
          setFinepay(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });

  const displayRazorpay = async (amount, type, id) => {
    debugger;
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      warningToast("You are offline");
      return;
    }

    var bodyDatas = {
      amount: amount,
      type: type,
      id: id,
    };

    console.log(bodyDatas);

    const data = await axios({
      url: "http://127.0.0.1:8000/payment/start_payment",
      method: "POST",
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyDatas,
    }).then((res) => {
      return res;
    });

    const options = {
      key: "rzp_test_KgiLdhTO6F4BS3",
      currency: "INR",
      amount: amount * 100,
      name: "BrotoType",
      description: "Paying your Co-working rent ",
      order_id: id,

      handler: function (response) {
        debugger;
        console.log(response);
        payRent(bodyDatas, response);
        successToast("Payment Successful");
      },

      prefill: {
        name: "Michu",
        email: "m4michu123@gmail.com",
        contact: "9207404868",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const payRent = async (bodyDatas, response) => {
    console.log(bodyDatas);
    try {
      let bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));
      console.log(bodyData);

      await axios({
        url: "http://127.0.0.1:8000/payment/paying",
        method: "POST",
        data: bodyData,
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          console.log(bodyData);
          if (res.status === "Paid") {
            myPayments();
            if (bodyDatas.type === "Rent") {
              setRent(false);
            } else if (bodyDatas.type === "Upfront") {
              setUpfront(false);
            } else if (bodyDatas.type === "BatchShift") {
              setShiftpay(false);
            }
            else if (bodyDatas.type === "Fine") {
              setFinepay(false);
            }
          } else {
            if (bodyDatas.type === "Rent") {
              showPayment();
            } else if (bodyDatas.type === "Upfront") {
              showUpFront();
            } else if (bodyDatas.type === "BatchShift") {
              showShiftPayment();
            }
            else if (bodyDatas.type === "Fine") {
              showFinePayment();
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const [mypay, setMypay] = useState(false);

  const myPayments = async () => {
    await axios
      .get("http://127.0.0.1:8000/payment/myPayments", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        setMypay(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [allpending, setAllpending] = useState(false);

  const allPendingPayments = async () => {
    await axios
      .get("http://127.0.0.1:8000/payment/pending", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        console.log(res.data);
        setAllpending(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [allpaid, setAllpaid] = useState(false);

  const allCompletedPayments = async () => {
    await axios
      .get("http://127.0.0.1:8000/payment/completed", {
        headers: { Authorization: `Bearer ${authTokens.access}` },
      })
      .then((res) => {
        console.log(res.data);
        console.log("Hello");
        setAllpaid(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cashpaid = async (id) => {
    await axios
      .post(
        "http://127.0.0.1:8000/payment/cashpaid",
        {
          id: id,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        allPendingPayments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const folderSubmit = async (data) => {
    await axios.post("http://127.0.0.1:8000/manifest/folder/submit", data, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    });
  }

  const sendForm = async (id,amount) => {
    await axios
      .post(
        "http://127.0.0.1:8000/payment/sendform",
        {
          id: id,
          amount: amount,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        allPendingPayments();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [allLocations, setAllLocations] = useState(null);

  const getLocations = async () => {
    await axios
      .get("http://127.0.0.1:8000/user/getLocations", {})
      .then((res) => {
        console.log(res.data);
        setAllLocations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [allBranches, setAllBranches] = useState(null);
  const [branchid, setBranchid] = useState(null);


  const getBranch = async () => {
    // console.log("Inside");
    // await axios
    //   .post(
    //     "http://127.0.0.1:8000/user/getBranches",
    //     {
    //       location: LocationId,
    //     },
    //     {}
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setAllBranches(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const [branchStudents, setBranchStudents] = useState(null);

  const getBranchStudents = async () => {
    await axios
      .post(
        "http://127.0.0.1:8000/user/getBatchStudents",
        {
          branch: branchid,
        },
        {
          headers: { Authorization: `Bearer ${authTokens.access}` },
        }
      )
      .then((res) => {
        setBranchStudents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLeads = async () => {
    await axios.post("http://127.0.0.1:8000/admins/view/leads", {}, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
      }).then((res) => {
        console.log(res.data);
        setLeads(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  const createLead = async (data) => {
    await axios.post("http://127.0.0.1:8000/admins/create/lead", data, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then((res) => {
      console.log(res.data);
      getLeads();
    }).catch((err) => {
      console.log(err);
    })
  }

  const deleteLead = async (id) => {
    await axios.post("http://127.0.0.1:8000/admins/delete/lead", {
      id: id,
    }, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then((res) => {
      console.log(res.data);
      getLeads();
    }).catch((err) => {
      console.log(err);
    })
  }

  const updatePlacementProfile = async (data) => {
    await axios.post("http://127.0.0.1:8000/student/update/placement", data, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }

  const getPlacementProfile = async (id) => {
    await axios.post("http://127.0.0.1:8000/student/view/placement", {
      student: id,
    }, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then((res) => {
      console.log(res.data);
      setPlacement(res.data.placement);
      setEducation(res.data.education);
    }).catch((err) => {
      console.log(err);
    })
  }


  const contextData = {
    signupUser,
    updateProfile,
    getStudentTasks,
    getStudentManifest,
    getDomains,
    loginUser,
    logoutUser,
    studentTasks,
    studentManifest,
    domains,
    errUser,
    profile,
    user,
    swap,
    setSwap,
    swap2,
    setSwap2,
    setCurr_manifest,
    setCurr_group,
    setCurr_student,
    getReviewers,
    curr_manifest,
    curr_group,
    curr_student,
    reviewers,
    setStudentManifest,
    getMyProfile,
    authTokens,
    setProfile,
    showPayment,
    amount,
    status,
    getChartData,
    chartData,
    isLinkValid,
    setSignUpBatch,
    signUpBatch,
    // <<<<<<< HEAD
    // =======
    getNotificationsTypes,
    createNotifications,
    types,
    deleteNotifications,
    rent,
    shiftpay,
    upfront,
    showShiftPayment,
    showUpFront,
    upfrontamount,
    finepay,
    upfrontstatus,
    fineamount,
    finestatus,
    fineid,
    shiftamount,
    shiftstatus,
    loadScript,
    displayRazorpay,
    rentid,
    upfrontid,
    shiftid,
    myPayments,
    showFinePayment,
    mypay,
    allpending,
    allPendingPayments,
    cashpaid,
    sendForm,
    allpaid,
    allCompletedPayments,
    getPendings,
    pendings,
    backendUpdate,
    allLocations,
    setAllLocations,
    getLocations,
    getBranch,
    allBranches,
    branchStudents,
    getBranchStudents,
    setBranchid,
    getBatches,
    setBatches,
    batches,
    folderSubmit,
    setAllBranches,
    setSelectedPlace,
    leads,
    setLeads,
    createLead,
    deleteLead,
    getLeads,
    getNotifications,
    notifications,
    education,
    placement,
    updatePlacementProfile,
    getPlacementProfile,
    reset_password,
    reset_password_confirm,
    deletePendings,

  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
