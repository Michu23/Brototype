import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import style from "./NavBox.module.css";
import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const Navs = ({ link, title, icon }) => {
  return (
    <>
      <Link to={link}>
        <Col
          className={`pe-0 row m-0 justify-content-end text-center navdiv position-relative cp  ${style.navItems}`}
          xs={12}
        >
          <Col className="my-2 p-0" xs={11}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          </Col>
          <Col className="ps-2 " xs={1}>
            <div
              className={`px-2 ${(style.navSelected, style.navItems)}`}
            ></div>
          </Col>
        </Col>
      </Link>
    </>
  );
};

export default Navs;
