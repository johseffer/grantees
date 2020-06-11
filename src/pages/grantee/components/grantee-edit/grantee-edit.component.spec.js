import React from 'react'
import 'mutationobserver-shim';
import { useSnackbar } from 'notistack'
import { render, fireEvent, waitForElement, waitFor } from '@testing-library/react'
import GranteeEdit from './grantee-edit.component'
import { getGranteeById, update, remove } from '../../../../gateways/grantee.gateway';

jest.mock('./../../../../gateways/grantee.gateway')
jest.mock('notistack')
global.MutationObserver = window.MutationObserver;

const enqueueSnackbarMock = jest.fn()
describe('GranteeEdit', () => {
    beforeEach(() => {
        useSnackbar.mockImplementation(() => {
            return {
                enqueueSnackbar: enqueueSnackbarMock
            }
        })
        getGranteeById.mockResolvedValueOnce({
            data: {
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
        })
        update.mockResolvedValueOnce({ data: {} })
        remove.mockResolvedValueOnce({ data: {} })
    })

    test('Dont show modal when opened equal false', () => {
        const { queryByText } = render(<GranteeEdit id={1} opened={false} />);

        const title = queryByText('Quais os dados do favorecido?')

        expect(title).not.toBeInTheDocument();
    });

    test('render modal when opened equal true', () => {
        const { queryByText } = render(<GranteeEdit id={1} opened={true} />);

        const title = queryByText('Quais os dados do favorecido?')

        expect(title).toBeInTheDocument()
        expect(getGranteeById).toHaveBeenCalledWith(1)
    });

    test('Call handleClose when click cancel button', () => {
        const handleCancelMock = jest.fn()

        const { getByText } = render(<GranteeEdit id={1} opened={true} handleClose={handleCancelMock} />);

        const cancelButton = getByText('Cancelar')
        fireEvent.click(cancelButton)

        expect(handleCancelMock).toHaveBeenCalledTimes(1)
    });

    test('Call onItemUpdated when click submit button', async (done) => {
        const onItemUpdatedMock = jest.fn()

        const { getByText, getByTestId } = render(<GranteeEdit id={1} opened={true} onItemUpdated={onItemUpdatedMock} />);

        await waitFor(() => {
            expect(getByText('Name')).toBeInTheDocument()
        }, { timeout: 10000 })

        const form = getByTestId('grantee-form')
        fireEvent.submit(form)

        await waitFor(() => {
            expect(update).toHaveBeenCalledTimes(1)
            expect(onItemUpdatedMock).toHaveBeenCalledTimes(1)
            expect(enqueueSnackbarMock).toHaveBeenCalledTimes(1)
            expect(enqueueSnackbarMock).toHaveBeenCalledWith('Favorecido alterado com sucesso', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'right' }, autoHideDuration: 6000 })
            done()
        })
    });

    test('Call onItemDeleted when click delete button', async (done) => {
        const onItemDeletedMock = jest.fn()

        const { getByTestId, getByText } = render(<GranteeEdit id={1} opened={true} onItemDeleted={onItemDeletedMock} />);

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