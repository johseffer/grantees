import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import { withStyles } from '@material-ui/core/styles'

import AddIcon from '@material-ui/icons/Add'
import SearchIcon from "@material-ui/icons/Search"

import './grantee.page.scss'

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#1FBFAE',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#1FBFAE',
      },
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          borderColor: '#1FBFAE',
        },
      },
    },
  })(TextField);

const styles = {
    input: {
        width: '205px',
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

const GranteePage = (props) => {
    const { classes } = props;
    return (
        <div className="page-header">
            <div className="action-container">
                <span className="page-header-title">Seus Favorecidos</span>
                <IconButton color="primary" size="small" className="add-button" aria-label="Incluir favorecido">
                    <AddIcon />
                </IconButton>
            </div>
            <div className="search-container">                                    
                <CssTextField
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
    )
}

export default withStyles(styles)(GranteePage);