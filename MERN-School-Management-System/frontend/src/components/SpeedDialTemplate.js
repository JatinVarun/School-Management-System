import React from 'react';
import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <CustomSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<TuneIcon />}
            direction="left"
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={action.action}
                />
            ))}
        </CustomSpeedDial>
    );
};

export default SpeedDialTemplate;

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #004d40; /* Updated background color */
    color: white; /* Text/icon color */
    
    &:hover {
      background-color: #00695c; /* Updated hover color */
    }

    &:active {
      background-color: #003d33; /* Added active state color */
    }

    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3); /* Box shadow for depth */
    transition: background-color 0.3s ease-in-out; /* Smooth transition for hover effect */
  }
`;
