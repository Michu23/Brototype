import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AuthContext from '../../../Context/AuthContext';
import { Link } from 'react-router-dom';
import Navs from './Navs';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import GroupIcon from '@mui/icons-material/Group';
import DnsIcon from '@mui/icons-material/Dns';
import SchoolIcon from '@mui/icons-material/School';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';


export default function SwipeableTemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const { user } = React.useContext(AuthContext);


  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
         {user.position === 'Lead' && (
<>
<Divider />

    <Navs title ="Home" link="/lead" icon={<HomeIcon  />}  />
    <Navs title ="Batches" link="/lead/batch" icon={<BatchPredictionIcon   />}  />
    <Navs title ="Domains" link="/lead/domain" icon={<DnsIcon  />}  />
    <Navs title ="Advisors" link="/lead/advisors" icon={<CastForEducationIcon  />}  />
    <Navs title ="Groups" link="/lead/groups" icon={<GroupIcon  />}  />
    <Navs title ="Students" link="/lead/students" icon={<SchoolIcon  />}  />
    <Navs title ="Requests" link="/lead/requests" icon={<QuestionMarkIcon  />}  />
    <Divider />
    <Navs title ="Payments" link="/lead/payments" icon={<CurrencyRupeeIcon  />}  />
    <Navs title ="Placements" link="/lead/placements" icon={<WorkspacePremiumIcon  />}  />
</>
         )}

          {user.position === 'Advisor' && (
            <>
    <Divider />

    <Navs title ="Home" link="/advisor" icon={<HomeIcon   />}  />
    <Navs title ="Profile" link="/advisor/profile" icon={<AccountCircleIcon   />}  />
    <Navs title ="My students" link="/advisor/students" icon={<SchoolIcon   />}  />
    <Navs title ="My Work" link="/advisor/work" icon={<GroupIcon   />}  />
    <Navs title ="Students" link="/advisor/allStudents" icon={<SchoolIcon   />}  />
    <Divider />

            </>
          )}

          {user.position === 'Student' && (
            <>
    <Divider />

    <Navs title ="Home" link="/" icon={<HomeIcon />}  />
    <Navs title ="Profile" link="/profile" icon={<AccountCircleIcon   />}  />
    <Navs title ="My Tasks" link="/taskslist" icon={<TaskAltIcon   />}  />
    <Navs title ="My Payments" link="/payment" icon={<CurrencyRupeeIcon   />}  />
    <Navs title ="Leave application" link="/" icon={<TimeToLeaveIcon   />}  />
    <Divider />

            </>
          )}
      </List>
      
      <Divider />
      
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><div id="menuToggle">
              <input type="checkbox" />
              <span></span>
              <span></span>
              <span></span></div></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
