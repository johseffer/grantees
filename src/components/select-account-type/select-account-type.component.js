import React from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import StyledTextField from './../styled-text-field/styled-text-field.component'


const SelectAccountType = ({ onChange, selected, register, errors, bank, disabled }) => {
    return (
        <StyledTextField
            label="Qual o tipo de conta?"
            size="small"
            style={{ width: '60%' }}
            InputLabelProps={{ shrink: true }}
            error={errors.accountType ? true : false}
            inputProps={{
                name: "accountType",
                inputRef: (ref) => {
                    if (!ref) return;
                    register({ name: "accountType", value: selected });
                }
            }}
            SelectProps={{
                SelectDisplayProps: {
                    'data-testid': 'select-account-type',
                },
            }}
            value={selected}
            onChange={onChange}
            helperText={errors.accountType ? errors.accountType.message : undefined}
            disabled={disabled}
            select
        >
            <MenuItem value="1">Conta Corrente</MenuItem>
            <MenuItem value="2">Conta Poupança</MenuItem>
            {bank === '001' && <MenuItem value="3">Conta Fácil</MenuItem>}
        </StyledTextField>
    )
}

export default SelectAccountType