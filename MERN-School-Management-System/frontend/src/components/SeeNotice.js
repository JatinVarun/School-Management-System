import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotices } from '../redux/noticeRelated/noticeHandle';
import { Paper, Typography, CircularProgress } from '@mui/material';
import TableViewTemplate from './TableViewTemplate';

const SeeNotice = () => {
    const dispatch = useDispatch();

    const { currentUser, currentRole } = useSelector(state => state.user);
    const { noticesList, loading, error, response } = useSelector((state) => state.notice);

    useEffect(() => {
        if (currentRole === "Admin") {
            dispatch(getAllNotices(currentUser._id, "Notice"));
        } else {
            dispatch(getAllNotices(currentUser.school._id, "Notice"));
        }
    }, [dispatch, currentRole, currentUser]);

    const noticeColumns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'details', label: 'Details', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = Array.isArray(noticesList)
        ? noticesList.map((notice) => {
            const date = new Date(notice.date);
            const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
            return {
                title: notice.title,
                details: notice.details,
                date: dateString,
                id: notice._id,
            };
        })
        : [];

    return (
        <div style={{ marginTop: '50px', marginRight: '20px' }}>
            <Typography variant="h4" component="h3" gutterBottom sx={{ marginBottom: '40px' }}>
                Notices
            </Typography>

            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <CircularProgress size={50} />
                </div>
            ) : error ? (
                <Typography variant="body1" color="error" align="center">
                    {error}
                </Typography>
            ) : noticesList.length === 0 ? (
                <Typography variant="body1" align="center">
                    No Notices to Show Right Now
                </Typography>
            ) : (
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <TableViewTemplate columns={noticeColumns} rows={noticeRows} />
                </Paper>
            )}
        </div>
    );
};

export default SeeNotice;
