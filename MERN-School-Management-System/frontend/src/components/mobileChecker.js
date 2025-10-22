import React, { useState, useEffect } from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, styled } from '@mui/material';
import ActionMenu from './ActionMenu'; // Assuming ActionMenu is another component handling mobile view

const MyComponent = ({ row, actions }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
            setIsMobile(isMobileDevice);
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initialize on the first render
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            {isMobile ? (
                <ActionMenu row={row} actions={actions} />
            ) : (
                <StyledSpeedDial
                    ariaLabel="SpeedDial playground example"
                    icon={<SpeedDialIcon />}
                    direction="right"
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={action.action}
                        />
                    ))}
                </StyledSpeedDial>
            )}
        </>
    );
};

export default MyComponent;

const StyledSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #240439;
    color: #fff;
    &:hover {
      background-color: #440080;
    }
    &:active {
      background-color: #1a0031;
    }
    transition: background-color 0.3s ease-in-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;
