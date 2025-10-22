import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUserDetails, updateUser } from '../../../redux/userRelated/userHandle';
import { useNavigate, useParams } from 'react-router-dom';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableHead,
  Typography,
  Tab,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Container,
} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { KeyboardArrowUp, KeyboardArrowDown, Delete as DeleteIcon } from '@mui/icons-material';
import { removeStuff, updateStudentFields } from '../../../redux/studentRelated/studentHandle';
import {
  calculateOverallAttendancePercentage,
  calculateSubjectAttendancePercentage,
  groupAttendanceBySubject,
} from '../../../components/attendanceCalculator';
import CustomBarChart from '../../../components/CustomBarChart';
import CustomPieChart from '../../../components/CustomPieChart';
import { StyledTableCell, StyledTableRow } from '../../../components/styles';
import Popup from '../../../components/Popup';

const ViewStudent = () => {
  const [showTab, setShowTab] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { userDetails, response, loading, error } = useSelector((state) => state.user);

  const studentID = params.id;
  const address = 'Student';

  useEffect(() => {
    dispatch(getUserDetails(studentID, address));
  }, [dispatch, studentID]);

  useEffect(() => {
    if (userDetails && userDetails.sclassName && userDetails.sclassName._id) {
      dispatch(getSubjectList(userDetails.sclassName._id, 'ClassSubjects'));
    }
  }, [dispatch, userDetails]);

  const [name, setName] = useState('');
  const [rollNum, setRollNum] = useState('');
  const [password, setPassword] = useState('');
  const [sclassName, setSclassName] = useState('');
  const [studentSchool, setStudentSchool] = useState('');
  const [subjectMarks, setSubjectMarks] = useState({});
  const [subjectAttendance, setSubjectAttendance] = useState([]);
  const [openStates, setOpenStates] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('1');
  const [selectedSection, setSelectedSection] = useState('table');

  useEffect(() => {
    if (userDetails) {
      setName(userDetails.name || '');
      setRollNum(userDetails.rollNum || '');
      setSclassName(userDetails.sclassName || '');
      setStudentSchool(userDetails.school || '');
      setSubjectMarks(userDetails.examResult || {});
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const handleOpen = (subId) => {
    setOpenStates((prevState) => ({
      ...prevState,
      [subId]: !prevState[subId],
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const fields = password === '' ? { name, rollNum } : { name, rollNum, password };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(updateUser(fields, studentID, address))
      .then(() => {
        dispatch(getUserDetails(studentID, address)); // Refresh the user details
      })
      .catch((error) => {
        console.error(error); // Log any errors
        setMessage('Failed to update user details.'); // Set error message for Popup
        setShowPopup(true); // Show Popup
      });
  };

  const deleteHandler = () => {
    setMessage('Sorry, the delete function has been disabled for now.');
    setShowPopup(true);
  };

  const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
  const overallAbsentPercentage = 100 - overallAttendancePercentage;

  const chartData = [
    { name: 'Present', value: overallAttendancePercentage },
    { name: 'Absent', value: overallAbsentPercentage },
  ];

  const StudentAttendanceSection = () => {
    const renderTableSection = () => {
      return (
        <>
          <Typography variant="h4" gutterBottom>
            Attendance:
          </Typography>
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
                ([subName, { present, allData, subId, sessions }], index) => {
                  const subjectAttendancePercentage = calculateSubjectAttendancePercentage(present, sessions);
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell>{subName}</StyledTableCell>
                      <StyledTableCell>{present}</StyledTableCell>
                      <StyledTableCell>{sessions}</StyledTableCell>
                      <StyledTableCell>{subjectAttendancePercentage}%</StyledTableCell>
                      <StyledTableCell align="center">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleOpen(subId)}
                        >
                          {openStates[subId] ? <KeyboardArrowUp /> : <KeyboardArrowDown />} Details
                        </Button>
                        <IconButton onClick={() => removeStuff(subId)}> {/* Ensure removeStuff is defined */}
                          <DeleteIcon color="error" />
                        </IconButton>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => navigate(`/Admin/subject/student/attendance/${studentID}/${subId}`)}
                        >
                          Change
                        </Button>
                      </StyledTableCell>
                      <StyledTableRow>
                        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={openStates[subId]} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                              <Typography variant="h6" gutterBottom component="div">
                                Attendance Details
                              </Typography>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <StyledTableRow>
                                    <StyledTableCell>Date</StyledTableCell>
                                    <StyledTableCell align="right">Status</StyledTableCell>
                                  </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                  {allData.map((data, index) => {
                                    const date = new Date(data.date);
                                    const dateString = date.toString() !== 'Invalid Date' ? date.toISOString().substring(0, 10) : 'Invalid Date';
                                    return (
                                      <StyledTableRow key={index}>
                                        <StyledTableCell component="th" scope="row">
                                          {dateString}
                                        </StyledTableCell>
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
                    </StyledTableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </>
      );
    };

    return (
      <>
        {subjectAttendance && subjectAttendance.length > 0 ? (
          <>
            {selectedSection === 'table' && renderTableSection()}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                <BottomNavigationAction label="Table" value="table" />
                <BottomNavigationAction label="Chart" value="chart" />
              </BottomNavigation>
            </Paper>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={() => navigate('/Admin/students/student/attendance/' + studentID)}>
            Add Attendance
          </Button>
        )}
      </>
    );
  };

  const StudentMarksSection = () => {
    const renderTableSection = () => {
      return (
        <>
          <Typography variant="h4" gutterBottom>
            Marks:
          </Typography>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>Subject</StyledTableCell>
                <StyledTableCell>Marks</StyledTableCell>
                <StyledTableCell align="center">Actions</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {Object.entries(subjectMarks).map(([subName, mark], index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell>{subName}</StyledTableCell>
                  <StyledTableCell>{mark}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => navigate(`/Admin/subject/student/marks/${studentID}/${subName}`)}
                    >
                      Change
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </>
      );
    };

    return (
      <>
        {subjectMarks && Object.keys(subjectMarks).length > 0 ? (
          <>
            {selectedSection === 'table' && renderTableSection()}

            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                <BottomNavigationAction label="Table" value="table" />
                <BottomNavigationAction label="Chart" value="chart" />
              </BottomNavigation>
            </Paper>
          </>
        ) : (
          <Button variant="contained" color="primary" onClick={() => navigate('/Admin/students/student/marks/' + studentID)}>
            Add Marks
          </Button>
        )}
      </>
    );
  };

  const AttendanceSection = () => {
    const pieChartData = [
      { name: 'Present', value: overallAttendancePercentage },
      { name: 'Absent', value: overallAbsentPercentage },
    ];

    return (
      <>
        {selectedSection === 'chart' ? (
          <CustomPieChart data={pieChartData} />
        ) : (
          <StudentAttendanceSection />
        )}
      </>
    );
  };

  const MarksSection = () => {
    return (
      <>
        {selectedSection === 'chart' ? (
          <CustomBarChart data={subjectMarks} />
        ) : (
          <StudentMarksSection />
        )}
      </>
    );
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" align="center" gutterBottom>
        View Student Details
      </Typography>
      <form onSubmit={submitHandler}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6">Student Information</Typography>
          <Typography>Name: {name}</Typography>
          <Typography>Roll Number: {rollNum}</Typography>
          <Typography>Class: {sclassName}</Typography>
          <Typography>School: {studentSchool}</Typography>
          <Button variant="contained" color="secondary" onClick={deleteHandler} startIcon={<DeleteIcon />}>
            Delete Student
          </Button>
        </Box>
      </form>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Attendance" value="1" />
            <Tab label="Marks" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <AttendanceSection />
        </TabPanel>
        <TabPanel value="2">
          <MarksSection />
        </TabPanel>
      </TabContext>
      
      <Popup open={showPopup} setOpen={setShowPopup} message={message} />
    </Container>
  );
};

export default ViewStudent;
