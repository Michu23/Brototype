import React, { useContext } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AuthContext from '../../../Context/AuthContext';
import { useEffect } from 'react';

import Table from 'react-bootstrap/Table';

export default function SimpleAccordion() {
  const { userHomeDetailes, getUserHomeDetailes } = useContext(AuthContext);

  useEffect(() => {
    getUserHomeDetailes();
  }, []);
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>My pendings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {userHomeDetailes?.pendings?.map((pending, index) => {
                return (
                  <div>
                    {index + 1}.&nbsp; {pending.taskname}
                  </div>
                )})}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>My Batch</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {/* <Typography> */}
            <Table striped hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Week</th>
              </tr>
            </thead>
            <tbody>
            {userHomeDetailes?.students?.map((student, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.week}</td>
                  </tr>
                )})}
            </tbody>
            </Table>
          {/* </Typography> */}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}