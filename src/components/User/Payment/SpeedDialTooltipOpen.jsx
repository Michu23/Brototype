import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GoogleIcon from '@mui/icons-material/Google';
import {SiPhonepe} from 'react-icons/si';
import {SiPaytm} from 'react-icons/si';
import StyleContext from '../../../Context/StyleContext';


const actions = [
  { icon: <GoogleIcon />, name: 'Google pay'  },
  { icon: <SiPhonepe size={70} fill="bgdark"  />, name: 'Phonepe' },
  { icon: <SiPaytm size={28} stroke="bgdark" />, name: 'PayTm' },
  { icon: <CurrencyRupeeIcon />, name: 'Cash' },
];

export default function SpeedDialTooltipOpen({func, ...props}) {

    console.log(props);
    console.log(func);

    const {infoToast} = React.useContext(StyleContext);

  return (
    <Box sx={{ height: 0, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 30 }}
        icon={<CurrencyRupeeIcon size={28} className='textlight' />}
        direction="left"
        text="Open"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
                if (action.name === 'Cash') {
                    infoToast('Payment will be counted as paid when the cash is received');
                
                } else {
                    func(props.amount,props.type,props.id);

                }

            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
