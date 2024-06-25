import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTopic from '../app/addTopic/page'; // Sesuaikan path sesuai struktur proyek Anda
import { useRouter } from 'next/navigation'; // Menggunakan useRouter dari next/navigation

// Mock next/navigation
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

    expect(screen.getByPlaceholderText('Tambahkan Tanggal')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tambahkan Suhu')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tambahkan Berat Badan')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tambahkan Tekanan Darah')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Masukkan Informasi Tambahan')).toBeInTheDocument();
    expect(screen.getByText('Tambahkan Catatan Baru')).toBeInTheDocument();
  });

  it('shows an alert if any required field is missing', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(<AddTopic />);

    fireEvent.click(screen.getByText('Tambahkan Catatan Baru'));

    expect(window.alert).toHaveBeenCalledWith('All fields are required.');
  });

  it('submits the form and redirects on success', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    render(<AddTopic />);

    fireEvent.change(screen.getByPlaceholderText('Tambahkan Tanggal'), { target: { value: '2023-06-25' } });
    fireEvent.change(screen.getByPlaceholderText('Tambahkan Suhu'), { target: { value: '36.5' } });
    fireEvent.change(screen.getByPlaceholderText('Tambahkan Berat Badan'), { target: { value: '70' } });
    fireEvent.change(screen.getByPlaceholderText('Tambahkan Tekanan Darah'), { target: { value: '120/80' } });
    fireEvent.change(screen.getByPlaceholderText('Masukkan Informasi Tambahan'), { target: { value: 'Feeling good' } });

    fireEvent.click(screen.getByText('Tambahkan Catatan Baru'));

    // Tunggu proses asinkron selesai sebelum melakukan asersi
    await screen.findByText('Tambahkan Catatan Baru');

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/topics'), expect.any(Object));
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });

  it('handles fetch failure', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
    console.error = jest.fn();
  
    render(<AddTopic />);
  
    fireEvent.change(screen.getByPlaceholderText('Tambahkan Tanggal'), { target: { value: '2023-06-25' } });
    fireEvent.change(screen.getByPlaceholderText('Tambahkan Suhu'), { target: { value: '36.5' } });
    fireEvent.change(screen.getByPlaceholderText('Tambahkan Berat Badan'), { target: { value: '70' } });
    fireEvent.change(screen.getByPlaceholderText('Tambahkan Tekanan Darah'), { target: { value: '120/80' } });
    fireEvent.change(screen.getByPlaceholderText('Masukkan Informasi Tambahan'), { target: { value: 'Feeling good' } });
  
    fireEvent.click(screen.getByText('Tambahkan Catatan Baru'));
  
    // Tunggu proses asinkron selesai sebelum melakukan asersi
    await screen.findByText('Tambahkan Catatan Baru');
  
    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/api/topics'), expect.any(Object));
    expect(console.error).toHaveBeenCalledWith(expect.stringContaining('Error submitting form:'), expect.any(Error));
  });
});