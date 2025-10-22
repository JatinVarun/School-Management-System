import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Paper, Box } from '@mui/material';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.log(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container>
            {loading ? (
                <Typography variant="h6" align="center">Loading...</Typography>
            ) : (
                <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f5f5f5' }}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Teacher Details
                    </Typography>
                    <Box sx={{ marginBottom: 2 }}>
                        <Typography variant="h6">Teacher Name: {teacherDetails?.name}</Typography>
                        <Typography variant="h6">Class Name: {teacherDetails?.teachSclass?.sclassName}</Typography>
                    </Box>
                    {isSubjectNamePresent ? (
                        <Box sx={{ marginBottom: 2 }}>
                            <Typography variant="h6">Subject Name: {teacherDetails?.teachSubject?.subName}</Typography>
                            <Typography variant="h6">Subject Sessions: {teacherDetails?.teachSubject?.sessions}</Typography>
                        </Box>
                    ) : (
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={handleAddSubject}
                            sx={{ marginTop: 2 }}
                        >
                            Add Subject
                        </Button>
                    )}
                </Paper>
            )}
        </Container>
    );
};

export default TeacherDetails;
