import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GranteeForm from './../grantee-form/grantee-form.component'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 731,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function GranteeEdit({ opened, handleClose }) {
    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <GranteeForm />
        </div>
    );

    return (
        <Modal
            open={opened}
            onClose={handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            className={classes.modal}
        >
            {body}
        </Modal>
    );
}