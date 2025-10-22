import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../redux/userRelated/userSlice';
import styled from 'styled-components';

const Logout = () => {
    const currentUser = useSelector(state => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(authLogout());
        navigate('/');
    };

    const handleCancel = () => {
        navigate(-1);
    };

    return (
        <LogoutContainer>
            <Heading>{currentUser.name}</Heading>
            <LogoutMessage>Are you sure you want to log out?</LogoutMessage>
            <ButtonContainer>
                <LogoutButtonLogout onClick={handleLogout}>Log Out</LogoutButtonLogout>
                <LogoutButtonCancel onClick={handleCancel}>Cancel</LogoutButtonCancel>
            </ButtonContainer>
        </LogoutContainer>
    );
};

export default Logout;

const LogoutContainer = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background-color: rgba(133, 118, 159, 0.9);
  color: #333;
  width: 300px; /* Fixed width for better layout */
  margin: 0 auto; /* Center the component */
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
`;

const LogoutMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; /* Full width for buttons */
`;

const LogoutButton = styled.button`
  padding: 12px 20px;
  margin-top: 10px;
  border-radius: 5px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
  border: none; /* Remove default border */

  &:hover {
    opacity: 0.9; /* Slightly change opacity on hover */
  }
`;

const LogoutButtonLogout = styled(LogoutButton)`
  background-color: #e63946;
`;

const LogoutButtonCancel = styled(LogoutButton)`
  background-color: #4f4e4e;
`;

