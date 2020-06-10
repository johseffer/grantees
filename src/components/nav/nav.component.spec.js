import React from 'react';
import { render } from '@testing-library/react';
import Nav from './nav.component'

import transfeeraIcon from './images/transfeera-logo-verde.svg';


test('render container', () => {
    const { getByTestId } = render(<Nav />);

    const navElement = getByTestId('navbar')

    expect(navElement).toBeInTheDocument();
});

test('render transfeera icon', () => {
    const { getByRole } = render(<Nav />)

    const icon = getByRole('img')

    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('src', transfeeraIcon)
});

test('render app tabs', () => {
    const { getByText } = render(<Nav />)

    const granteesTab = getByText('Seus Favorecidos')

    expect(granteesTab).toBeInTheDocument()
});
