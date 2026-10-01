import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CatalogueProvider } from './context/CatalogueContext';
import { CatalogueLayout } from './components/layout/CatalogueLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { OtpPage } from './pages/auth/OtpPage';
import { ForgotPasswordPage } from './pages/auth/ForgotPasswordPage';

// Dashboard
import { DashboardPage } from './pages/dashboard/DashboardPage';

// Orders Workflow
import { OrdersListPage } from './pages/orders/OrdersListPage';
import { OrderDetailPage } from './pages/orders/OrderDetailPage';
import { PickingPage } from './pages/orders/PickingPage';
import { VerifyPage } from './pages/orders/VerifyPage';
import { QuantityPage } from './pages/orders/QuantityPage';
import { PackingPage } from './pages/orders/PackingPage';
import { PackingEvidencePage } from './pages/orders/PackingEvidencePage';
import { PackagePage } from './pages/orders/PackagePage';

// Scanner
import { ScannerPage } from './pages/scanner/ScannerPage';

// Products
import { ProductsListPage } from './pages/products/ProductsListPage';
import { ProductAddPage } from './pages/products/ProductAddPage';
import { ProductDetailPage } from './pages/products/ProductDetailPage';
import { ProductEditPage } from './pages/products/ProductEditPage';
import { ProductVariantsPage } from './pages/products/ProductVariantsPage';
import { ProductBarcodePage } from './pages/products/ProductBarcodePage';

// Barcodes
import { BarcodesPage } from './pages/barcodes/BarcodesPage';

// Inventory
import { InventoryListPage } from './pages/inventory/InventoryListPage';
import { InventoryDetailPage } from './pages/inventory/InventoryDetailPage';
import { InventoryAdjustPage } from './pages/inventory/InventoryAdjustPage';
import { InventoryTransactionsPage } from './pages/inventory/InventoryTransactionsPage';

// Packages
import { PackagesListPage } from './pages/packages/PackagesListPage';

// Handover
import { HandoverListPage } from './pages/handover/HandoverListPage';
import { HandoverDetailPage } from './pages/handover/HandoverDetailPage';

// History, Notifications, Profile, Settings, Security
import { HistoryPage } from './pages/history/HistoryPage';
import { NotificationsPage } from './pages/notifications/NotificationsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';
import { SecurityPage } from './pages/security/SecurityPage';

export function App() {
  return (
    <CatalogueProvider>
      <Routes>
        {/* Auth Routes */}
        <Route path="/vendor/login" element={<LoginPage />} />
        <Route path="/vendor/register" element={<RegisterPage />} />
        <Route path="/vendor/otp" element={<OtpPage />} />
        <Route path="/vendor/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Catalogue Executive Layout */}
        <Route path="/vendor/catalogue" element={<CatalogueLayout />}>
          <Route index element={<Navigate to="/vendor/catalogue/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />

          {/* Orders Workflow */}
          <Route path="orders" element={<OrdersListPage />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="orders/:id/picking" element={<PickingPage />} />
          <Route path="orders/:id/verify" element={<VerifyPage />} />
          <Route path="orders/:id/quantity" element={<QuantityPage />} />
          <Route path="orders/:id/packing" element={<PackingPage />} />
          <Route path="orders/:id/packing-evidence" element={<PackingEvidencePage />} />
          <Route path="orders/:id/package" element={<PackagePage />} />

          {/* Scanner */}
          <Route path="scanner" element={<ScannerPage />} />

          {/* Products */}
          <Route path="products" element={<ProductsListPage />} />
          <Route path="products/add" element={<ProductAddPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="products/:id/edit" element={<ProductEditPage />} />
          <Route path="products/:id/variants" element={<ProductVariantsPage />} />
          <Route path="products/:id/barcode" element={<ProductBarcodePage />} />

          {/* Barcodes */}
          <Route path="barcodes" element={<BarcodesPage />} />

          {/* Inventory */}
          <Route path="inventory" element={<InventoryListPage />} />
          <Route path="inventory/adjust" element={<InventoryAdjustPage />} />
          <Route path="inventory/transactions" element={<InventoryTransactionsPage />} />
          <Route path="inventory/:productId" element={<InventoryDetailPage />} />

          {/* Packages */}
          <Route path="packages" element={<PackagesListPage />} />

          {/* Handover */}
          <Route path="handover" element={<HandoverListPage />} />
          <Route path="handover/:packageId" element={<HandoverDetailPage />} />

          {/* History, Notifications, Profile, Settings, Security */}
          <Route path="history" element={<HistoryPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="security" element={<SecurityPage />} />
        </Route>

        {/* Fallback Redirection */}
        <Route path="*" element={<Navigate to="/vendor/catalogue/dashboard" replace />} />
      </Routes>
    </CatalogueProvider>
  );
}

export default App;
