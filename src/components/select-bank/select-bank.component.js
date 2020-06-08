import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import StyledTextField from './../styled-text-field/styled-text-field.component'

const banks = [
    { title: 'Banco do Brasil (001)', code: '001' },
    { title: 'Bradesco (237)', code: '237' },
    { title: 'Caixa Econômica Federal (104)', code: '104' },
    { title: 'Sicoob (756)', code: '756' }
]

const SelectBank = ({ onChange, value, register, errors, disabled }) => {
    return (
        <Autocomplete
            id="select-bank"
            options={banks}
            getOptionLabel={(option) => option.title}
            style={{ width: '60%', marginRight: '15px' }}
            value={value ? banks[banks.findIndex(item => item.code === value)] : ''}
            disabled={disabled}
            onChange={onChange}
            renderInput={(params) =>                 
                <StyledTextField
                    {...params}
                    name="bank" 
                    label="Qual o banco do favorecido?"
                    size="small"
                    InputLabelProps={{ shrink: true }} 
                    error={errors.bank ? true : false}
                    inputRef={register}
                    helperText={errors.bank ? errors.bank.message : undefined}
                />
            }
        />
    )
}

export default SelectBank