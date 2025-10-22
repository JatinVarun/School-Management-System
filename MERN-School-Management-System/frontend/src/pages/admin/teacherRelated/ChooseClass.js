import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { getAllSclasses } from '../../../redux/sclassRelated/sclassHandle';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { sclassesList, loading, error, getresponse } = useSelector((state) => state.sclass);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllSclasses(currentUser._id, "Sclass"));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.error(error);
    }

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate("/Admin/teachers/choosesubject/" + classID);
        } else if (situation === "Subject") {
            navigate("/Admin/addsubject/" + classID);
        }
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList && sclassesList.length > 0 && sclassesList.map((sclass) => {
        return {
            name: sclass.sclassName,
            id: sclass._id,
        };
    });

    const SclassButtonHaver = ({ row }) => {
        return (
            <PurpleButton variant="contained" onClick={() => navigateHandler(row.id)}>
                Choose
            </PurpleButton>
        );
    };

    return (
        <>
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {getresponse ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={() => navigate("/Admin/addclass")}>
                                Add Class
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h6" gutterBottom component="div" sx={{ marginBottom: '16px' }}>
                                Choose a Class
                            </Typography>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default ChooseClass;
