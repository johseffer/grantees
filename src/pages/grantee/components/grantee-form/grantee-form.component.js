import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { setLocale, string, object } from 'yup';
import { navigate } from 'hookrouter'
import { makeStyles } from '@material-ui/core/styles'
import StyledTextField from './../../../../components/styled-text-field/styled-text-field.component'
import StyledButton from './../../../../components/styled-button/styled-button.component'
import { getGranteeById, update, remove } from '../../../../gateways/grantee.gateway'
import SelectBank from './../../../../components/select-bank/select-bank.component'
import SelectAccountType from './../../../../components/select-account-type/select-account-type.component'
import { create } from './../../../../gateways/grantee.gateway'
import DeleteIcon from '@material-ui/icons/Delete'
import DeleteConfirmationModal from './../delete-confirmation-modal/delete-confirmation-modal.component'
import Button from '@material-ui/core/Button'

import './grantee-form.component.scss'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& .MuiTextField-root': {
            margin: theme.spacing(1)
        },
    },
    inputName: {
        width: '75%'
    },
    inputCpfCnpj: {
        width: '25%'
    },
    deleteButton: {
        marginRight: '10px'
    }
}));

const GranteeForm = ({ id, onClickCancel, onItemUpdated = undefined, onItemDeleted = undefined }) => {
    const classes = useStyles();

    const [name, setName] = React.useState('');
    const [cpfCnpj, setCpfCnpj] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [bank, setBank] = React.useState('');
    const [agency, setAgency] = React.useState('');
    const [agencyDigit, setAgencyDigit] = React.useState('');
    const [account, setAccount] = React.useState('');
    const [accountDigit, setAccountDigit] = React.useState('');
    const [accountType, setAccountType] = React.useState('');
    const [status, setStatus] = React.useState('0');
    const [deleteConfirmationModalOpened, setDeleteConfirmationModalOpened] = React.useState(false);

    setLocale({
        mixed: {
            required: 'Campo obrigatório'
        }
    });


    const granteeSchema = () => {
        const isBankOfBrasil = bank === '001'
        const agencySchema = string().required().label('Agência')
            .max(isBankOfBrasil ? 4 : 10)
            .matches(isBankOfBrasil ? /^[xX0-9]{0,1}$/ : /^(?!0+$)[0-9]{0,10}$/)
        const agencyDigitSchema = string().label('Dígito').max(1).matches(/^[0-9]{0,1}$/)
        const accountSchema = string().required().label('Conta corrente')
            .max(isBankOfBrasil ? 8 : 11).matches(/^(?!0+$)[0-9]{0,11}$/)
        const accountDigitSchema = string().required().label('Dígito').max(1)
            .matches(isBankOfBrasil ? /^(?!0+$)[0-9]{0,11}$/ : /^[0-9]{0,1}$/)
        const schema = {
            name: string().required().label('Nome do favorecido'),
            email: string().email().required().label('E-mail'),
            cpfCnpj: string().required().label('CPF / CNPJ'),
            bank: string().required().label('Banco'),
            agency: agencySchema,
            agencyDigit: agencyDigitSchema,
            account: accountSchema,
            accountDigit: accountDigitSchema,
            accountType: string().required().label('Tipo de conta')
        }
        return object().shape(schema);
    }

    const { register, handleSubmit, errors } = useForm({
        validationSchema: granteeSchema()
    });

    useEffect(() => {
        if (id) {
            getGranteeById(id).then(response => {
                setName(response.data.name)
                setCpfCnpj(response.data.cpfCnpj)
                setEmail(response.data.email)
                setBank(response.data.bank)
                setAgency(response.data.agency)
                setAgencyDigit(response.data.agencyDigit)
                setAccount(response.data.account)
                setAccountDigit(response.data.accountDigit)
                setAccountType(response.data.accountType)
                setStatus(response.data.status)
            })
        }
    }, [id])

    const isDisabled = () => {
        return id && status === '1'
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangeCpfCnpj = (e) => {
        setCpfCnpj(e.target.value)
    }

    const onChangeBank = (e, values) => {
        setBank(values.code)
    }

    const onChangeAgency = (e) => {
        setAgency(e.target.value)
    }

    const onChangeAgencyDigit = (e) => {
        setAgencyDigit(e.target.value)
    }

    const onChangeAccount = (e) => {
        setAccount(e.target.value)
    }

    const onChangeAccountType = (e) => {
        setAccountType(e.target.value)
    }

    const onChangeAccountDigit = (e) => {
        setAccountDigit(e.target.value)
    }

    const _onClickCancel = () => {
        onClickCancel()
    }

    const getData = () => {
        return {
            _id: id,
            name: name,
            cpfCnpj: cpfCnpj,
            email: email,
            bank: bank,
            agency: agency,
            agencyDigit: agencyDigit,
            account: account,
            accountDigit: accountDigit,
            accountType: accountType,
            status: status
        }
    }

    const handleOpenModalDeleteConfirmation = () => {
        setDeleteConfirmationModalOpened(true);
    }

    const handleCloseModalDeleteConfirmation = () => {
        setDeleteConfirmationModalOpened(false);
    }

    const handleDelete = () => {
        handleOpenModalDeleteConfirmation()
    }

    const handleConfirmDelete = () => {
        remove([id]).then(() => {
            handleCloseModalDeleteConfirmation()
            onItemDeleted([id])
        })
    }

    const onSubmit = (data) => {
        const state = getData()
        if (id) {
            update(id, state).then(response => {
                onItemUpdated(state);
            })
        } else {
            create(state).then(response => {
                navigate('/');
            })
        }
    }

    return (
        <div className="grantee-form-container">
            <DeleteConfirmationModal title="Excluir Favorecido" subtitle={`Você Confirma a exclusão do favorecido?`} description="O hitórico de pagamentos para este favorecido será mantido, mas ele será removido da sua lista de favorecidos." opened={deleteConfirmationModalOpened} handleClose={handleCloseModalDeleteConfirmation} handleConfirm={handleConfirmDelete} />
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
                <span className="grantee-form-title">Quais os dados do favorecido?</span>
                <div className="form-control">
                    <StyledTextField
                        name="name"
                        label="Qual o nome completo ou razão social do favorecido?"
                        size="small"
                        style={{ width: '75%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeName}
                        value={name}
                        error={errors.name ? true : false}
                        inputRef={register}
                        helperText={errors.name ? errors.name.message : undefined}
                        disabled={isDisabled()}
                    />
                    <StyledTextField
                        name="cpfCnpj"
                        label="Qual o CPF ou CNPJ?"
                        size="small"
                        style={{ width: '25%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeCpfCnpj}
                        value={cpfCnpj}
                        error={errors.cpfCnpj ? true : false}
                        inputRef={register}
                        helperText={errors.cpfCnpj ? errors.cpfCnpj.message : undefined}
                        disabled={isDisabled()}
                    />
                </div>
                <div className="form-control">
                    <StyledTextField
                        name="email"
                        label="Qual o email do favorecido?"
                        size="small"
                        style={{ width: '75%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeEmail}
                        value={email}
                        error={errors.email ? true : false}
                        inputRef={register}
                        helperText={errors.email ? errors.email.message : undefined}
                    />
                </div>
                <span className="grantee-form-title">Quais os dados bancários do favorecido?</span>
                <div className="form-control">
                    <SelectBank onChange={onChangeBank} value={bank} register={register} errors={errors} disabled={isDisabled()} />
                    <StyledTextField
                        name="agency"
                        label="Qual a agência?"
                        size="small"
                        style={{ width: '30%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeAgency}
                        value={agency}
                        error={errors.agency ? true : false}
                        inputRef={register}
                        helperText={errors.agency ? errors.agency.message : undefined}
                        disabled={isDisabled()}
                    />
                    <StyledTextField
                        name="agencyDigit"
                        label="Digito"
                        size="small"
                        style={{ width: '10%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeAgencyDigit}
                        value={agencyDigit}
                        error={errors.agencyDigit ? true : false}
                        inputRef={register}
                        helperText={errors.agencyDigit ? errors.agencyDigit.message : undefined}
                        disabled={isDisabled()}
                    />
                </div>
                <div className="form-control">
                    <SelectAccountType onChange={onChangeAccountType} selected={accountType} register={register} errors={errors} bank={bank} disabled={isDisabled()} />
                    <StyledTextField
                        name="account"
                        label="Qual a conta corrente?"
                        size="small"
                        style={{ width: '30%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeAccount}
                        value={account}
                        error={errors.account ? true : false}
                        inputRef={register}
                        helperText={errors.account ? errors.account.message : undefined}
                        disabled={isDisabled()}
                    />
                    <StyledTextField
                        name="accountDigit"
                        label="Digito"
                        size="small"
                        style={{ width: '10%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeAccountDigit}
                        value={accountDigit}
                        error={errors.accountDigit ? true : false}
                        inputRef={register}
                        helperText={errors.accountDigit ? errors.accountDigit.message : undefined}
                        disabled={isDisabled()}
                    />
                </div>

                <div className="form-actions">
                    <StyledButton variant="outlined" size="large" onClick={_onClickCancel}>
                        Cancelar
                    </StyledButton>
                    <div>
                        {id && (
                            <Button
                                className={classes.deleteButton}
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<DeleteIcon />}
                                onClick={handleDelete}
                            />
                        )}
                        < StyledButton variant="contained" size="large" type="submit">
                            Salvar
                        </StyledButton>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default GranteeForm