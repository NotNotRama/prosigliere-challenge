import { render, screen, fireEvent } from '@testing-library/react';
import { Navbar } from './Navbar';
import { describe, it, expect, vi } from 'vitest';

describe('Navbar', () => {
  const mockSetHouse = vi.fn();

  it('renders the navigation links', () => {
    render(<Navbar house="gryffindor" setHouse={mockSetHouse} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Staff')).toBeInTheDocument();
    expect(screen.getByText('Students')).toBeInTheDocument();
    expect(screen.getByText('Favourites')).toBeInTheDocument();
  });

  it('renders the house selection options', () => {
    render(<Navbar house="gryffindor" setHouse={mockSetHouse} />);
    expect(screen.getByLabelText('gryffindor')).toBeInTheDocument();
    expect(screen.getByLabelText('slytherin')).toBeInTheDocument();
    expect(screen.getByLabelText('hufflepuff')).toBeInTheDocument();
    expect(screen.getByLabelText('ravenclaw')).toBeInTheDocument();
  });

  it('calls the setHouse function when a house is selected', () => {
    render(<Navbar house="gryffindor" setHouse={mockSetHouse} />);
    fireEvent.click(screen.getByLabelText('slytherin'));
    expect(mockSetHouse).toHaveBeenCalledWith('slytherin');
  });
});
