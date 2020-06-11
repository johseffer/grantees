import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { setLocale, string, object } from 'yup';
import { navigate } from 'hookrouter'
import { useSnackbar } from 'notistack'
import { makeStyles } from '@material-ui/core/styles'
import StyledTextField from './../../../../components/styled-text-field/styled-text-field.component'
import StyledButton from './../../../../components/styled-button/styled-button.component'
import { getGranteeById, create, update, remove } from '../../../../gateways/grantee.gateway'
import SelectBank from './../../../../components/select-bank/select-bank.component'
import SelectAccountType from './../../../../components/select-account-type/select-account-type.component'
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
    const { enqueueSnackbar } = useSnackbar();

    const [grantee, setGrantee] = React.useState({ status: '0', accountType: '' });
    const [deleteConfirmationModalOpened, setDeleteConfirmationModalOpened] = React.useState(false);

    setLocale({
        mixed: {
            required: 'Campo obrigatório'
        }
    });


    const granteeSchema = () => {
        const isBankOfBrasil = grantee.bank === '001'
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
                setGrantee(response.data)
            })
        }
    }, [id])

    const isDisabled = () => {
        return id && grantee.status === '1'
    }

    const onChangeName = (e) => {
        setGrantee({ ...grantee, name: e.target.value })
    }

    const onChangeEmail = (e) => {
        setGrantee({ ...grantee, email: e.target.value })
    }

    const onChangeCpfCnpj = (e) => {
        setGrantee({ ...grantee, cpfCnpj: e.target.value })
    }

    const onChangeBank = (e, values) => {
        setGrantee({ ...grantee, bank: values.code })
    }

    const onChangeAgency = (e) => {
        setGrantee({ ...grantee, agency: e.target.value })
    }

    const onChangeAgencyDigit = (e) => {
        setGrantee({ ...grantee, agencyDigit: e.target.value })
    }

    const onChangeAccount = (e) => {
        setGrantee({ ...grantee, account: e.target.value })
    }

    const onChangeAccountType = (e) => {
        setGrantee({ ...grantee, accountType: e.target.value })
    }

    const onChangeAccountDigit = (e) => {
        setGrantee({ ...grantee, accountDigit: e.target.value })
    }

    const _onClickCancel = () => {
        onClickCancel()
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
        if (id) {
            update(id, grantee).then(response => {
                enqueueSnackbar('Favorecido alterado com sucesso', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 })
                onItemUpdated(grantee);
            })
        } else {
            create(grantee).then(response => {
                enqueueSnackbar('Favorecido incluído com sucesso', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 })
                navigate('/');
            })
        }
    }

    return (
        <div className="grantee-form-container">
            <DeleteConfirmationModal title="Excluir Favorecido" subtitle={`Você Confirma a exclusão do favorecido?`} description="O hitórico de pagamentos para este favorecido será mantido, mas ele será removido da sua lista de favorecidos." opened={deleteConfirmationModalOpened} handleClose={handleCloseModalDeleteConfirmation} handleConfirm={handleConfirmDelete} />
            <div className="grantee-name-title">
                <span>{grantee.name}</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} data-testid="grantee-form">
                <span className="grantee-form-title">Quais os dados do favorecido?</span>
                <div className="form-control">
                    <StyledTextField
                        name="name"
                        label="Qual o nome completo ou razão social do favorecido?"
                        size="small"
                        style={{ width: '75%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeName}
                        value={grantee.name}
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
                        value={grantee.cpfCnpj}
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
                        value={grantee.email}
                        error={errors.email ? true : false}
                        inputRef={register}
                        helperText={errors.email ? errors.email.message : undefined}
                    />
                </div>
                <span className="grantee-form-title">Quais os dados bancários do favorecido?</span>
                <div className="form-control">
                    <SelectBank onChange={onChangeBank} value={grantee.bank} register={register} errors={errors} disabled={isDisabled()} />
                    <StyledTextField
                        name="agency"
                        label="Qual a agência?"
                        size="small"
                        style={{ width: '30%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeAgency}
                        value={grantee.agency}
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
                        value={grantee.agencyDigit}
                        error={errors.agencyDigit ? true : false}
                        inputRef={register}
                        helperText={errors.agencyDigit ? errors.agencyDigit.message : undefined}
                        disabled={isDisabled()}
                    />
                </div>
                <div className="form-control">
                    <SelectAccountType onChange={onChangeAccountType} selected={grantee.accountType} register={register} errors={errors} bank={grantee.bank} disabled={isDisabled()} />
                    <StyledTextField
                        name="account"
                        label="Qual a conta corrente?"
                        size="small"
                        style={{ width: '30%' }}
                        InputLabelProps={{ shrink: true }}
                        onChange={onChangeAccount}
                        value={grantee.account}
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
                        value={grantee.accountDigit}
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
                                data-testid="deleteButton"
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