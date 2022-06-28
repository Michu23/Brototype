import React, { useContext, useEffect } from "react";
import { Row,Col } from "react-bootstrap";
import './MySpace.css'
import Chart from "../../Common/Chart/Chart";
import AuthContext from "../../../Context/AuthContext";
import Accordion from './SimpleAccordion'

const MySpace = () => {
  const { chartData, getChartData, getNotifications } = useContext(AuthContext);
  useEffect(() => {
    getChartData();
    getNotifications()
  },[]);
  return (
    <div>
      {chartData && (
      <Row className="mt-5 col-11 chartspage">
        <Row>
          <Col md={6}></Col>
          <Col md={6}>
            <Accordion/>
          </Col>
        </Row>
        <div className="p-0 m-0 mb-4">
        <h2 className="text-center">My Charts</h2>
        <Chart data={chartData}/>
        </div>
      </Row>)}
    </div>
  );
};

export default MySpace;
// Radar (labels, label, data, bgColor, borderColor, borderWidth)
// Doughnut (labels, label, data, bgColor, borderColor, borderWidth)
// Line (labels, label, data, bgColor, borderColor, title)
// Bar (labels, label, data, bgColor, borderColor)
// Pie (labels, label, data, bgColor, borderColor, borderWidth)
