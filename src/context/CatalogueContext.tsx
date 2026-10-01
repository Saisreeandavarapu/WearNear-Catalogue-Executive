import React, { createContext, useContext, useState } from 'react';
import { 
  Order, 
  Product, 
  InventoryTransaction, 
  PackageItem, 
  NotificationItem, 
  ExecutiveProfile,
  AdjustmentReason,
  OrderStatus
} from '../types';

// Mock Initial Fashion Imagery
const IMG_JACKET = "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80";
const IMG_SHIRT = "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80";
const IMG_CHINO = "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80";
const IMG_DRESS = "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80";
const IMG_TEE = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80";

const initialOrders: Order[] = [
  {
    id: 'WN10245',
    customerName: 'Aarav Mehta',
    customerPhone: '+91 98765 43210',
    deliveryAddress: 'Suite 402, Signature Towers, Connaught Place, New Delhi',
    status: 'PICKING',
    dueTime: '12:30 PM Today',
    createdAt: '10:15 AM',
    verificationStatus: 'PENDING',
    totalAmount: 4998,
    evidenceCount: 0,
    items: [
      {
        id: 'item-1',
        productId: 'prod-1',
        name: 'Midnight Navy Italian Tailored Linen Shirt',
        sku: 'WN-SHIRT-NAV-L',
        barcode: 'WN890123456789',
        size: 'L',
        color: 'Midnight Navy',
        colorHex: '#172B82',
        price: 2499,
        quantity: 1,
        pickedQuantity: 1,
        verifiedQuantity: 0,
        imageUrl: IMG_SHIRT,
        isPicked: true,
        isVerified: false,
      },
      {
        id: 'item-2',
        productId: 'prod-2',
        name: 'Slim Fit Cotton Stretch Chino',
        sku: 'WN-CHINO-BEI-32',
        barcode: 'WN890987654321',
        size: '32',
        color: 'Beige',
        colorHex: '#D4C3A3',
        price: 2499,
        quantity: 1,
        pickedQuantity: 0,
        verifiedQuantity: 0,
        imageUrl: IMG_CHINO,
        isPicked: false,
        isVerified: false,
      }
    ]
  },
  {
    id: 'WN10246',
    customerName: 'Ananya Roy',
    customerPhone: '+91 98112 33445',
    deliveryAddress: 'Flat 12B, Rosewood Apartments, Vasant Kunj, New Delhi',
    status: 'VERIFICATION',
    dueTime: '01:00 PM Today',
    createdAt: '10:45 AM',
    verificationStatus: 'MATCHED',
    totalAmount: 3299,
    evidenceCount: 1,
    items: [
      {
        id: 'item-3',
        productId: 'prod-4',
        name: 'Pure Silk Amber Wrap Floral Dress',
        sku: 'WN-DRESS-AMB-M',
        barcode: 'WN890456789012',
        size: 'M',
        color: 'Amber Gold',
        colorHex: '#D97706',
        price: 3299,
        quantity: 1,
        pickedQuantity: 1,
        verifiedQuantity: 1,
        imageUrl: IMG_DRESS,
        isPicked: true,
        isVerified: true,
      }
    ]
  },
  {
    id: 'WN10247',
    customerName: 'Rohan Verma',
    customerPhone: '+91 99001 12233',
    deliveryAddress: 'House 88, Defence Colony, New Delhi',
    status: 'PACKING',
    dueTime: '01:15 PM Today',
    createdAt: '11:00 AM',
    verificationStatus: 'MATCHED',
    totalAmount: 8999,
    evidenceCount: 3,
    items: [
      {
        id: 'item-4',
        productId: 'prod-1',
        name: 'Vintage Biker Leather Jacket',
        sku: 'WN-JKT-BLK-XL',
        barcode: 'WN890321654987',
        size: 'XL',
        color: 'Onyx Black',
        colorHex: '#111827',
        price: 8999,
        quantity: 1,
        pickedQuantity: 1,
        verifiedQuantity: 1,
        imageUrl: IMG_JACKET,
        isPicked: true,
        isVerified: true,
      }
    ]
  },
  {
    id: 'WN10248',
    customerName: 'Priya Sundaram',
    customerPhone: '+91 97654 32109',
    deliveryAddress: 'C-44, Greater Kailash 1, New Delhi',
    status: 'READY',
    dueTime: '01:30 PM Today',
    createdAt: '11:10 AM',
    verificationStatus: 'MATCHED',
    totalAmount: 1499,
    evidenceCount: 4,
    packageId: 'PKG-WN10248-01',
    items: [
      {
        id: 'item-5',
        productId: 'prod-5',
        name: 'Heavyweight Graphic Oversized Tee',
        sku: 'WN-TEE-WHT-L',
        barcode: 'WN890654987321',
        size: 'L',
        color: 'Cloud White',
        colorHex: '#F9FAFB',
        price: 1499,
        quantity: 1,
        pickedQuantity: 1,
        verifiedQuantity: 1,
        imageUrl: IMG_TEE,
        isPicked: true,
        isVerified: true,
      }
    ]
  },
  {
    id: 'WN10249',
    customerName: 'Kabir Malhotra',
    customerPhone: '+91 98223 99887',
    deliveryAddress: 'B-10, Hauz Khas Enclave, New Delhi',
    status: 'NEW',
    dueTime: '02:00 PM Today',
    createdAt: '11:40 AM',
    verificationStatus: 'PENDING',
    totalAmount: 4998,
    evidenceCount: 0,
    items: [
      {
        id: 'item-6',
        productId: 'prod-1',
        name: 'Midnight Navy Italian Tailored Linen Shirt',
        sku: 'WN-SHIRT-NAV-M',
        barcode: 'WN890123456788',
        size: 'M',
        color: 'Midnight Navy',
        colorHex: '#172B82',
        price: 2499,
        quantity: 2,
        pickedQuantity: 0,
        verifiedQuantity: 0,
        imageUrl: IMG_SHIRT,
        isPicked: false,
        isVerified: false,
      }
    ]
  }
];

const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Midnight Navy Italian Tailored Linen Shirt',
    brand: 'WearNear Atelier',
    category: 'Shirts',
    description: '100% Breathable Italian Flax Linen with mother-of-pearl buttons and custom slim contour cuts.',
    basePrice: 2499,
    mrp: 3499,
    primaryImage: IMG_SHIRT,
    images: [IMG_SHIRT],
    stockStatus: 'IN_STOCK',
    totalStock: 48,
    skuBase: 'WN-SHIRT-NAV',
    createdAt: '2026-09-01',
    variants: [
      { id: 'v-1', sku: 'WN-SHIRT-NAV-S', barcode: 'WN890123456787', size: 'S', color: 'Navy', colorHex: '#172B82', stock: 12, price: 2499 },
      { id: 'v-2', sku: 'WN-SHIRT-NAV-M', barcode: 'WN890123456788', size: 'M', color: 'Navy', colorHex: '#172B82', stock: 18, price: 2499 },
      { id: 'v-3', sku: 'WN-SHIRT-NAV-L', barcode: 'WN890123456789', size: 'L', color: 'Navy', colorHex: '#172B82', stock: 14, price: 2499 },
      { id: 'v-4', sku: 'WN-SHIRT-NAV-XL', barcode: 'WN890123456790', size: 'XL', color: 'Navy', colorHex: '#172B82', stock: 4, price: 2499 },
    ]
  },
  {
    id: 'prod-2',
    name: 'Slim Fit Cotton Stretch Chino',
    brand: 'WearNear Urban',
    category: 'Trousers',
    description: 'Organic long-staple cotton infused with 2% elastane for maximum daily mobility and elegance.',
    basePrice: 2499,
    mrp: 3299,
    primaryImage: IMG_CHINO,
    images: [IMG_CHINO],
    stockStatus: 'LOW_STOCK',
    totalStock: 8,
    skuBase: 'WN-CHINO-BEI',
    createdAt: '2026-09-05',
    variants: [
      { id: 'v-5', sku: 'WN-CHINO-BEI-30', barcode: 'WN890987654320', size: '30', color: 'Beige', colorHex: '#D4C3A3', stock: 2, price: 2499 },
      { id: 'v-6', sku: 'WN-CHINO-BEI-32', barcode: 'WN890987654321', size: '32', color: 'Beige', colorHex: '#D4C3A3', stock: 4, price: 2499 },
      { id: 'v-7', sku: 'WN-CHINO-BEI-34', barcode: 'WN890987654322', size: '34', color: 'Beige', colorHex: '#D4C3A3', stock: 2, price: 2499 },
    ]
  },
  {
    id: 'prod-3',
    name: 'Vintage Biker Leather Jacket',
    brand: 'WearNear Luxe',
    category: 'Outerwear',
    description: 'Handcrafted full-grain lambskin jacket with satin lining and matte silver hardware.',
    basePrice: 8999,
    mrp: 12999,
    primaryImage: IMG_JACKET,
    images: [IMG_JACKET],
    stockStatus: 'IN_STOCK',
    totalStock: 15,
    skuBase: 'WN-JKT-BLK',
    createdAt: '2026-08-20',
    variants: [
      { id: 'v-8', sku: 'WN-JKT-BLK-M', barcode: 'WN890321654986', size: 'M', color: 'Black', colorHex: '#111827', stock: 5, price: 8999 },
      { id: 'v-9', sku: 'WN-JKT-BLK-L', barcode: 'WN890321654987', size: 'L', color: 'Black', colorHex: '#111827', stock: 6, price: 8999 },
      { id: 'v-10', sku: 'WN-JKT-BLK-XL', barcode: 'WN890321654988', size: 'XL', color: 'Black', colorHex: '#111827', stock: 4, price: 8999 },
    ]
  },
  {
    id: 'prod-4',
    name: 'Pure Silk Amber Wrap Floral Dress',
    brand: 'WearNear Grace',
    category: 'Dresses',
    description: 'Fluid mulberry silk wrap silhouette designed with hand-printed botanical accents.',
    basePrice: 3299,
    mrp: 4999,
    primaryImage: IMG_DRESS,
    images: [IMG_DRESS],
    stockStatus: 'IN_STOCK',
    totalStock: 22,
    skuBase: 'WN-DRESS-AMB',
    createdAt: '2026-09-12',
    variants: [
      { id: 'v-11', sku: 'WN-DRESS-AMB-S', barcode: 'WN890456789011', size: 'S', color: 'Amber Gold', colorHex: '#D97706', stock: 8, price: 3299 },
      { id: 'v-12', sku: 'WN-DRESS-AMB-M', barcode: 'WN890456789012', size: 'M', color: 'Amber Gold', colorHex: '#D97706', stock: 10, price: 3299 },
      { id: 'v-13', sku: 'WN-DRESS-AMB-L', barcode: 'WN890456789013', size: 'L', color: 'Amber Gold', colorHex: '#D97706', stock: 4, price: 3299 },
    ]
  },
  {
    id: 'prod-5',
    name: 'Heavyweight Graphic Oversized Tee',
    brand: 'WearNear Street',
    category: 'T-Shirts',
    description: '280 GSM combed cotton heavy jersey with relaxed drop-shoulder tailoring.',
    basePrice: 1499,
    mrp: 1999,
    primaryImage: IMG_TEE,
    images: [IMG_TEE],
    stockStatus: 'OUT_OF_STOCK',
    totalStock: 0,
    skuBase: 'WN-TEE-WHT',
    createdAt: '2026-09-18',
    variants: [
      { id: 'v-14', sku: 'WN-TEE-WHT-S', barcode: 'WN890654987320', size: 'S', color: 'Cloud White', colorHex: '#F9FAFB', stock: 0, price: 1499 },
      { id: 'v-15', sku: 'WN-TEE-WHT-M', barcode: 'WN890654987321', size: 'M', color: 'Cloud White', colorHex: '#F9FAFB', stock: 0, price: 1499 },
      { id: 'v-16', sku: 'WN-TEE-WHT-L', barcode: 'WN890654987322', size: 'L', color: 'Cloud White', colorHex: '#F9FAFB', stock: 0, price: 1499 },
    ]
  }
];

const initialPackages: PackageItem[] = [
  {
    packageId: 'PKG-WN10248-01',
    orderId: 'WN10248',
    storeName: 'WearNear Flagship Delhi',
    itemsCount: 1,
    evidenceCount: 4,
    createdAt: '11:55 AM Today',
    status: 'READY',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PKG-WN10248-01',
  }
];

const initialTransactions: InventoryTransaction[] = [
  {
    id: 'tx-101',
    productId: 'prod-1',
    productName: 'Midnight Navy Italian Tailored Linen Shirt',
    sku: 'WN-SHIRT-NAV-L',
    change: 15,
    reason: 'Stock Received',
    timestamp: '2026-10-01 09:30 AM',
    executive: 'Priya Sharma (CE-88219)',
    notes: 'Received fresh autumn collection crate #22'
  },
  {
    id: 'tx-102',
    productId: 'prod-2',
    productName: 'Slim Fit Cotton Stretch Chino',
    sku: 'WN-CHINO-BEI-32',
    change: -1,
    reason: 'Damaged',
    timestamp: '2026-10-01 10:15 AM',
    executive: 'Priya Sharma (CE-88219)',
    notes: 'Zipper fault noticed during visual inspection'
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'New High Priority Order #WN10249',
    message: 'Express order assigned. Picking required immediately for 2 items.',
    time: '15 mins ago',
    type: 'order',
    isRead: false,
    orderId: 'WN10249'
  },
  {
    id: 'n-2',
    title: 'Low Stock Alert',
    message: 'Slim Fit Cotton Stretch Chino (Beige 32) has dropped to 4 units.',
    time: '1 hour ago',
    type: 'inventory',
    isRead: false,
  },
  {
    id: 'n-3',
    title: 'Handover Captain Arrived',
    message: 'Delivery Captain Vikram Singh is waiting at pickup bay 2 for PKG-WN10248-01.',
    time: '2 hours ago',
    type: 'handover',
    isRead: true,
    orderId: 'WN10248'
  }
];

interface CatalogueContextType {
  orders: Order[];
  products: Product[];
  packages: PackageItem[];
  transactions: InventoryTransaction[];
  notifications: NotificationItem[];
  profile: ExecutiveProfile;
  activeOrder: Order | null;
  setActiveOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  updateOrderItemPicked: (orderId: string, itemId: string, isPicked: boolean) => void;
  updateOrderItemVerified: (orderId: string, itemId: string, isVerified: boolean) => void;
  updateOrderItemQuantity: (orderId: string, itemId: string, verifiedQty: number) => void;
  addInventoryAdjustment: (productId: string, sku: string, change: number, reason: AdjustmentReason, notes?: string) => void;
  createPackageForOrder: (orderId: string) => PackageItem;
  confirmHandover: (packageId: string, partnerName: string, vehicleNo: string) => void;
  toggleStoreOnline: () => void;
  markNotificationRead: (id: string) => void;
  addProduct: (product: Partial<Product>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
}

const CatalogueContext = createContext<CatalogueContextType | undefined>(undefined);

export const CatalogueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [packages, setPackages] = useState<PackageItem[]>(initialPackages);
  const [transactions, setTransactions] = useState<InventoryTransaction[]>(initialTransactions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeOrder, setActiveOrder] = useState<Order | null>(initialOrders[0]);

  const [profile, setProfile] = useState<ExecutiveProfile>({
    name: 'Priya Sharma',
    employeeId: 'CE-88219',
    role: 'Senior Catalogue & Fulfilment Executive',
    storeName: 'WearNear Flagship Delhi',
    storeId: 'WN-STR-DELHI-04',
    phone: '+91 98991 22334',
    email: 'priya.sharma@wearnear.com',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    todayFulfilled: 14,
    accuracyRate: '99.4%',
    isOnline: true,
  });

  const toggleStoreOnline = () => {
    setProfile(prev => ({ ...prev, isOnline: !prev.isOnline }));
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => prev ? { ...prev, status } : null);
    }
  };

  const updateOrderItemPicked = (orderId: string, itemId: string, isPicked: boolean) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const updatedItems = o.items.map(it => it.id === itemId ? { 
        ...it, 
        isPicked, 
        pickedQuantity: isPicked ? it.quantity : 0 
      } : it);
      const allPicked = updatedItems.every(i => i.isPicked);
      return {
        ...o,
        items: updatedItems,
        status: allPicked ? 'VERIFICATION' : 'PICKING'
      };
    }));
  };

  const updateOrderItemVerified = (orderId: string, itemId: string, isVerified: boolean) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const updatedItems = o.items.map(it => it.id === itemId ? { 
        ...it, 
        isVerified, 
        verifiedQuantity: isVerified ? it.quantity : 0 
      } : it);
      const allVerified = updatedItems.every(i => i.isVerified);
      return {
        ...o,
        items: updatedItems,
        verificationStatus: allVerified ? 'MATCHED' : 'PENDING'
      };
    }));
  };

  const updateOrderItemQuantity = (orderId: string, itemId: string, verifiedQty: number) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      const updatedItems = o.items.map(it => it.id === itemId ? { 
        ...it, 
        verifiedQuantity: verifiedQty,
        isVerified: verifiedQty === it.quantity
      } : it);
      return { ...o, items: updatedItems };
    }));
  };

  const addInventoryAdjustment = (productId: string, sku: string, change: number, reason: AdjustmentReason, notes?: string) => {
    const product = products.find(p => p.id === productId);
    const newTx: InventoryTransaction = {
      id: `tx-${Date.now()}`,
      productId,
      productName: product ? product.name : 'Unknown Product',
      sku,
      change,
      reason,
      timestamp: new Date().toLocaleString(),
      executive: `${profile.name} (${profile.employeeId})`,
      notes
    };

    setTransactions(prev => [newTx, ...prev]);

    // Update Product Stock State
    setProducts(prev => prev.map(p => {
      if (p.id !== productId) return p;
      const updatedVariants = p.variants.map(v => {
        if (v.sku === sku) {
          const newStock = Math.max(0, v.stock + change);
          return { ...v, stock: newStock };
        }
        return v;
      });
      const newTotalStock = updatedVariants.reduce((acc, curr) => acc + curr.stock, 0);
      const stockStatus = newTotalStock === 0 ? 'OUT_OF_STOCK' : newTotalStock < 10 ? 'LOW_STOCK' : 'IN_STOCK';
      return {
        ...p,
        variants: updatedVariants,
        totalStock: newTotalStock,
        stockStatus
      };
    }));
  };

  const createPackageForOrder = (orderId: string): PackageItem => {
    const pkgId = `PKG-${orderId}-01`;
    const targetOrder = orders.find(o => o.id === orderId);
    
    const newPkg: PackageItem = {
      packageId: pkgId,
      orderId,
      storeName: profile.storeName,
      itemsCount: targetOrder ? targetOrder.items.length : 1,
      evidenceCount: 4,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' Today',
      status: 'READY',
      qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${pkgId}`
    };

    setPackages(prev => [newPkg, ...prev]);
    updateOrderStatus(orderId, 'READY');
    
    // Attach package ID to order
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, packageId: pkgId, status: 'READY' } : o));

    return newPkg;
  };

  const confirmHandover = (packageId: string, partnerName: string, vehicleNo: string) => {
    setPackages(prev => prev.map(pkg => pkg.packageId === packageId ? {
      ...pkg,
      status: 'HANDED_OVER',
      deliveryPartner: `${partnerName} (${vehicleNo})`,
      handoverTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } : pkg));

    // Update order status to COMPLETED
    setOrders(prev => prev.map(o => o.packageId === packageId ? { ...o, status: 'COMPLETED' } : o));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const addProduct = (productData: Partial<Product>) => {
    const newId = `prod-${Date.now()}`;
    const newProduct: Product = {
      id: newId,
      name: productData.name || 'New Fashion Product',
      brand: productData.brand || 'WearNear Atelier',
      category: productData.category || 'Apparel',
      description: productData.description || 'Premium retail garment',
      basePrice: productData.basePrice || 1999,
      mrp: productData.mrp || 2499,
      primaryImage: productData.primaryImage || IMG_SHIRT,
      images: productData.images || [IMG_SHIRT],
      stockStatus: 'IN_STOCK',
      totalStock: 20,
      skuBase: productData.skuBase || `WN-${(productData.name || 'PROD').toUpperCase().slice(0, 5)}`,
      createdAt: new Date().toISOString().split('T')[0],
      variants: productData.variants || [
        { id: `v-${Date.now()}-1`, sku: `WN-${newId}-M`, barcode: `WN890${Date.now()}`, size: 'M', color: 'Black', colorHex: '#000000', stock: 10, price: productData.basePrice || 1999 },
        { id: `v-${Date.now()}-2`, sku: `WN-${newId}-L`, barcode: `WN891${Date.now()}`, size: 'L', color: 'Black', colorHex: '#000000', stock: 10, price: productData.basePrice || 1999 }
      ]
    };
    setProducts(prev => [newProduct, ...prev]);
  };

  const updateProduct = (id: string, productData: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...productData } : p));
  };

  return (
    <CatalogueContext.Provider value={{
      orders,
      products,
      packages,
      transactions,
      notifications,
      profile,
      activeOrder,
      setActiveOrder,
      updateOrderStatus,
      updateOrderItemPicked,
      updateOrderItemVerified,
      updateOrderItemQuantity,
      addInventoryAdjustment,
      createPackageForOrder,
      confirmHandover,
      toggleStoreOnline,
      markNotificationRead,
      addProduct,
      updateProduct,
    }}>
      {children}
    </CatalogueContext.Provider>
  );
};

export const useCatalogue = () => {
  const context = useContext(CatalogueContext);
  if (!context) {
    throw new Error('useCatalogue must be used within a CatalogueProvider');
  }
  return context;
};
