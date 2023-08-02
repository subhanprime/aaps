import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const Loading = ({ loading }) => {
    return (
        <Backdrop
            sx={{
                // color: 'blue',
                opacity: '0.7 !important',
                backgroundColor: '#191919',
                zIndex: 999999,
            }}
            open={loading}
        >
            <CircularProgress sx={{ color: '#fff' }} />
        </Backdrop>
    );
};

export default Loading;
