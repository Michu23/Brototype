
import { Row, Col } from "react-bootstrap";

import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Radar, Line, Doughnut, Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    BarElement,
    Title,
    Filler,
    Tooltip,
    Legend
  );

function RadarChart({data}) {
    const datas = {
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            data: data.data,
            backgroundColor: data.bgColor,
            borderColor: data.brColor,
            borderWidth: data.brWidth,
          },
        ],
      };
    return (
        <div>
        <Radar data={datas} />
        </div>
    )
}
function DoughnutChart({data}) {
    const datas = {
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            data: data.data,
            backgroundColor: data.bgColor,
            borderColor: data.brColor,
            borderWidth: data.brWidth,
          },
        ],
      };
    return (
        <div>
        <Doughnut data={datas} />
        </div>
    )
}
function PieChart({data}) {
    const datas = {
        labels: data.labels,
        datasets: [
          {
            label: data.label,
            data: data.data,
            backgroundColor: data.bgColor,
            borderColor: data.brColor,
            borderWidth: data.brWidth,
          },
        ],
      };
    return (
        <div>
        <Pie data={datas} />
        </div>
    )
}
function LineChart({data}) {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: data.title,
          fullSize: true,
          font: {
            size: 20
        }
        },
      },
    };
    const datas = {
      labels:data.labels,
      datasets: data.data
    };
    return (
        <div>
        <Line data={datas} options={options} />
        </div>
    )
}
function BarChart({data}) {
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: data.title,
          fullSize: true,
          font: {
            size: 20
        }
        },
      },
    };
    const datas = {
      labels: data.labels,
      datasets: data.data,
    };
    return (
        <div>
        <Bar data={datas} options={options} />
        </div>
    )
}
function Chart({data}) {
    return(
    data.map((item) => {
        if (item.type === 'radar') {
            return 
            (<Col md={6} className="bg my-3 rounded-3 p-2">
              <RadarChart data={item.data} />
              </Col>)
        } else if (item.type === 'doughnut') {
          return
          (<Col md={6} className="bg my-3 rounded-3 p-2">
             <DoughnutChart data={item.data} />
              </Col>)
        } else if (item.type === 'pie') {
            return (
              <Col md={5} className="bg my-3 rounded-3 p-4 mx-4">
                <PieChart data={item.data}/>
              </Col>
            )
        } else if (item.type === 'line') {
            return (
            <Row  className="bg my-3 rounded-3 p-2">
            <LineChart data={item.data} />
            </Row>
            )
        } else if (item.type === 'bar') {
            return (
            <Col className="bg my-3 rounded-3 p-2"><BarChart data={item.data} /></Col>
            )
        }
    }))
}

export default Chart

