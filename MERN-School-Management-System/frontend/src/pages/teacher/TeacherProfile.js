import React from 'react';
import styled from 'styled-components';
import { Card, CardContent, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const TeacherProfile = () => {
  const { currentUser, response, error } = useSelector((state) => state.user);

  // Log response or error for debugging
  if (response) { 
    console.log(response);
  } else if (error) { 
    console.log(error); 
  }

  // Extracting relevant data
  const teachSclass = currentUser.teachSclass;
  const teachSubject = currentUser.teachSubject;
  const teachSchool = currentUser.school;

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileCardContent>
          <ProfileText variant="h5">Name: {currentUser.name}</ProfileText>
          <ProfileText variant="body1">Email: {currentUser.email}</ProfileText>
          <ProfileText variant="body1">Class: {teachSclass.sclassName}</ProfileText>
          <ProfileText variant="body1">Subject: {teachSubject.subName}</ProfileText>
          <ProfileText variant="body1">School: {teachSchool.schoolName}</ProfileText>
        </ProfileCardContent>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default TeacherProfile;

// Styled components
const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Center the card vertically */
  background: linear-gradient(to bottom, #f0f0f0, #e0e0e0); /* Background color */
`;

const ProfileCard = styled(Card)`
  margin: 20px;
  width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Shadow for depth */
`;

const ProfileCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileText = styled(Typography)`
  margin: 10px 0; /* Consistent vertical margin */
  color: #333; /* Darker text for better contrast */
`;

