import React from 'react'
import 'mutationobserver-shim';
import GranteeList from './grantee-list.component'
import { useSnackbar } from 'notistack'
import { render, fireEvent, waitFor, waitForElement } from '@testing-library/react'
import { getGrantees } from './../../../../gateways/grantee.gateway'

jest.mock('notistack')
jest.mock('./../../../../gateways/grantee.gateway')
global.MutationObserver = window.MutationObserver;

const enqueueSnackbarMock = jest.fn()
const granteeOne = {
    name: 'Barbara',
    email: 'barbara@gmail.com',
    cpfCnpj: '12345678910',
    bank: '001',
    agency: '1',
    agencyDigit: '1',
    accountType: '2',
    account: '1',
    accountDigit: '1',
    status: '0'
}
const granteeTwo = {
    name: 'Jorge',
    email: 'jorge@gmail.com',
    cpfCnpj: '12345678910',
    bank: '237',
    agency: '1',
    agencyDigit: '1',
    accountType: '1',
    account: '1',
    accountDigit: '1',
    status: '0'
}
describe('GranteeList', () => {
    beforeEach(() => {
        useSnackbar.mockImplementation(() => {
            return {
                enqueueSnackbar: enqueueSnackbarMock
            }
        })
        getGrantees.mockResolvedValueOnce({
            data: [
                granteeOne
            ]
        })
    })

    test('Render headers and load data when filter is blank', () => {
        const { getByText } = render(<GranteeList filter="" />);

        const nameHeader = getByText('Favorecido')
        const cnpfCnpjHeader = getByText('CPF / CNPJ')
        const bankHeader = getByText('Banco')
        const agencyHeader = getByText('Agência')
        const accountHeader = getByText('CC')
        const statusHeader = getByText('Status do Favorecido')

        expect(nameHeader).toBeInTheDocument()
        expect(cnpfCnpjHeader).toBeInTheDocument()
        expect(bankHeader).toBeInTheDocument()
        expect(agencyHeader).toBeInTheDocument()
        expect(accountHeader).toBeInTheDocument()
        expect(statusHeader).toBeInTheDocument()
        expect(getGrantees).toHaveBeenCalledWith('')
    });

    test('Render list and load data when filter is filled', () => {
        render(<GranteeList filter="Bar" />);

        expect(getGrantees).toHaveBeenCalledWith('Bar')
    });
})