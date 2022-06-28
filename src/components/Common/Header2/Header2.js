import React, { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import "./Header2.css";
import Demo from "./demo";

import AccountMenu from "../Header/AccountMenu";
import AuthContext from "../../../Context/AuthContext";
import StyleContext from "../../../Context/StyleContext";

const Header2 = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const { darkmode, setDarkmode, successToast } = useContext(StyleContext);

  const handleDarkMode = (e) => {
    if (e.target.checked) {
      document.body.classList.add("dark");
      setDarkmode(true);
      successToast("Dark Mode Enabled");
    } else {
      document.body.classList.remove("dark");
      setDarkmode(false);
      successToast("Dark Mode Disabled");
    }
  };

  return (
    <div>
      <Row className="bg d-md-flex header2 d-lg-none bg d-flex justify-content-between">
        <div role="navigation">
          <Demo></Demo>
        </div>

        <div className="d-flex justify-content-end mb-3 px-3 p-0 position-absolute mt-3">
          <input type="checkbox" id="checkbox" onChange={handleDarkMode} />
          <AccountMenu />
        </div>
      </Row>
    </div>
  );
};

export default Header2;
