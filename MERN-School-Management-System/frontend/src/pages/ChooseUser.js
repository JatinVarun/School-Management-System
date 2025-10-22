import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Container,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { AccountCircle, School, Group } from '@mui/icons-material';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/userRelated/userHandle';
import Popup from '../components/Popup';

const ChooseUser = ({ visitor }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = "zxc";

  const { status, currentUser, currentRole } = useSelector(state => state.user);

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigateHandler = (user) => {
    let fields = { password };

    if (user === "Admin") {
      if (visitor === "guest") {
        fields.email = "yogendra@12";
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Adminlogin');
      }
    } else if (user === "Student") {
      if (visitor === "guest") {
        fields.rollNum = "1";
        fields.studentName = "Dipesh Awasthi";
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Studentlogin');
      }
    } else if (user === "Teacher") {
      if (visitor === "guest") {
        fields.email = "tony@12";
        setLoader(true);
        dispatch(loginUser(fields, user));
      } else {
        navigate('/Teacherlogin');
      }
    }
  };

  useEffect(() => {
    if (status === 'success' || currentUser !== null) {
      navigate(`/${currentRole}/dashboard`);
    } else if (status === 'error') {
      setLoader(false);
      setMessage("Network Error");
      setShowPopup(true);
    }
  }, [status, currentRole, navigate, currentUser]);

  return (
    <StyledContainer>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          {["Admin", "Student", "Teacher"].map((role) => (
            <Grid item xs={12} sm={6} md={4} key={role}>
              <div onClick={() => navigateHandler(role)}>
                <StyledPaper elevation={3}>
                  <Box mb={2}>
                    {role === "Admin" && <AccountCircle fontSize="large" />}
                    {role === "Student" && <School fontSize="large" />}
                    {role === "Teacher" && <Group fontSize="large" />}
                  </Box>
                  <StyledTypography>{role}</StyledTypography>
                  <StyledDescription>
                    {role === "Admin" && "Login as an administrator to access the dashboard to manage app data."}
                    {role === "Student" && "Login as a student to explore course materials and assignments."}
                    {role === "Teacher" && "Login as a teacher to create courses, assignments, and track student progress."}
                  </StyledDescription>
                </StyledPaper>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loader}
      >
        <CircularProgress color="inherit" />
        Please Wait
      </Backdrop>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </StyledContainer>
  );
};

export default ChooseUser;

const StyledContainer = styled.div`
  background: linear-gradient(to bottom, #002147, #000c1f);
  height: 120vh; /* Changed to 100vh if you want to fit the viewport */
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledPaper = styled(Paper)`
  padding: 20px;
  text-align: center;
  background-color: #1f1f38; /* Keeping the original background color of paper */
  color: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #2c2c6c;
    color: white;
  }
`;

const StyledTypography = styled.h2`
  margin-bottom: 10px;
  font-weight: bold; /* Added bold weight for better visibility */
`;

const StyledDescription = styled.p`
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
`;
