import React from 'react'
import 'mutationobserver-shim';
import { useSnackbar } from 'notistack'
import { render, fireEvent, waitFor, waitForElement } from '@testing-library/react'
import { getGranteeById, create, update, remove } from '../../../../gateways/grantee.gateway';
import GranteeForm from './grantee-form.component'

jest.mock('./../../../../gateways/grantee.gateway')
jest.mock('notistack')
global.MutationObserver = window.MutationObserver;

global.document.createRange = () => ({
    setStart: () => { },
    setEnd: () => { },
    commonAncestorContainer: {
        nodeName: 'BODY',
        ownerDocument: document,
    },
});

const enqueueSnackbarMock = jest.fn()
const grantee = {
    name: 'Name',
    cpfCnpj: '12345678910',
    email: 'test@test.com',
    bank: '001',
    agency: '1',
    agencyDigit: '1',
    accountType: '1',
    account: '1',
    accountDigit: '1',
    status: '0'
}
describe('GranteeForm', () => {
    beforeEach(() => {
        useSnackbar.mockImplementation(() => {
            return {
                enqueueSnackbar: enqueueSnackbarMock
            }
        })
        getGranteeById.mockResolvedValueOnce({
            data: grantee
        })
        create.mockResolvedValueOnce({ data: {} })
        update.mockResolvedValueOnce({ data: {} })
        remove.mockResolvedValueOnce({ data: {} })
    })

    test('Render form when dont haves id', () => {
        const { getByText, getAllByText } = render(<GranteeForm id={undefined} />);

        const granteeDataTitle = getByText('Quais os dados do favorecido?')
        const name = getByText('Qual o nome completo ou razão social do favorecido?')
        const cpfCnpj = getByText('Qual o CPF ou CNPJ?')
        const email = getByText('Qual o email do favorecido?')
        const bankRegionTitle = getByText('Quais os dados bancários do favorecido?')
        const bank = getByText('Qual o banco do favorecido?')
        const agency = getByText('Qual a agência?')
        const digit = getAllByText('Digito')
        const accountType = getByText('Qual o tipo de conta?')
        const account = getByText('Qual a conta corrente?')

        expect(granteeDataTitle).toBeInTheDocument();
        expect(name).toBeInTheDocument();
        expect(cpfCnpj).toBeInTheDocument();
        expect(email).toBeInTheDocument();
        expect(bankRegionTitle).toBeInTheDocument();
        expect(bank).toBeInTheDocument();
        expect(agency).toBeInTheDocument();
        expect(digit).toHaveLength(2)
        expect(accountType).toBeInTheDocument();
        expect(account).toBeInTheDocument();
        expect(getGranteeById).not.toHaveBeenCalled()
    });

    test('Render form when haves id', async (done) => {
        const { getByText, getAllByText } = render(<GranteeForm id={1} />);

        await waitFor(() => {
            expect(getByText('Name')).toBeInTheDocument()
            done()
        }, { timeout: 10000 })

        const granteeDataRegionTitle = getByText('Quais os dados do favorecido?')

        const nameLabel = getByText('Qual o nome completo ou razão social do favorecido?')
        const nameInput = document.getElementsByName('name')[0]

        const cpfCnpjLabel = getByText('Qual o CPF ou CNPJ?')
        const cpfCnpjInput = document.getElementsByName('cpfCnpj')[0]

        const emailLabel = getByText('Qual o email do favorecido?')
        const emailInput = document.getElementsByName('email')[0]

        const bankRegionTitle = getByText('Quais os dados bancários do favorecido?')
        const bankLabel = getByText('Qual o banco do favorecido?')
        const bankInput = document.getElementsByName('bank')[0]

        const agencyLabel = getByText('Qual a agência?')
        const agencyInput = document.getElementsByName('agency')[0]
        const agencyDigitInput = document.getElementsByName('agencyDigit')[0]

        const accountTypeLabel = getByText('Qual o tipo de conta?')
        const accountTypeInput = document.getElementsByName('accountType')[0]

        const digitLabel = getAllByText('Digito')

        const accountLabel = getByText('Qual a conta corrente?')
        const accountInput = document.getElementsByName('account')[0]
        const accountDigitInput = document.getElementsByName('accountDigit')[0]

        expect(getGranteeById).toHaveBeenCalledTimes(1)
        expect(getGranteeById).toHaveBeenCalledWith(1)
        expect(granteeDataRegionTitle).toBeInTheDocument()
        expect(nameLabel).toBeInTheDocument()
        expect(nameInput).toHaveValue(grantee.name)
        expect(cpfCnpjLabel).toBeInTheDocument()
        expect(cpfCnpjInput).toHaveValue(grantee.cpfCnpj)
        expect(emailLabel).toBeInTheDocument()
        expect(emailInput).toHaveValue(grantee.email)
        expect(bankRegionTitle).toBeInTheDocument()
        expect(bankLabel).toBeInTheDocument()
        expect(bankInput).toHaveValue('Banco do Brasil (001)')
        expect(agencyLabel).toBeInTheDocument()
        expect(agencyInput).toHaveValue(grantee.agency)
        expect(agencyDigitInput).toHaveValue(grantee.agencyDigit)
        expect(accountTypeLabel).toBeInTheDocument()
        expect(accountTypeInput).toHaveValue(grantee.accountType)
        expect(accountLabel).toBeInTheDocument()
        expect(accountInput).toHaveValue(grantee.account)
        expect(accountDigitInput).toHaveValue(grantee.accountDigit)
        expect(digitLabel).toHaveLength(2)
    });

    test('Call handleClose when click cancel button', () => {
        const handleCancelMock = jest.fn()

        const { getByText } = render(<GranteeForm id={undefined} onClickCancel={handleCancelMock} />);

        const cancelButton = getByText('Cancelar')
        fireEvent.click(cancelButton)

        expect(handleCancelMock).toHaveBeenCalledTimes(1)
    });

    test('dont call create when click submit and dont have id without fill fields', () => {
        const { getByTestId } = render(<GranteeForm id={undefined} />);

        const form = getByTestId('grantee-form')
        fireEvent.submit(form)

        expect(create).not.toHaveBeenCalled()
    });

    test('call create when click submit and dont have id after fill fields', async (done) => {
        const { getByTestId, getByText } = render(<GranteeForm id={undefined} />);

        const nameInput = document.getElementsByName('name')[0]
        fireEvent.change(nameInput, { target: { value: 'Sama' } });

        const cpfCnpjInput = document.getElementsByName('cpfCnpj')[0]
        fireEvent.change(cpfCnpjInput, { target: { value: '12345678910' } });

        const emailInput = document.getElementsByName('email')[0]
        fireEvent.change(emailInput, { target: { value: 'sama@sama.com' } });

        const bankInput = document.getElementsByName('bank')[0]
        bankInput.focus()
        fireEvent.change(document.activeElement, { target: { value: '001' } })
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' })
        fireEvent.keyDown(document.activeElement, { key: 'Enter' })

        const agencyInput = document.getElementsByName('agency')[0]
        fireEvent.change(agencyInput, { target: { value: '1' } });

        const agencyDigitInput = document.getElementsByName('agencyDigit')[0]
        fireEvent.change(agencyDigitInput, { target: { value: '1' } });

        const selectAccountType = getByTestId('select-account-type')
        fireEvent.mouseDown(selectAccountType)
        fireEvent.click(getByText("Conta Poupança"))

        const accountInput = document.getElementsByName('account')[0]
        fireEvent.change(accountInput, { target: { value: '1' } });

        const accountDigitInput = document.getElementsByName('accountDigit')[0]
        fireEvent.change(accountDigitInput, { target: { value: '1' } });

        const form = getByTestId('grantee-form')
        fireEvent.submit(form)

        await waitFor(() => {
            expect(enqueueSnackbarMock).toHaveBeenCalledWith('Favorecido incluído com sucesso', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 })
            expect(create).toHaveBeenCalledWith({
                name: 'Sama',
                cpfCnpj: '12345678910',
                email: 'sama@sama.com',
                bank: '001',
                agency: '1',
                agencyDigit: '1',
                accountType: '2',
                account: '1',
                accountDigit: '1',
                status: '0'
            })
            done()
        }, { timeout: 10000 })
    });

    test('Call onItemUpdated when haves id and click submit button', async (done) => {
        const onItemUpdatedMock = jest.fn()

        const { getByText, getByTestId } = render(<GranteeForm id={1} onItemUpdated={onItemUpdatedMock} />);

        await waitFor(() => {
            expect(getByText('Name')).toBeInTheDocument()
        }, { timeout: 10000 })

        const form = getByTestId('grantee-form')
        fireEvent.submit(form)

        await waitFor(() => {
            expect(update).toHaveBeenCalledTimes(1)
            expect(onItemUpdatedMock).toHaveBeenCalledTimes(1)
            expect(enqueueSnackbarMock).toHaveBeenCalledWith('Favorecido alterado com sucesso', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 })
            done()
        })
    });

    test('Call onItemDeleted when click delete button', async (done) => {
        const onItemDeletedMock = jest.fn()

        const { getByTestId, getByText } = render(<GranteeForm id={1} onItemDeleted={onItemDeletedMock} />);

        const deleteButton = await waitForElement(() => getByTestId('deleteButton'))
        fireEvent.click(deleteButton)

        const confirmDeleteButton = await waitForElement(() => getByText('Confirmar Exclusão'))
        fireEvent.click(confirmDeleteButton)

        await waitFor(() => {
            expect(remove).toHaveBeenCalledTimes(1)
            expect(onItemDeletedMock).toHaveBeenCalledTimes(1)
            done()
        })
    });
})