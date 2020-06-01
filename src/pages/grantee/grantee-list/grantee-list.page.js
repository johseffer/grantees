import React from 'react'
import { navigate } from 'hookrouter'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import GranteeList from '../components/grantee-list/grantee-list.component'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import StyledTextField from '../../../components/styled-text-field/styled-text-field.component'

import AddIcon from '@material-ui/icons/Add'
import SearchIcon from "@material-ui/icons/Search"

import './grantee-list.page.scss'


const styles = {
    input: {
        width: '220px',
        backgroundColor: 'white',
        '&::placeholder': {
            color: 'gray',
            opacity: '1'
        }
    },
    adornedEnd: {
        backgroundColor: 'white',
        paddingRight: '0'
    },
    button: {
        backgroundColor: 'white',
        height: '40px',
        marginLeft: '10px',
        boxShadow: 'none',
        minWidth: '42px',
        '& > span > span': {
            marginRight: '0px'
        },
        '&:hover': {
            backgroundColor: '#1FBFAE',
            boxShadow: 'none'
        }
    }
};

const GranteeListPage = (props) => {
    const { classes } = props;

    const handleOnClickAdd = () => {
        navigate('/grantee/add');
    }

    return (
        <>
            <div className="page-header">
                <div className="action-container">
                    <span className="page-header-title">Seus Favorecidos</span>
                    <IconButton color="primary" size="small" className="add-button" aria-label="Incluir favorecido" onClick={handleOnClickAdd}>
                        <AddIcon />
                    </IconButton>
                </div>
                <div className="search-container">
                    <StyledTextField
                        size="small"
                        className="search-input"
                        variant="outlined"
                        id="custom-css-outlined-input"
                        placeholder="Nome, CPF, agência ou conta"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <Button
                                        variant="contained"
                                        className={classes.button}
                                        startIcon={<SearchIcon />}
                                    />
                                </InputAdornment>
                            ),
                            classes: { input: classes.input, adornedEnd: classes.adornedEnd }
                        }}
                    />
                </div>
            </div>
            <div>
                <GranteeList />
            </div>
        </>
    )
}

export default withStyles(styles)(GranteeListPage);