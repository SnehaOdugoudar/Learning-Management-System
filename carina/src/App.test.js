import { render, screen } from '@testing-library/react';
import App from './App';

test('renders view courses by faculty and semester heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/View Courses by Faculty and Semester/i);
  expect(headingElement).toBeInTheDocument();
});

