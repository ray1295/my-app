import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './page';

describe('Home component', () => {

  beforeAll(() => {
    HTMLFormElement.prototype.requestSubmit = function () {
      this.submit(); // Fallback to submit if requestSubmit isn't available
    };
  });

  
  it('renders the registration form', () => {
    render(<Home />);
    
    // Check if the main heading is present
    expect(screen.getByRole('heading', { name: /register/i })).toBeInTheDocument();

    // Check if all form fields are present
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Check if the submit button is present
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('handles form submission', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    render(<Home />);

    // Fill out the form
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    // Check if the console.log was called (since that's what handleSubmit does)
    expect(consoleSpy).toHaveBeenCalledWith('FORM');

    consoleSpy.mockRestore();
  });
});