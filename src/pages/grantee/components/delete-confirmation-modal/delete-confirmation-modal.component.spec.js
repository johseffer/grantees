import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import DeleteConfirmationModal from './delete-confirmation-modal.component'

test('Dont show modal when opened equal false', () => {
    const { queryByText } = render(<DeleteConfirmationModal title={'Título'} opened={false} />);

    const title = queryByText('Título')

    expect(title).not.toBeInTheDocument();
});

test('render modal when opened equal true', () => {
    const { getByText } = render(<DeleteConfirmationModal title="Título" subtitle="Subtítulo" description="Descrição" opened={true} />);

    const title = getByText('Título')
    const subtitle = getByText('Subtítulo')
    const description = getByText('Descrição')
    const cancelButton = getByText('Cancelar')
    const confirmButton = getByText('Confirmar Exclusão')

    expect(title).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(cancelButton).toBeInTheDocument();
    expect(confirmButton).toBeInTheDocument();
});

test('Call handleClose when click cancel button', () => {
    const handleCancelMock = jest.fn()
    const { getByText } = render(<DeleteConfirmationModal title={'Título'} opened={true} handleClose={handleCancelMock} />);

    const cancelButton = getByText('Cancelar')
    fireEvent.click(cancelButton)

    expect(handleCancelMock).toHaveBeenCalledTimes(1)
});

test('Call handleConfirm when click confirm button', () => {
    const handleConfirmMock = jest.fn()
    const { getByText } = render(<DeleteConfirmationModal title={'Título'} opened={true} handleConfirm={handleConfirmMock} />);

    const confirmButton = getByText('Confirmar Exclusão')
    fireEvent.click(confirmButton)

    expect(handleConfirmMock).toHaveBeenCalledTimes(1)
});