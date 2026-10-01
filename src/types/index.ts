export type OrderStatus = 
  | 'NEW' 
  | 'PICKING' 
  | 'VERIFICATION' 
  | 'PACKING' 
  | 'READY' 
  | 'HANDED_OVER' 
  | 'COMPLETED' 
  | 'CANCELLED';

export type VerificationStatus = 
  | 'PENDING' 
  | 'MATCHED' 
  | 'MISMATCH' 
  | 'MANUAL_REVIEW';

export type StockStatus = 
  | 'IN_STOCK' 
  | 'LOW_STOCK' 
  | 'OUT_OF_STOCK';

export type PackageStatus = 
  | 'CREATED' 
  | 'READY' 
  | 'HANDED_OVER';

export type AdjustmentReason = 
  | 'Stock Received' 
  | 'Damaged' 
  | 'Lost' 
  | 'Manual Correction' 
  | 'Returned';

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  sku: string;
  barcode: string;
  size: string;
  color: string;
  colorHex: string;
  price: number;
  quantity: number;
  pickedQuantity: number;
  verifiedQuantity: number;
  imageUrl: string;
  isPicked: boolean;
  isVerified: boolean;
}

export interface Order {
  id: string; // e.g. #WN10245
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  dueTime: string;
  createdAt: string;
  verificationStatus: VerificationStatus;
  evidenceCount: number;
  packageId?: string;
  deliveryCaptain?: {
    id: string;
    name: string;
    phone: string;
    vehicleNumber: string;
    photoUrl: string;
  };
}

export interface ProductVariant {
  id: string;
  sku: string;
  barcode: string;
  size: string;
  color: string;
  colorHex: string;
  stock: number;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  basePrice: number;
  mrp: number;
  primaryImage: string;
  images: string[];
  stockStatus: StockStatus;
  totalStock: number;
  variants: ProductVariant[];
  skuBase: string;
  createdAt: string;
}

export interface InventoryTransaction {
  id: string;
  productId: string;
  productName: string;
  sku: string;
  change: number; // positive or negative
  reason: AdjustmentReason;
  timestamp: string;
  executive: string;
  notes?: string;
}

export interface PackageItem {
  packageId: string;
  orderId: string;
  storeName: string;
  itemsCount: number;
  evidenceCount: number;
  createdAt: string;
  status: PackageStatus;
  qrCodeUrl: string;
  deliveryPartner?: string;
  handoverTime?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'inventory' | 'verification' | 'handover' | 'system';
  isRead: boolean;
  orderId?: string;
}

export interface ExecutiveProfile {
  name: string;
  employeeId: string;
  role: string;
  storeName: string;
  storeId: string;
  phone: string;
  email: string;
  avatarUrl: string;
  todayFulfilled: number;
  accuracyRate: string;
  isOnline: boolean;
}
