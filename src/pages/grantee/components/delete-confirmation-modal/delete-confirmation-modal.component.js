import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import StyledButton from './../../../../components/styled-button/styled-button.component'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        width: 635,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        outline: 'none',        
    },
    title: {
        fontFamily: 'roboto',
        fontSize: '22px',
        fontWeight: '400',
        margin: '30px 0'
    },
    subtitle: {
        fontFamily: 'roboto',
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '10px'
    },
    description: {
        fontFamily: 'roboto',
        fontSize: '18px',
        fontWeight: '400',
        marginBottom: '40px'        
    }
}));

export default function DeleteConfirmationModal({ title, subtitle, description, opened, handleClose, handleConfirm }) {
    const classes = useStyles();

    const body = (
        <div className={classes.paper}>
            <span className={classes.title}>{title}</span>
            <span className={classes.subtitle}>{subtitle}</span>
            <span className={classes.description}>{description}</span>
            <div className="form-actions">
                <StyledButton variant="outlined" size="large" onClick={handleClose}>
                    Cancelar
                </StyledButton>
                <StyledButton variant="contained" size="large" onClick={handleConfirm}>
                    Confirmar Exclusão
                </StyledButton>
            </div>
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