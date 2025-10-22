import * as React from 'react';
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment';

const StudentSideBar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <>
            <React.Fragment>
                <ListItemButton component={Link} to="/" selected={isActive("/")}>
                    <ListItemIcon>
                        <HomeIcon color={isActive("/") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/subjects" selected={isActive("/Student/subjects")}>
                    <ListItemIcon>
                        <AssignmentIcon color={isActive("/Student/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/attendance" selected={isActive("/Student/attendance")}>
                    <ListItemIcon>
                        <ClassOutlinedIcon color={isActive("/Student/attendance") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Attendance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/Student/complain" selected={isActive("/Student/complain")}>
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={isActive("/Student/complain") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complain" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/Student/profile" selected={isActive("/Student/profile")}>
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={isActive("/Student/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/logout" selected={isActive("/logout")}>
                    <ListItemIcon>
                        <ExitToAppIcon color={isActive("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    );
};

export default StudentSideBar;
