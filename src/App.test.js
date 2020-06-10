import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders nav element', () => {
  const { getByTestId } = render(<App />);

  const navElement = getByTestId('navbar')

  expect(navElement).toBeInTheDocument();
});
