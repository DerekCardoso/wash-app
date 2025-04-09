import { renderHook, act } from '@testing-library/react-hooks';
import { useAuth } from '../useAuth';

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const response = await result.current.register('test@example.com', 'password123', 'Test User');
      expect(response.success).toBe(true);
      expect(result.current.user).toBeTruthy();
    });
  });

  it('should handle registration with invalid email', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const response = await result.current.register('invalid-email', 'password123', 'Test User');
      expect(response.success).toBe(false);
      expect(response.error).toBe('Por favor, insira um email válido');
    });
  });

  it('should handle registration with weak password', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const response = await result.current.register('test@example.com', '123', 'Test User');
      expect(response.success).toBe(false);
      expect(response.error).toBe('A senha deve ter pelo menos 8 caracteres');
    });
  });

  it('should login successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const response = await result.current.login('test@example.com', 'password123');
      expect(response.success).toBe(true);
      expect(result.current.user).toBeTruthy();
    });
  });

  it('should handle login with invalid credentials', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const response = await result.current.login('wrong@example.com', 'wrongpass');
      expect(response.success).toBe(false);
      expect(response.error).toBe('Email ou senha inválidos');
    });
  });

  it('should logout successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.logout();
      expect(result.current.user).toBeNull();
    });
  });

  it('should reset password successfully', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const response = await result.current.resetPassword('test@example.com');
      expect(response.success).toBe(true);
    });
  });

  it('should handle password reset with invalid email', async () => {
    const { result } = renderHook(() => useAuth());

    await act(async () => {
      const response = await result.current.resetPassword('invalid-email');
      expect(response.success).toBe(false);
      expect(response.error).toBe('Por favor, insira um email válido');
    });
  });
}); 