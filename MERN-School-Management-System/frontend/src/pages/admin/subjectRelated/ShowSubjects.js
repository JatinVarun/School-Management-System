import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Paper, Box, IconButton, CircularProgress, Typography,
} from '@mui/material';
import TableTemplate from '../../../components/TableTemplate';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { subjectsList, loading, error, response } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        dispatch(getSubjectList(currentUser._id, "AllSubjects"));
    }, [currentUser._id, dispatch]);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);

        // Uncomment to enable delete functionality
        // dispatch(deleteUser(deleteID, address))
        //     .then(() => {
        //         dispatch(getSubjectList(currentUser._id, "AllSubjects"));
        //     });
    };

    const subjectColumns = [
        { id: 'subName', label: 'Subject Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => ({
        subName: subject.subName,
        sessions: subject.sessions,
        sclassName: subject.sclassName.sclassName,
        sclassID: subject.sclassName._id,
        id: subject._id,
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton
                variant="contained"
                onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}
                sx={{ ml: 1 }}
            >
                View
            </BlueButton>
        </>
    );

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/subjects/chooseclass"),
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: () => deleteHandler(currentUser._id, "Subjects"),
        },
    ];

    return (
        <>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {response ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton
                                variant="contained"
                                onClick={() => navigate("/Admin/subjects/chooseclass")}
                            >
                                Add Subjects
                            </GreenButton>
                        </Box>
                    ) : (
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(subjectsList) && subjectsList.length > 0 ? (
                                <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                            ) : (
                                <Box sx={{ padding: 2, textAlign: 'center' }}>
                                    <Typography variant="h6" color="textSecondary">
                                        No subjects available.
                                    </Typography>
                                </Box>
                            )}
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    )}
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowSubjects;
