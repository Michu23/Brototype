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
<ListItem className='bg textdark' disablePadding>
<ListItemButton className='bg textdark' >
  <ListItemIcon className='bg textdark' >
    {icon}
  </ListItemIcon>
  <ListItemText  className='bg textdark'  primary={title} />
</ListItemButton>
</ListItem>
</Link> 

    </>
  )
}

export default Navs