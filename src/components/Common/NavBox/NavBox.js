//Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./NavBox.module.css";
import { Link } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import { useContext } from "react";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import GroupIcon from "@mui/icons-material/Group";
import DnsIcon from "@mui/icons-material/Dns";
import SchoolIcon from "@mui/icons-material/School";
import CastForEducationIcon from "@mui/icons-material/CastForEducation";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import Navs from "./Navs";
import Divider from "@mui/material/Divider";

function NavBox() {
  const { user } = useContext(AuthContext);

  return (
    <Row className="m-0 rounded-3 py-4">
      {(user.position === "Lead" || user.position === "Admin") && (
        <>
          <Navs title="Home" link="/lead" icon={<HomeIcon />} />
          <Navs
            title="Location"
            link="/lead/location"
            icon={<BatchPredictionIcon  className="textdark" />}
          />
          <Navs
            title="Batches"
            link="/lead/batch"
            icon={<BatchPredictionIcon  className="textdark" />}
          />
          <Navs title="Domains" link="/lead/domain" icon={<DnsIcon className="textdark"  />} />
          <Navs
            title="Advisors"
            link="/lead/advisors"
            icon={<CastForEducationIcon className="textdark"  />}
          />
          <Navs
            title="Reviews"
            link="/lead/reviews"
            icon={<CastForEducationIcon className="textdark"  />}
          />
          <Navs title="Groups" link="/lead/groups" icon={<GroupIcon className="textdark"  />} />
          <Navs title="Students" link="/lead/students" icon={<SchoolIcon  className="textdark" />} />
          <Navs
            title="Requests"
            link="/lead/requests"
            icon={<QuestionMarkIcon className="textdark"  />}
          />
          <Navs
            title="Payments"
            link="/lead/payments"
            icon={<CurrencyRupeeIcon className="textdark" />}
          />
          <Navs
            title="Placements"
            link="/lead/placements"
            icon={<WorkspacePremiumIcon  className="textdark" />}
          />
        </>
      )}

      {user.position === "Finance" && (
        <>
          <Navs title="Home" link="/finance" icon={<HomeIcon  className="textdark" />} />
          <Navs
            title="Payments"
            link="/finance/payments"
            icon={<CurrencyRupeeIcon  className="textdark" />}
          />
        </>
      )}

      {user.position === "Placement" && (
        <>
          <Navs title="Home" link="/placement" icon={<HomeIcon  className="textdark" />} />
          <Navs
            title="Placements"
            link="/placement/placements"
            icon={<WorkspacePremiumIcon  className="textdark" />}
          />
          <Navs
            title="Students"
            link="/placement/students"
            icon={<HomeIcon  className="textdark" />}
          />
        </>
      )}

      {user.position === "Admin" && (
        <Navs title="Leads" link="/admin" icon={<HomeIcon className="textdark"  />} />
      )}

      {user.position === "Advisor" && (
        <>
          <Navs title="Home" link="/advisor" icon={<HomeIcon className="textdark"  />} />
          <Navs
            title="Profile"
            link="/advisor/profile"
            icon={<AccountCircleIcon className="textdark"  />}
          />
          <Navs
            title="My students"
            link="/advisor/students"
            icon={<SchoolIcon  className="textdark" />}
          />
          <Navs title="My Work" link="/advisor/work" icon={<GroupIcon className="textdark"  />} />
          <Navs
            title="All Students"
            link="/advisor/allStudents"
            icon={<SchoolIcon  className="textdark" />}
          />
          <Navs
            title="Location"
            link="/advisor/location"
            icon={<SchoolIcon  className="textdark" />}
          />
        </>
      )}

      {user.position === "Student" && (
        <>
          <Navs title="Home" link="/" icon={<HomeIcon className="textdark"  />} />
          <Navs title="Profile" link="/profile" icon={<AccountCircleIcon  className="textdark" />} />
          <Navs title="My Tasks" link="/taskslist" icon={<TaskAltIcon className="textdark"  />} />
          <Navs
            title="My Payments"
            link="/payment"
            icon={<CurrencyRupeeIcon  className="textdark" />}
          />
        </>
      )}
    </Row>
  );
}

export default NavBox;
