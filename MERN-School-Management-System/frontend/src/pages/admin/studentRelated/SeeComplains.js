import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Box, Checkbox, Typography } from '@mui/material';
import { getAllComplains } from '../../../redux/complainRelated/complainHandle';
import TableTemplate from '../../../components/TableTemplate';
import styled from 'styled-components';

const SeeComplains = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const dispatch = useDispatch();
    const { complainsList, loading, error, response } = useSelector((state) => state.complain);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllComplains(currentUser._id, "Complain"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const complainColumns = [
        { id: 'user', label: 'User', minWidth: 170 },
        { id: 'complaint', label: 'Complaint', minWidth: 200 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const complainRows = complainsList && complainsList.length > 0 && complainsList.map((complain) => {
        const date = new Date(complain.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            user: complain.user.name,
            complaint: complain.complaint,
            date: dateString,
            id: complain._id,
        };
    });

    const ComplainButtonHaver = ({ row }) => {
        return (
            <Checkbox {...label} />
        );
    };

    return (
        <Container>
            {loading ? (
                <LoadingText>Loading...</LoadingText>
            ) : (
                <>
                    {response ? (
                        <NoComplainsText>No Complaints Right Now</NoComplainsText>
                    ) : (
                        <PaperContainer>
                            {Array.isArray(complainsList) && complainsList.length > 0 && (
                                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
                            )}
                        </PaperContainer>
                    )}
                </>
            )}
        </Container>
    );
};

export default SeeComplains;

const Container = styled.div`
    padding: 16px;
    background-color: #f9f9f9; /* Light background for contrast */
    min-height: 100vh; /* Full height to ensure proper spacing */
`;

const LoadingText = styled(Typography)`
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    color: #007bff; /* Bootstrap primary color */
`;

const NoComplainsText = styled(Typography)`
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    color: #888; /* Grey color for the message */
`;

const PaperContainer = styled(Paper)`
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    padding: 16px; /* Adding padding for better spacing */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow for the paper */
`;
