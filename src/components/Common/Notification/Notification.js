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
    <>
    <Row className="m-0 rounded-3 py-4  ">
      <Col className={style.notification}>
        <h5 className="ms-3 mb-3">Notifications <FaBell/></h5>
      </Col>
      </Row>
      <Row className="nots">

      {notifications && notifications.slice(0,5).map((notification, index) => {
        return (
          <Col
            className={`text-center ${style.hoverdiv}  cp pt-4`}
            xs={12}
            key={index}
          >
            <Row className="m-0">
              <Col xs={2}>
              <div
                  className={`vertical ${
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
                  }`}
                ></div>
              </Col>
              <Col className="text-start" xs={10}>
                <h6 className="m-0">{notification.type}</h6>
                <p>{notification.content}</p>
              </Col>
            </Row>
          </Col>
        )})}
        </Row>
        <Row>

      <Col
        className={`text-center ${style.hoverdiv}  cp ms-2 mt-2 pt-4`}
        xs={12}
      >
        <Row className="m-0">
          <Col className="text-center pb-3 mb-2" xs={12} onClick={()=>{
            window.scrollTo({
              top: 0,
              behavior: "smooth",
          });
          }}>
            <Link to={`${ user.position ==="Student" ? "/notifications" : `/${user.position}/notifications`}`} ><h6 className="m-0">See all</h6></Link>
          </Col>
        </Row>
      </Col>
    </Row>
    </>
  );
}

export default Notification;
