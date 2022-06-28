import React from 'react'
import { Link } from 'react-router-dom'

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


const Navs = ({title,link,icon}) => {
  return (
    <>
<Link to={link}>
<ListItem disablePadding>
<ListItemButton>
  <ListItemIcon>
    {icon}
    {/* <InboxIcon />  */}
  </ListItemIcon>
  <ListItemText primary={title} />
</ListItemButton>
</ListItem>
</Link> 

    </>
  )
}

export default Navs