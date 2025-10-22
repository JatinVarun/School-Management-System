import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeacherFreeClassSubjects } from '../../../redux/sclassRelated/sclassHandle';
import { updateTeachSubject } from '../../../redux/teacherRelated/teacherHandle';
import { GreenButton, PurpleButton } from '../../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [loader, setLoader] = useState(false);

    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);

    useEffect(() => {
        if (situation === "Norm") {
            setClassID(params.id);
            dispatch(getTeacherFreeClassSubjects(params.id));
        } else if (situation === "Teacher") {
            const { classID, teacherID } = params;
            setClassID(classID);
            setTeacherID(teacherID);
            dispatch(getTeacherFreeClassSubjects(classID));
        }
    }, [situation, params.id, params]);

    if (loading) {
        return <div>Loading...</div>;
    } else if (response) {
        return (
            <div>
                <Typography variant="h5" color="error">Sorry, all subjects have teachers assigned already</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <PurpleButton variant="contained" onClick={() => navigate("/Admin/addsubject/" + classID)}>
                        Add Subjects
                    </PurpleButton>
                </Box>
            </div>
        );
    } else if (error) {
        console.error(error);
    }

    const updateSubjectHandler = (teacherId, teachSubject) => {
        setLoader(true);
        dispatch(updateTeachSubject(teacherId, teachSubject))
            .then(() => {
                navigate("/Admin/teachers");
                setLoader(false);
            })
            .catch(() => setLoader(false));
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', backgroundColor: '#f5f5f5', padding: '16px' }}>
            <Typography variant="h6" gutterBottom component="div">
                Choose a Subject
            </Typography>
            <TableContainer>
                <Table aria-label="sclasses table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="center">Subject Name</StyledTableCell>
                            <StyledTableCell align="center">Subject Code</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
                            <StyledTableRow key={subject._id}>
                                <StyledTableCell component="th" scope="row" style={{ color: "black" }}>
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="center">{subject.subName}</StyledTableCell>
                                <StyledTableCell align="center">{subject.subCode}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {situation === "Norm" ? (
                                        <GreenButton variant="contained" onClick={() => navigate("/Admin/teachers/addteacher/" + subject._id)}>
                                            Choose
                                        </GreenButton>
                                    ) : (
                                        <GreenButton variant="contained" disabled={loader} onClick={() => updateSubjectHandler(teacherID, subject._id)}>
                                            {loader ? (
                                                <div className="load"></div>
                                            ) : (
                                                'Choose Subject'
                                            )}
                                        </GreenButton>
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ChooseSubject;
