export type UserType = 'customer' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  createdAt: Date;
}

export interface Customer extends User {
  userType: 'customer';
  vehicles: Vehicle[];
}

export interface Owner extends User {
  userType: 'owner';
  carWashId: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  color: string;
  ownerId: string;
}

export interface CarWash {
  id: string;
  name: string;
  ownerId: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  services: Service[];
  workingHours: WorkingHours[];
  rating: number;
  totalRatings: number;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // em minutos
  carWashId: string;
}

export interface WorkingHours {
  dayOfWeek: number; // 0-6 (Domingo-Sábado)
  openTime: string; // HH:mm
  closeTime: string; // HH:mm
  isOpen: boolean;
}

export interface Order {
  id: string;
  customerId: string;
  carWashId: string;
  vehicleId: string;
  services: string[]; // IDs dos serviços
  status: OrderStatus;
  scheduledTime: Date;
  startTime?: Date;
  endTime?: Date;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  rating?: number;
  createdAt: Date;
}

export type OrderStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export interface Rating {
  id: string;
  orderId: string;
  customerId: string;
  carWashId: string;
  score: number;
  comment?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  orderId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  read: boolean;
}

export interface LoyaltyProgram {
  id: string;
  carWashId: string;
  pointsPerService: number;
  pointsForFreeService: number;
  active: boolean;
}

export interface CustomerLoyalty {
  id: string;
  customerId: string;
  carWashId: string;
  points: number;
  lastUpdate: Date;
}

export interface PerformanceReport {
  id: string;
  carWashId: string;
  period: {
    start: Date;
    end: Date;
  };
  totalRevenue: number;
  totalOrders: number;
  averageRating: number;
  popularServices: {
    serviceId: string;
    count: number;
    revenue: number;
  }[];
  customerGrowth: number;
  peakHours: {
    hour: number;
    orders: number;
  }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  body: string;
  data?: {
    orderId?: string;
    carWashId?: string;
  };
  read: boolean;
  createdAt: Date;
} 