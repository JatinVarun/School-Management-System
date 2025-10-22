import * as React from 'react';
import { useDispatch } from 'react-redux';
import { underControl } from '../redux/userRelated/userSlice';
import { underStudentControl } from '../redux/studentRelated/studentSlice';
import MuiAlert from '@mui/material/Alert';
import { Snackbar } from '@mui/material';

const Popup = ({ message, setShowPopup, showPopup }) => {
    const dispatch = useDispatch();

    const vertical = "top";
    const horizontal = "right";

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowPopup(false);
        dispatch(underControl());
        dispatch(underStudentControl());
    };

    return (
        <Snackbar
            open={showPopup}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            key={vertical + horizontal}
        >
            {message === "Done Successfully" ? (
                <CustomAlert onClose={handleClose} severity="success">
                    {message}
                </CustomAlert>
            ) : (
                <CustomAlert onClose={handleClose} severity="error">
                    {message}
                </CustomAlert>
            )}
        </Snackbar>
    );
};

export default Popup;

const CustomAlert = React.forwardRef(function CustomAlert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} sx={alertStyles(props.severity)} />;
});

const alertStyles = (severity) => ({
    backgroundColor: severity === 'success' ? '#2e7d32' : '#c62828',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
});
