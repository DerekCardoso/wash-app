import { renderHook, act } from '@testing-library/react-hooks';
import { useOrders } from '../useOrders';
import { Order, OrderStatus, PaymentStatus } from '../../types';
import { collection, doc, getDocs, setDoc, updateDoc, query, where, orderBy, getDoc } from 'firebase/firestore';

// Mock do Firebase
jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDocs: jest.fn(),
  getDoc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn()
}));

// Mock do db
jest.mock('../../constants/firebase', () => ({
  db: {}
}));

describe('useOrders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve buscar pedidos do cliente com sucesso', async () => {
    const mockOrders = [
      {
        id: '1',
        customerId: '123',
        carWashId: '456',
        vehicleId: '789',
        services: ['101'],
        status: 'pending' as OrderStatus,
        scheduledTime: new Date(),
        totalPrice: 50,
        paymentStatus: 'pending' as PaymentStatus,
        createdAt: new Date()
      }
    ];

    (getDocs as jest.Mock).mockResolvedValueOnce({
      docs: mockOrders.map(order => ({
        data: () => order
      }))
    });

    const { result } = renderHook(() => useOrders());

    let orders: Order[] = [];
    await act(async () => {
      orders = await result.current.getCustomerOrders('123');
    });

    expect(orders).toEqual(mockOrders);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve buscar pedidos do lava-rápido com sucesso', async () => {
    const mockOrders = [
      {
        id: '1',
        customerId: '123',
        carWashId: '456',
        vehicleId: '789',
        services: ['101'],
        status: 'pending' as OrderStatus,
        scheduledTime: new Date(),
        totalPrice: 50,
        paymentStatus: 'pending' as PaymentStatus,
        createdAt: new Date()
      }
    ];

    (getDocs as jest.Mock).mockResolvedValueOnce({
      docs: mockOrders.map(order => ({
        data: () => order
      }))
    });

    const { result } = renderHook(() => useOrders());

    let orders: Order[] = [];
    await act(async () => {
      orders = await result.current.getCarWashOrders('456');
    });

    expect(orders).toEqual(mockOrders);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve buscar um pedido específico com sucesso', async () => {
    const mockOrder = {
      id: '1',
      customerId: '123',
      carWashId: '456',
      vehicleId: '789',
      services: ['101'],
      status: 'pending' as OrderStatus,
      scheduledTime: new Date(),
      totalPrice: 50,
      paymentStatus: 'pending' as PaymentStatus,
      createdAt: new Date()
    };

    (getDoc as jest.Mock).mockResolvedValueOnce({
      exists: () => true,
      data: () => mockOrder
    });

    const { result } = renderHook(() => useOrders());

    let order: Order | undefined;
    await act(async () => {
      order = await result.current.getOrder('1');
    });

    expect(order).toEqual(mockOrder);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve criar um novo pedido com sucesso', async () => {
    const newOrder: Omit<Order, 'id' | 'createdAt'> = {
      customerId: '123',
      carWashId: '456',
      vehicleId: '789',
      services: ['101'],
      status: 'pending',
      scheduledTime: new Date(),
      totalPrice: 50,
      paymentStatus: 'pending'
    };

    const mockDocRef = { id: 'new-order-id' };
    (doc as jest.Mock).mockReturnValueOnce(mockDocRef);
    (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useOrders());

    await act(async () => {
      const orderId = await result.current.createOrder(newOrder);
      expect(orderId).toBe(mockDocRef.id);
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve tratar erro ao criar pedido com dados inválidos', async () => {
    const invalidOrder = {} as Omit<Order, 'id' | 'createdAt'>;

    (setDoc as jest.Mock).mockRejectedValueOnce(new Error('Erro ao criar pedido'));

    const { result } = renderHook(() => useOrders());

    await act(async () => {
      try {
        await result.current.createOrder(invalidOrder);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao criar pedido');
  });

  it('deve atualizar o status do pagamento com sucesso', async () => {
    const orderId = '123';

    (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useOrders());

    await act(async () => {
      await result.current.updatePaymentStatus(orderId, 'paid');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve cancelar um pedido com sucesso', async () => {
    const orderId = '123';

    (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderHook(() => useOrders());

    await act(async () => {
      await result.current.updateOrderStatus(orderId, 'cancelled');
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deve tratar erro ao cancelar pedido com ID inválido', async () => {
    const invalidOrderId = '';

    (updateDoc as jest.Mock).mockRejectedValueOnce(new Error('Erro ao atualizar status do pedido'));

    const { result } = renderHook(() => useOrders());

    await act(async () => {
      try {
        await result.current.updateOrderStatus(invalidOrderId, 'cancelled');
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Erro ao atualizar status do pedido');
  });
}); 