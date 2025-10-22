import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectDetails } from '../../../redux/sclassRelated/sclassHandle';
import Popup from '../../../components/Popup';
import { registerUser } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress, Box, Typography, TextField, Button } from '@mui/material';

const AddTeacher = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subjectID = params.id;

    const { status, response, error } = useSelector(state => state.user);
    const { subjectDetails } = useSelector((state) => state.sclass);

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
    }, [dispatch, subjectID]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);

    const role = "Teacher";
    const school = subjectDetails?.school;
    const teachSubject = subjectDetails?._id;
    const teachSclass = subjectDetails?.sclassName?._id;

    const fields = { name, email, password, role, school, teachSubject, teachSclass };

    const submitHandler = (event) => {
        event.preventDefault();
        setLoader(true);
        dispatch(registerUser(fields, role));
    };

    useEffect(() => {
        if (status === 'added') {
            dispatch(underControl());
            navigate("/Admin/teachers");
        } else if (status === 'failed') {
            setMessage(response);
            setShowPopup(true);
            setLoader(false);
        } else if (status === 'error') {
            setMessage("Network Error");
            setShowPopup(true);
            setLoader(false);
        }
    }, [status, navigate, response, dispatch]);

    return (
        <Box sx={{ padding: 3, maxWidth: 400, margin: 'auto' }}>
            <Typography variant="h5" component="h1" gutterBottom>
                Add Teacher
            </Typography>
            <form onSubmit={submitHandler}>
                <Typography variant="subtitle1">
                    Subject: {subjectDetails?.subName}
                </Typography>
                <Typography variant="subtitle1">
                    Class: {subjectDetails?.sclassName?.sclassName}
                </Typography>

                <TextField
                    className="registerInput"
                    label="Name"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                />

                <TextField
                    className="registerInput"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                />

                <TextField
                    className="registerInput"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />

                <Button
                    className="registerButton"
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loader}
                    sx={{ marginTop: 2 }}
                >
                    {loader ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        'Register'
                    )}
                </Button>
            </form>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </Box>
    );
};

export default AddTeacher;
