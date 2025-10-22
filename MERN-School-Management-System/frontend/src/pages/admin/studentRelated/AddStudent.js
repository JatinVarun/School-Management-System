import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/userRelated/userHandle';
import Popup from '../../../components/Popup';
import { underControl } from '../../../redux/userRelated/userSlice';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { CircularProgress, Box } from '@mui/material';
import styled from 'styled-components';

const AddStudent = ({ situation }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error } = userState;
    const { sclassesList } = useSelector((state) => state.sclass);

    const [name, setName] = useState('');
    const [rollNum, setRollNum] = useState('');
    const [password, setPassword] = useState('');
    const [className, setClassName] = useState('');
    const [sclassName, setSclassName] = useState('');

    const adminID = currentUser._id;
    const role = "Student";
    const attendance = [];

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Class") {
            setSclassName(params.id);
        }
    }, [params.id, situation]);

    useEffect(() => {
        dispatch(getAllSclasses(adminID, "Sclass"));
    }, [adminID, dispatch]);

    const changeHandler = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'Select Class') {
            setClassName('Select Class');
            setSclassName('');
        } else {
            const selectedClass = sclassesList.find(classItem => classItem.sclassName === selectedValue);
            setClassName(selectedClass.sclassName);
            setSclassName(selectedClass._id);
        }
    };

    const fields = { name, rollNum, password, sclassName, adminID, role, attendance };

    const submitHandler = (event) => {
        event.preventDefault();
        if (sclassName === "") {
            setMessage("Please select a classname");
            setShowPopup(true);
        } else {
            setLoader(true);
            dispatch(registerUser(fields, role));
        }
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate(-1);
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <Container>
            <FormContainer>
                <form className="registerForm" onSubmit={submitHandler}>
                    <Title>Add Student</Title>
                    <Label>Name</Label>
                    <Input
                        type="text"
                        placeholder="Enter student's name..."
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        autoComplete="name"
                        required
                    />

                    {situation === "Student" && (
                        <>
                            <Label>Class</Label>
                            <Select value={className} onChange={changeHandler} required>
                                <option value='Select Class'>Select Class</option>
                                {sclassesList.map((classItem, index) => (
                                    <option key={index} value={classItem.sclassName}>
                                        {classItem.sclassName}
                                    </option>
                                ))}
                            </Select>
                        </>
                    )}

                    <Label>Roll Number</Label>
                    <Input
                        type="number"
                        placeholder="Enter student's Roll Number..."
                        value={rollNum}
                        onChange={(event) => setRollNum(event.target.value)}
                        required
                    />

                    <Label>Password</Label>
                    <Input
                        type="password"
                        placeholder="Enter student's password..."
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        autoComplete="new-password"
                        required
                    />

                    <SubmitButton type="submit" disabled={loader}>
                        {loader ? <CircularProgress size={24} color="inherit" /> : 'Add'}
                    </SubmitButton>
                </form>
            </FormContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default AddStudent;

const Container = styled.div`
    padding: 16px;
    background-color: #f0f0f0; /* Light background for contrast */
    min-height: 100vh; /* Full height to ensure proper spacing */
`;

const FormContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Title = styled.span`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
    display: block;
    text-align: center;
`;

const Label = styled.label`
    display: block;
    margin: 12px 0 4px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 16px;
    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #007bff; /* Bootstrap primary color */
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    &:disabled {
        background-color: #ccc; /* Gray when disabled */
    }
`;
