import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AuthContext from '../../../Context/AuthContext';
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


import Pro from './pro.jpg';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { logoutUser, user } = React.useContext(AuthContext);
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }} >
        
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="large"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={user? user.photo : Pro} sx={{ width: 40, height: 40 }} className="position-absolute"></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      {user &&

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',

              top: 10,
              right: 1,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        

        { user && user.position === 'Lead' && (
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

          {user && user.position === 'Advisor' && (
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

          {user && user.position === 'Student' && (
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
      
      <Divider />
        
        <MenuItem onClick={ logoutUser }>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        
      </Menu>}
    </React.Fragment>
  );
}
