import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import StyledTextField from './../../../../components/styled-text-field/styled-text-field.component'

import './grantee-form.component.scss'
import StyledButton from './../../../../components/styled-button/styled-button.component'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '70%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    inputName: {
        width: '75%'
    },
    inputCpfCnpj: {
        width: '25%'
    }
}));

const GranteeForm = () => {
    const classes = useStyles();

    return (
        <div className="grantee-form-container">            
            <form className={classes.root} noValidate autoComplete="off">
                <span className="grantee-form-title">Quais os dados do favorecido?</span>
                <div className="form-control">                    
                    <StyledTextField
                        label="Qual o nome completo ou razão social do favorecido?"
                        size="small"
                        style ={{width: '75%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                    <StyledTextField
                        label="Qual o CPF ou CNPJ?"
                        size="small"
                        style ={{width: '25%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                </div>
                <div className="form-control">            
                    <StyledTextField
                        label="Qual o email do favorecido?"
                        size="small"
                        style ={{width: '75%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                </div>
                <span className="grantee-form-title">Quais os dados bancários do favorecido?</span>
                <div className="form-control">                    
                    <StyledTextField
                        label="Qual o banco do favorecido?"
                        size="small"
                        style ={{width: '60%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                    <StyledTextField
                        label="Qual a agência?"
                        size="small"
                        style ={{width: '30%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                    <StyledTextField
                        label="Digito"
                        size="small"
                        style ={{width: '10%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                </div>
                <div className="form-control">                    
                    <StyledTextField
                        label="Qual o tipo de conta?"
                        size="small"
                        style ={{width: '60%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                    <StyledTextField
                        label="Qual a conta corrente?"
                        size="small"
                        style ={{width: '30%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                    <StyledTextField
                        label="Digito"
                        size="small"
                        style ={{width: '10%'}}
                        InputLabelProps={{ shrink: true }} 
                    />
                </div>

                <div className="form-actions">       
                    <StyledButton variant="outlined" size="large">
                        Cancelar
                    </StyledButton>
                    <StyledButton variant="contained" size="large">
                        Salvar
                    </StyledButton>
                </div>
            </form>
        </div>
    )
}

export default GranteeForm