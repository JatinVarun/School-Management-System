import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Collapse, Table, TableBody, TableHead, Typography } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import {
    calculateOverallAttendancePercentage,
    calculateSubjectAttendancePercentage,
    groupAttendanceBySubject
} from '../../components/attendanceCalculator';
import CustomPieChart from '../../components/CustomPieChart';
import { PurpleButton } from '../../components/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../components/styles';

const TeacherViewStudent = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { currentUser, userDetails, response, loading, error } = useSelector((state) => state.user);

    const studentID = params.id;
    const teachSubject = currentUser.teachSubject?.subName;
    const teachSubjectID = currentUser.teachSubject?._id;

    const [sclassName, setSclassName] = useState('');
    const [studentSchool, setStudentSchool] = useState('');
    const [subjectMarks, setSubjectMarks] = useState([]);
    const [subjectAttendance, setSubjectAttendance] = useState([]);
    const [openStates, setOpenStates] = useState({});

    useEffect(() => {
        dispatch(getUserDetails(studentID, "Student"));
    }, [dispatch, studentID]);

    useEffect(() => {
        if (userDetails) {
            setSclassName(userDetails.sclassName || '');
            setStudentSchool(userDetails.school || '');
            setSubjectMarks(userDetails.examResult || []);
            setSubjectAttendance(userDetails.attendance || []);
        }
    }, [userDetails]);

    const handleOpen = (subId) => {
        setOpenStates((prevState) => ({
            ...prevState,
            [subId]: !prevState[subId],
        }));
    };

    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ];

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <Typography variant="h5">Student Details</Typography>
                    <div>Name: {userDetails.name}</div>
                    <div>Roll Number: {userDetails.rollNum}</div>
                    <div>Class: {sclassName}</div>
                    <div>School: {studentSchool}</div>
                    <br />

                    <Typography variant="h6">Attendance:</Typography>
                    {subjectAttendance && subjectAttendance.length > 0 && (
                        <>
                            <Table>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>Subject</StyledTableCell>
                                        <StyledTableCell>Present</StyledTableCell>
                                        <StyledTableCell>Total Sessions</StyledTableCell>
                                        <StyledTableCell>Attendance Percentage</StyledTableCell>
                                        <StyledTableCell align="center">Actions</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(groupAttendanceBySubject(subjectAttendance)).map(
                                        ([subName, { present, allData, subId, sessions }]) => {
                                            if (subName === teachSubject) {
                                                const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                                                return (
                                                    <React.Fragment key={subId}>
                                                        <StyledTableRow>
                                                            <StyledTableCell>{subName}</StyledTableCell>
                                                            <StyledTableCell>{present}</StyledTableCell>
                                                            <StyledTableCell>{sessions}</StyledTableCell>
                                                            <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                                                            <StyledTableCell align="center">
                                                                <Button variant="contained" onClick={() => handleOpen(subId)}>
                                                                    {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                                                                </Button>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                        <StyledTableRow>
                                                            <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
                                                                <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                                                                    <Box sx={{ margin: 1 }}>
                                                                        <Typography variant="h6" gutterBottom component="div">Attendance Details</Typography>
                                                                        <Table size="small" aria-label="attendance-details">
                                                                            <TableHead>
                                                                                <StyledTableRow>
                                                                                    <StyledTableCell>Date</StyledTableCell>
                                                                                    <StyledTableCell align="right">Status</StyledTableCell>
                                                                                </StyledTableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {allData.map((data, index) => {
                                                                                    const date = new Date(data.date);
                                                                                    const dateString = date.toISOString().substring(0, 10);
                                                                                    return (
                                                                                        <StyledTableRow key={index}>
                                                                                            <StyledTableCell>{dateString}</StyledTableCell>
                                                                                            <StyledTableCell align="right">{data.status}</StyledTableCell>
                                                                                        </StyledTableRow>
                                                                                    );
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </Box>
                                                                </Collapse>
                                                            </StyledTableCell>
                                                        </StyledTableRow>
                                                    </React.Fragment>
                                                );
                                            }
                                            return null;
                                        }
                                    )}
                                </TableBody>
                            </Table>
                            <div>Overall Attendance Percentage: {overallAttendancePercentage.toFixed(2)}%</div>
                            <CustomPieChart data={chartData} />
                        </>
                    )}
                    <br />
                    <Button
                        variant="contained"
                        onClick={() => navigate(`/Teacher/class/student/attendance/${studentID}/${teachSubjectID}`)}
                    >
                        Add Attendance
                    </Button>
                    <br /><br />

                    <Typography variant="h6">Subject Marks:</Typography>
                    {subjectMarks && subjectMarks.length > 0 && (
                        <>
                            <Table>
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>Subject</StyledTableCell>
                                        <StyledTableCell>Marks</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {subjectMarks.map((result, index) => {
                                        if (result.subName.subName === teachSubject) {
                                            return (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                                </StyledTableRow>
                                            );
                                        }
                                        return null;
                                    })}
                                </TableBody>
                            </Table>
                        </>
                    )}
                    <PurpleButton
                        variant="contained"
                        onClick={() => navigate(`/Teacher/class/student/marks/${studentID}/${teachSubjectID}`)}
                    >
                        Add Marks
                    </PurpleButton>
                    <br /><br />
                </div>
            )}
        </>
    );
};

export default TeacherViewStudent;
