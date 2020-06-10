import React from 'react';
import { render, fireEvent } from '@testing-library/react'
import SelectBank from './select-bank.component'

const onChangeMock = jest.fn()
const formMock = jest.fn()

test('render label', () => {
    const { getByText } = render(<SelectBank onChange={onChangeMock} register={formMock} errors={[]} />);

    const label = getByText('Qual o banco do favorecido?')

    expect(label).toBeInTheDocument();
});