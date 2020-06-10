import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import SelectAccountType from './select-account-type.component'

const onChangeMock = jest.fn()
const formMock = jest.fn()

test('render label', () => {
    const { getByText } = render(<SelectAccountType bank="001" onChange={onChangeMock} register={formMock} errors={[]} />);

    const label = getByText('Qual o tipo de conta?')

    expect(label).toBeInTheDocument();
});

test('render options when bank is Banco do Brasil', () => {
    const { getByText, getByTestId } = render(<SelectAccountType bank="001" onChange={onChangeMock} register={formMock} errors={[]} />);

    const selectAccountType = getByTestId('select-account-type')
    fireEvent.mouseDown(selectAccountType)

    expect(getByText("Conta Corrente")).toBeInTheDocument()
    expect(getByText("Conta Poupança")).toBeInTheDocument()
    expect(getByText("Conta Fácil")).toBeInTheDocument()
});

test('render options when bank is not Banco do Brasil', () => {
    const { getByText, getByTestId, queryByText } = render(<SelectAccountType bank="756" onChange={onChangeMock} register={formMock} errors={[]} />);

    const selectAccountType = getByTestId('select-account-type')
    fireEvent.mouseDown(selectAccountType)

    expect(getByText("Conta Corrente")).toBeInTheDocument()
    expect(getByText("Conta Poupança")).toBeInTheDocument()
    expect(queryByText("Conta Fácil")).not.toBeInTheDocument()
});

test('render selected option', () => {
    const { getByText } = render(<SelectAccountType bank="001" onChange={onChangeMock} register={formMock} errors={[]} selected="1" />);

    const filledInput = getByText('Conta Corrente')

    expect(filledInput).toBeInTheDocument();
});