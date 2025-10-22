import React from 'react';
import styled from 'styled-components';

const ErrorPage = () => {
    return (
        <Container>
            <Content>
                <Heading>Oops, something went wrong</Heading>
                <Text>
                    We apologize for the inconvenience. Our website is currently experiencing technical difficulties. Please check back later.
                </Text>
            </Content>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: "Josefin Sans", sans-serif;
  background-image: url('https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  color: #f5f5f5;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  max-width: 700px;
  padding: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
  color: #ff4040;
  text-transform: uppercase;
`;

const Text = styled.p`
  font-size: 20px;
  line-height: 1.8;
  color: #e0e0e0;
`;

export default ErrorPage;
