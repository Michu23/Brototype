//Bootstrap
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import style from "./Notification.module.css"
import style from "./Notification.module.css";
import { FaBell } from 'react-icons/fa'
import { useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import {Link} from 'react-router-dom'


function Notification() {

  const { notifications, user } = useContext(AuthContext);

  return (
    <Row className="m-0 rounded-3 py-4  ">
      <Col className={style.notification}>
        <h5 className="ms-3 mb-3">Notifications <FaBell/></h5>
      </Col>

      {notifications && notifications.slice(0,2).map((notification, index) => {
        return (
          <Col
            className={`text-center ${style.hoverdiv}  cp pt-4`}
            xs={12}
            key={index}
          >
            <Row className="m-0">
              <Col xs={2}>
                <svg height={30} width={30} >
                  <circle cx="15" cy="15" r="15" className={`vertical ${
                    notification.type === "Placement"
                      ? `bggreen`
                      : notification.type === "Message"
                      ? `bgyellow`
                      : notification.type === "Termination"
                      ? `bgred`
                      : notification.type === "AdvisorChange"
                      ? `bgblue`
                      : notification.type === "BatchShift"
                      ? `bginfo`
                      : `bginfo`
                  }`} />
                </svg>
              </Col>
              <Col className="text-start" xs={10}>
                <h6 className="m-0">{notification.type}</h6>
                <p>{notification.content}</p>
              </Col>
            </Row>
          </Col>
        )})}

      <Col
        className={`text-center ${style.hoverdiv}  cp pt-4`}
        xs={12}
      >
        <Row className="m-0">
          <Col className="text-center pb-3" xs={12}>
            <Link to={`${ user.position ==="Student" ? "/notifications" : `/${user.position}/notifications`}`}><h6 className="m-0">See all</h6></Link>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Notification;
