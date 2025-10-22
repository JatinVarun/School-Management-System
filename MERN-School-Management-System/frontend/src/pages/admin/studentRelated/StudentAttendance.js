import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserDetails } from '../../../redux/userRelated/userHandle';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { updateStudentFields } from '../../../redux/studentRelated/studentHandle';

import {
    Box, InputLabel,
    MenuItem, Select,
    Typography, Stack,
    TextField, CircularProgress, FormControl
} from '@mui/material';
import { PurpleButton } from '../../../components/buttonStyles';
import Popup from '../../../components/Popup';
import styled from 'styled-components';

const StudentAttendance = ({ situation }) => {
    const dispatch = useDispatch();
    const { currentUser, userDetails, loading } = useSelector((state) => state.user);
    const { subjectsList } = useSelector((state) => state.sclass);
    const { response, error, statestatus } = useSelector((state) => state.student);
    const params = useParams();

    const [studentID, setStudentID] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [chosenSubName, setChosenSubName] = useState("");
    const [status, setStatus] = useState('');
    const [date, setDate] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        if (situation === "Student") {
            const stdID = params.id;
            setStudentID(stdID);
            dispatch(getUserDetails(stdID, "Student"));
        } else if (situation === "Subject") {
            const { studentID, subjectID } = params;
            setStudentID(studentID);
            dispatch(getUserDetails(studentID, "Student"));
            setChosenSubName(subjectID);
        }
    }, [situation, dispatch, params.id]);

    useEffect(() => {
        if (userDetails?.sclassName && situation === "Student") {
            dispatch(getSubjectList(userDetails.sclassName._id, "ClassSubjects"));
        }
    }, [dispatch, userDetails, situation]);

    const changeHandler = (event) => {
        const selectedSubject = subjectsList.find(
            (subject) => subject.subName === event.target.value
        );
        setSubjectName(selectedSubject.subName);
        setChosenSubName(selectedSubject._id);
    };

    const fields = { subName: chosenSubName, status, date };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(updateStudentFields(studentID, fields, "StudentAttendance"));
    };

    useEffect(() => {
        if (response) {
            setLoader(false);
            setShowPopup(true);
            setMessage(response);
        } else if (error) {
            setLoader(false);
            setShowPopup(true);
            setMessage("An error occurred. Please try again.");
        } else if (statestatus === "added") {
            setLoader(false);
            setShowPopup(true);
            setMessage("Attendance recorded successfully.");
        }
    }, [response, statestatus, error]);

    return (
        <Container>
            {loading ? (
                <LoadingText>Loading...</LoadingText>
            ) : (
                <ContentBox>
                    <Stack spacing={1} sx={{ mb: 3 }}>
                        <Typography variant="h4">Student Name: {userDetails.name}</Typography>
                        {currentUser.teachSubject && (
                            <Typography variant="h4">
                                Subject Name: {currentUser.teachSubject?.subName}
                            </Typography>
                        )}
                    </Stack>
                    <form onSubmit={submitHandler}>
                        <Stack spacing={3}>
                            {situation === "Student" && (
                                <FormControl fullWidth>
                                    <InputLabel id="select-subject-label">Select Subject</InputLabel>
                                    <Select
                                        labelId="select-subject-label"
                                        value={subjectName}
                                        label="Choose an option"
                                        onChange={changeHandler}
                                        required
                                    >
                                        {subjectsList.length > 0 ? (
                                            subjectsList.map((subject) => (
                                                <MenuItem key={subject._id} value={subject.subName}>
                                                    {subject.subName}
                                                </MenuItem>
                                            ))
                                        ) : (
                                            <MenuItem disabled value="">
                                                Add Subjects For Attendance
                                            </MenuItem>
                                        )}
                                    </Select>
                                </FormControl>
                            )}
                            <FormControl fullWidth>
                                <InputLabel id="select-status-label">Attendance Status</InputLabel>
                                <Select
                                    labelId="select-status-label"
                                    value={status}
                                    label="Choose an option"
                                    onChange={(event) => setStatus(event.target.value)}
                                    required
                                >
                                    <MenuItem value="Present">Present</MenuItem>
                                    <MenuItem value="Absent">Absent</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    label="Select Date"
                                    type="date"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    required
                                    InputLabelProps={{ shrink: true }}
                                />
                            </FormControl>
                        </Stack>

                        <PurpleButton
                            fullWidth
                            size="large"
                            sx={{ mt: 3 }}
                            variant="contained"
                            type="submit"
                            disabled={loader}
                        >
                            {loader ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                        </PurpleButton>
                    </form>
                </ContentBox>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Container>
    );
};

export default StudentAttendance;

// Styled Components
const Container = styled.div`
    padding: 16px;
    background-color: #f5f5f5; /* Light gray background */
    min-height: 100vh; /* Full height for spacing */
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoadingText = styled(Typography)`
    font-size: 18px;
    color: #007bff; /* Bootstrap primary color */
`;

const ContentBox = styled(Box)`
    max-width: 550px;
    padding: 32px; /* Increased padding for better spacing */
    background-color: #fff; /* White background for the form */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for the box */
    border-radius: 8px; /* Rounded corners */
`;
