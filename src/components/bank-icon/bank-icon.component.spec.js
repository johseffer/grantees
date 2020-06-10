import React from 'react';
import { render } from '@testing-library/react';
import BankIcon from './bank-icon.component'

import generalIcon from './images/general.png'
import bradescoIcon from './images/bradesco.PNG'
import caixaIcon from './images/caixa.png'
import sicoobIcon from './images/sicoob.png'

test('renders image of Banco do Brasil', () => {
    const { getByRole } = render(<BankIcon bank="001" />);

    const image = getByRole('img')

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', generalIcon);
});

test('renders image of Bradesco', () => {
    const { getByRole } = render(<BankIcon bank="237" />);

    const image = getByRole('img')

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', bradescoIcon);
});

test('renders image of Caixa', () => {
    const { getByRole } = render(<BankIcon bank="104" />);

    const image = getByRole('img')

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', caixaIcon);
});

test('renders image of Sicoob', () => {
    const { getByRole } = render(<BankIcon bank="756" />);

    const image = getByRole('img')

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', sicoobIcon);
});
