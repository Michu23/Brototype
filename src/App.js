// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//////////////########//////////////
import Profile from "./components/Common/Profile/Profile";
import Manifest from "./components/Common/Manifest/Manifest";
import Tasks from "./components/Common/Tasks/Tasks";
import Pending from "./components/Common/Pending/Pending";
import Notifications from "./components/Common/Notifications/Notifications";
import Signup from './pages/Home/Signup';
////////////////////////////////////

////////////////////////////////////
import Student from "./pages/User/Student";
import StudentSpace from "./components/User/Space/MySpace";
import MyPayment from "./components/User/Payment/Payment";
////////////////////////////////////

////////////////////////////////////
import Advisor from "./pages/Advisor/Advisor";
import MyGroup from "./components/Advisor/Group/Group";
import AdvisorSpace from "./components/Advisor/Space/MySpace";
import MyStudents from "./components/Advisor/Students/Students";
import Work from "./components/Advisor/Work/Work";
import AllStudents from "./components/Advisor/AllStudents/AllStudents"
////////////////////////////////////

////////////////////////////////////
import Lead from "./pages/Lead/Lead";
import Advisors from "./components/Staff/Advisors/Advisors";
import Batch from "./components/Staff/Batch/Batch";
import DomainComponent from "./components/Staff/Domain/Domain";
import Group from "./components/Staff/Groups/Groups";
import GroupManage from "./components/Staff/GroupManage/Groups";
import Payments from "./components/Staff/Payment/Payment";
import Placements from "./components/Staff/Placement/Placement";
import Students from "./components/Staff/Students/Students";
////////////////////////////////////
import Communication from "./pages/Communication/Communication";
////////////////////////////////////
import Finance from "./pages/Finance/Finance";
////////////////////////////////////
import Placement from "./pages/Placement/Placement";
////////////////////////////////////
import Admin from "./pages/Admin/Admin";
import AdminHome from "./components/SuperUser/Home/Home";
import AdminCreate from "./components/SuperUser/Create/Create";

//Context Providers
import { AuthProvider } from "./Context/AuthContext";
import { StyleProvider } from "./Context/StyleContext";
import { StudentProvider } from "./Context/StudentContext";
import { AdvisorProvider } from "./Context/AdvisorContext";
import { LeadProvider } from "./Context/LeadContext";

// import UserLogin from "./pages/User/UserLogin/UserLogin";
// import UserReg from "./pages/User/UserLogin/UserReg";

import "./App.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from "./pages/Home/Home";
import Requests from "./components/Staff/Requests/Requests";
import PlacementProfile from "./components/Staff/Placement/PlacementProfile";
import Location from "./components/Advisor/Attendance/Location";
import Branches from "./components/Advisor/Attendance/Branch";
import BranchStudents from "./components/Advisor/Attendance/Students";

function App() {
  return (
    <>
      <BrowserRouter>
        <StyleProvider>
          <AuthProvider>
            <StudentProvider>
              <Routes>
                <Route path="/signin" element={<Home />} />
                <Route path="/signup/:link" element={<Signup />} />
                <Route
                  path="/"
                  element={<Student child={<StudentSpace />} />}
                />
                <Route
                  path="/taskslist"
                  element={
                    <Student
                      child={
                        <>
                          <Tasks />
                          <Pending />
                        </>
                      }
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={<Student child={<Profile />} />}
                />
                <Route
                  path="/payment"
                  element={<Student child={<MyPayment />} />}
                />
                <Route
                  path="/notifications"
                  element={<Student child={<Notifications />} />}
                />
              </Routes>
              <AdvisorProvider>
                <Routes>
                  <Route
                    path="/manifest"
                    element={
                      <Student
                        child={
                          <>
                            <Manifest />
                            <Pending />
                          </>
                        }
                      />
                    }
                  />
                </Routes>
              </AdvisorProvider>
            </StudentProvider>
            <ToastContainer />

            {/* ADVISOR */}
            <AdvisorProvider>
              <Routes>
                <Route
                  path="/advisor"
                  element={<Advisor child={<AdvisorSpace />} />}
                />
                <Route
                  path="/advisor/profile"
                  element={<Advisor child={<Profile />} />}
                />
                <Route
                  path="/advisor/students"
                  element={<Advisor child={<MyStudents />} />}
                />
                <Route
                  path="/Advisor/notifications"
                  element={<Advisor child={<Notifications />} />}
                />
                <Route
                  path="/advisor/work"
                  element={<Advisor child={<Work />} />}
                />
                <Route
                  path="/advisor/location"
                  element={<Advisor child={<Location />} />}
                />
                <Route
                  path="/advisor/branches"
                  element={<Advisor child={<Branches />} />}
                />
                <Route
                  path="/advisor/branches/students"
                  element={<Advisor child={<BranchStudents />} />}
                />
                <Route
                  path="/advisor/group"
                  element={<Advisor child={<MyGroup />} />}
                />
                <Route
                  path="/advisor/group/taskslist"
                  element={<Advisor child={<><Tasks /><Pending /></>} />}
                />
                <Route
                  path="/advisor/group/manifest"
                  element={
                    <Advisor child={<><Manifest /><Pending /></>}/>
                  }
                />
              </Routes>
              <LeadProvider>
                <Routes>
                  <Route
                    path="/advisor/allStudents"
                    element={<Advisor child={<AllStudents />} />}
                  />
                </Routes>
              </LeadProvider>
            </AdvisorProvider>

            {/* LEAD */}
            <LeadProvider>
              <Routes>
                <Route
                  path="/lead"
                  element={
                    <Lead child={<AdvisorSpace />}/>
                  }
                />
                <Route
                  path="/lead/payments"
                  element={
                    <Lead child={<Payments />}/>
                  }
                />
                <Route
                  path="/lead/batch"
                  element={
                    <Lead child={<Batch />}/>
                  }
                />
                <Route
                  path="/lead/domain"
                  element={
                    <Lead child={<DomainComponent />}/>
                  }
                />
                <Route
                  path="/lead/students"
                  element={
                    <Lead child={<Students />}/>
                  }
                />
                <Route
                  path="/lead/student/profile"
                  element={
                    <Lead child={<Profile by="student" />}/>
                  }
                />
                <Route
                  path="/Lead/notifications"
                  element={<Lead child={<Notifications />} />}
                />
                <Route
                  path="/lead/groups"
                  element={
                    <Lead child={<Group />}/>
                  }
                />
                <Route
                  path="/lead/groups/manage"
                  element={
                    <Lead child={<GroupManage />}/>
                  }
                />
                <Route
                  path="/lead/advisors"
                  element={
                    <Lead child={<Advisors />}/>
                  }
                />
                <Route
                  path="/lead/advisor/profile"
                  element={
                    <Lead child={<Profile by="advisor" />}/>
                  }
                />
                <Route
                  path="/lead/placements"
                  element={
                    <Lead child={<Placements />}/>
                  }
                />
                <Route
                  path="/lead/placements/info"
                  element={
                    <Lead child={<PlacementProfile />}/>
                  }
                />
                <Route
                  path="/lead/requests"
                  element={
                    <Lead child={<Requests />}/>
                  }
                />
                <Route
                  path="/finance"
                  element={
                    <Finance child={<AdvisorSpace />}/>
                  }
                />
                <Route
                  path="/finance/payments"
                  element={
                    <Finance child={<Payments />}/>
                  }
                />
                <Route
                  path="/Finance/notifications"
                  element={<Finance child={<Notifications />} />}
                />
                <Route
                  path="/placement"
                  element={
                    <Placement child={<AdvisorSpace />}/>
                  }
                />
                <Route
                  path="/placement/placements"
                  element={
                    <Placement child={<Placements />}/>
                  }
                />
                <Route
                  path="/placement/placements/info"
                  element={
                    <Placement child={<PlacementProfile />}/>
                  }
                />
                <Route
                  path="/Placement/notifications"
                  element={<Placement child={<Notifications />} />}
                />
              </Routes>
              <AdvisorProvider>
                <Routes>
                <Route
                  path="/lead/students/taskslist"
                  element={<Lead child={
                  <>
                    <Tasks />
                    <Pending />
                  </>
                } />}
                />
                <Route
                  path="/lead/student/manifest"
                  element={
                    <Lead child={
                      <>
                        <Manifest />
                        <Pending />
                      </>
                    }/>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <Admin child={<AdminHome />}/>
                  }
                />
                <Route
                  path="/admin/create/lead"
                  element={
                    <Admin child={<AdminCreate />}/>
                  }
                />
                <Route
                  path="/Admin/notifications"
                  element={<Admin child={<Notifications />} />}
                />
                </Routes>
              </AdvisorProvider>
            </LeadProvider>
          </AuthProvider>
        </StyleProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
