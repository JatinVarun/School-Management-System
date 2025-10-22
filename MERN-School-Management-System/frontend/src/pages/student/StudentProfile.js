import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography, Grid, Box, Avatar, Container, Paper } from '@mui/material';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
    const { currentUser, response, error } = useSelector((state) => state.user);

    if (response) { console.log(response); }
    else if (error) { console.log(error); }

    if (!currentUser) {
        return (
            <Container maxWidth="md">
                <Typography variant="h6" align="center" color="error">
                    No user data available. Please try again later.
                </Typography>
            </Container>
        );
    }

    const { name, rollNum, sclassName, school, dateOfBirth, gender, email, phone, address, emergencyContact } = currentUser;

    return (
        <Container maxWidth="md">
            <StyledPaper elevation={3}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Avatar alt="Student Avatar" sx={{ width: 150, height: 150 }}>
                                {String(name).charAt(0)}
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="h5" component="h2" textAlign="center">
                                {name}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="subtitle1" component="p" textAlign="center">
                                Student Roll No: {rollNum}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="subtitle1" component="p" textAlign="center">
                                Class: {sclassName.sclassName}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="center">
                            <Typography variant="subtitle1" component="p" textAlign="center">
                                School: {school.schoolName}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </StyledPaper>
            <Card>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Personal Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Date of Birth:</strong> {dateOfBirth || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Gender:</strong> {gender || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Email:</strong> {email || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Phone:</strong> {phone || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Address:</strong> {address || 'N/A'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="subtitle1" component="p">
                                <strong>Emergency Contact:</strong> {emergencyContact || 'N/A'}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default StudentProfile;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;
