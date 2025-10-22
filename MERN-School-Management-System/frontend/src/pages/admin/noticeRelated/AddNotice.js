import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, TextField, Button } from '@mui/material';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, dispatch]);

  return (
    <>
      <Container>
        <Form onSubmit={submitHandler}>
          <Title>Add Notice</Title>
          <StyledTextField
            label="Title"
            variant="outlined"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <StyledTextField
            label="Details"
            variant="outlined"
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required
          />
          <StyledTextField
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loader}>
            {loader ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Add'
            )}
          </SubmitButton>
        </Form>
      </Container>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
    </>
  );
};

export default AddNotice;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f0f0; /* Light background for contrast */
  padding: 16px;
`;

const Form = styled.form`
  background: white;
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px; /* Responsive max-width */
`;

const Title = styled.h2`
  margin-bottom: 24px;
  text-align: center;
  font-size: 1.5rem;
  color: #333; /* Darker text for better readability */
`;

const StyledTextField = styled(TextField)`
  margin: 12px 0; /* Better spacing between fields */
  & .MuiInputLabel-root {
    color: #666; /* Lighter label color */
  }
  & .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #007bff; /* Highlight color on focus */
    }
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  background-color: #007bff; /* Primary color */
  color: white;
  &:hover {
    background-color: #0056b3; /* Darker shade for hover */
  }
  width: 100%; /* Full-width button */
`;
