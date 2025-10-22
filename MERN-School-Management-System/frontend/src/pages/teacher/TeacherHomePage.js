import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../../components/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../../assets/img1.png";
import Lessons from "../../assets/subjects.svg";
import Tests from "../../assets/assignment.svg";
import Time from "../../assets/time.svg";
import { getClassStudents, getSubjectDetails } from '../../redux/sclassRelated/sclassHandle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const TeacherHomePage = () => {
    const dispatch = useDispatch();

    const { currentUser } = useSelector((state) => state.user);
    const { subjectDetails, sclassStudents } = useSelector((state) => state.sclass);

    const classID = currentUser.teachSclass?._id;
    const subjectID = currentUser.teachSubject?._id;

    useEffect(() => {
        dispatch(getSubjectDetails(subjectID, "Subject"));
        dispatch(getClassStudents(classID));
    }, [dispatch, subjectID, classID]);

    const numberOfStudents = sclassStudents && sclassStudents.length;
    const numberOfSessions = subjectDetails && subjectDetails.sessions;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <Icon src={Students} alt="Students" />
                        <Title>Class Students</Title>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <Icon src={Lessons} alt="Lessons" />
                        <Title>Total Lessons</Title>
                        <Data start={0} end={numberOfSessions} duration={5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <Icon src={Tests} alt="Tests" />
                        <Title>Tests Taken</Title>
                        <Data start={0} end={24} duration={4} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <Icon src={Time} alt="Time" />
                        <Title>Total Hours</Title>
                        <Data start={0} end={30} duration={4} suffix=" hrs" />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

// Styled Components
const StyledPaper = styled(Paper)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 220px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #f9f9f9; /* Light background for contrast */
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* Soft shadow for depth */
  transition: transform 0.2s; /* Smooth scaling on hover */

  &:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
  }
`;

const Icon = styled.img`
  width: 60px; /* Consistent icon size */
  height: 60px; /* Consistent icon size */
  margin-bottom: 10px; /* Space between icon and title */
`;

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600; /* Bold title for emphasis */
  color: #333; /* Darker color for better readability */
`;

const Data = styled(CountUp)`
  font-size: calc(1.5rem + 0.6vw);
  color: #4caf50; /* Green color for positive metrics */
  font-weight: bold; /* Emphasize data */
`;

export default TeacherHomePage;
