import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
// import Students from "../assets/students.svg";
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                {/* <Grid item xs={12} md={6}>
                    <StyledImage src={Students} alt="students" />
                </Grid> */}
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <StyledTitle>
                            Welcome to
                            <br />
                            School Management
                            <br />
                            System
                        </StyledTitle>
                        <StyledText>
                            Streamline school management, class organization, and add students and faculty.
                            Seamlessly track attendance, assess performance, and provide feedback.
                            Access records, view marks, and communicate effortlessly.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <StyledBlueButton variant="contained" fullWidth>
                                    Login
                                </StyledBlueButton>
                            </StyledLink>
                            <StyledLink to="/chooseasguest">
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    sx={{
                                        mt: 2,
                                        mb: 3,
                                        color: "#00b4d8", 
                                        borderColor: "#00b4d8",
                                        '&:hover': { backgroundColor: '#e0f7fa' }
                                    }}
                                >
                                    Login as Guest
                                </Button>
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <StyledSignUpLink to="/Adminregister">
                                    Sign up
                                </StyledSignUpLink>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

// Styled Components
const StyledContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const StyledPaper = styled.div`
  padding: 32px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledImage = styled.img`
  width: 100%;
  max-width: 500px;
  margin-bottom: 24px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const StyledTitle = styled.h1`
  font-size: 2.8rem;
  color: #0077b6;
  font-weight: 700;
  margin-bottom: 24px;
  text-align: center;
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

const StyledText = styled.p`
  color: #2a2a2a;
  font-size: 1.1rem;
  margin: 24px 0;
  line-height: 1.7;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledSignUpLink = styled(Link)`
  color: #00b4d8;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

const StyledBlueButton = styled(LightPurpleButton)`
  background-color: #0077b6;
  &:hover {
    background-color: #005f91;
  }
`;
