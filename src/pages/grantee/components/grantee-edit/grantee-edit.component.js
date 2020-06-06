import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import GranteeForm from './../grantee-form/grantee-form.component'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        position: 'absolute',
        width: 731,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        outline: 'none'
    },
}));

export default function GranteeEdit({ id, opened, handleClose, onItemUpdated, onItemDeleted }) {
    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <GranteeForm id={id} onClickCancel={handleClose} onItemUpdated={onItemUpdated} onItemDeleted={onItemDeleted} />
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