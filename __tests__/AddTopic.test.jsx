// __tests__/AddTopic.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Correct import
import AddTopic from '../app/addTopic/page';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AddTopic', () => {
  const mockRouter = { push: jest.fn() };
  beforeEach(() => {
    useRouter.mockReturnValue(mockRouter);
  });

  it('renders the form with input fields and submit button', () => {
    render(<AddTopic />);

    expect(screen.getByPlaceholderText('Topic Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Topic Description')).toBeInTheDocument();
    expect(screen.getByText('Add Topic')).toBeInTheDocument();
  });

  it('shows an alert if title or description is missing', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<AddTopic />);

    fireEvent.click(screen.getByText('Add Topic'));

    expect(window.alert).toHaveBeenCalledWith('Title and description are required.');
  });

  it('submits the form and redirects on success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    render(<AddTopic />);

    fireEvent.change(screen.getByPlaceholderText('Topic Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Topic Description'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Add Topic'));

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/topics'), expect.any(Object));
    expect(await screen.findByText('Add Topic')).toBeInTheDocument();
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('handles fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    console.log = jest.fn();

    render(<AddTopic />);

    fireEvent.change(screen.getByPlaceholderText('Topic Title'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByPlaceholderText('Topic Description'), { target: { value: 'Test Description' } });
    fireEvent.click(screen.getByText('Add Topic'));

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/topics'), expect.any(Object));
    expect(await screen.findByText('Add Topic')).toBeInTheDocument();
    expect(console.log).toHaveBeenCalledWith(new Error('Failed to create a topic'));
  });
});
