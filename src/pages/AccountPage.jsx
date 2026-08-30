import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import {
  Package,
  MapPin,
  CreditCard,
  User,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Printer,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  X,
  FileText,
  RotateCcw,
  Headphones
} from 'lucide-react';
import { resolveImageUrl } from '../utils/productAdapter';
import api from '../context/api';
import { useAuth } from '../context/AuthContext';

export const AccountPage = ({
  currentUser,
  onLogout,
  orders = [],
  addresses = [],
  onAddAddress,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefaultAddress,
  payments = [],
  onAddToCart
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tab = 'orders', id: orderIdParam } = useParams();
  const { cancelOrder, fetchOrders } = useAuth();

  // Determine active tab from route or state
  const [activeTab, setActiveTab] = useState(tab);
  const [selectedOrderId, setSelectedOrderId] = useState(orderIdParam || null);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    street: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    addressType: 'home',
    isDefault: false
  });

  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');
  const [profileMessage, setProfileMessage] = useState('');

  // Active selected order object
  const activeOrder = orders.find((o) => o.id === selectedOrderId || o.orderNumber === selectedOrderId) || orders[0] || null;

  useEffect(() => {
    if (orderIdParam) {
      setSelectedOrderId(orderIdParam);
      setActiveTab('order-detail');
    } else if (tab) {
      setActiveTab(tab);
    }
  }, [tab, orderIdParam]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    if (newTab !== 'order-detail') {
      setSelectedOrderId(null);
      navigate(`/account/${newTab}`);
    }
  };

  const handleViewOrderDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setActiveTab('order-detail');
    navigate(`/account/orders/${orderId}`);
  };

  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      fullName: currentUser?.name || '',
      phone: currentUser?.phone || '',
      street: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      addressType: 'home',
      isDefault: addresses.length === 0
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({
      fullName: addr.fullName || addr.name || '',
      phone: addr.phone || currentUser?.phone || '',
      street: addr.street || '',
      apartment: addr.apartment || '',
      city: addr.city || '',
      state: addr.state || '',
      postalCode: addr.postalCode || '',
      country: addr.country || 'India',
      addressType: addr.addressType || 'home',
      isDefault: !!addr.isDefault
    });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    setIsSavingAddress(true);
    try {
      if (editingAddress) {
        await onUpdateAddress({
          ...addressForm,
          id: editingAddress.id || editingAddress._id
        });
      } else {
        await onAddAddress({ ...addressForm });
      }
      setIsAddressModalOpen(false);
    } catch (err) {
      console.error('Error saving address:', err);
    } finally {
      setIsSavingAddress(false);
    }
  };

  // Helper for status badge
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'shipped':
        return 'bg-sky-50 text-sky-800 border-sky-200';
      case 'processing':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'confirmed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'cancelled':
      case 'returned':
        return 'bg-neutral-100 text-neutral-600 border-neutral-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F6F3] py-8 lg:py-12 animate-fade-in font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#6B6B6B] mb-6">
          <Link to="/" className="hover:text-[#1A1A1A] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link to="/account/orders" className="hover:text-[#1A1A1A] transition-colors">My Account</Link>
          {activeTab === 'order-detail' && activeOrder && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span className="text-[#1A1A1A] font-semibold">{activeOrder.orderNumber}</span>
            </>
          )}
        </nav>

        {/* Account Header Hero Card */}
        <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 sm:p-8 shadow-2xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#1A1A1A] text-[#C8A87C] flex items-center justify-center font-serif text-2xl font-bold shadow-sm shrink-0">
              {currentUser?.name ? currentUser.name.charAt(0) : 'E'}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1D241C]">
                  {currentUser?.name || 'Customer'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest bg-[#506040]/15 text-[#506040] font-bold border border-[#506040]/30">
                  <Sparkles className="w-3 h-3 text-[#506040]" />
                  Verified Account
                </span>
              </div>
              <p className="text-xs text-[#687163] mt-1">
                {currentUser?.email || ''} {currentUser?.phone ? `• ${currentUser.phone}` : ''}
              </p>
            </div>
          </div>

          {/* Quick Stats & Sign Out */}
          <div className="flex items-center gap-4 sm:gap-6 border-t md:border-t-0 pt-4 md:pt-0 border-[#E8E3DE]">
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-medium">Orders Placed</div>
              <div className="font-mono text-xl font-bold text-[#1A1A1A]">{orders.length}</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] uppercase tracking-wider text-[#6B6B6B] font-medium">Addresses</div>
              <div className="font-mono text-xl font-bold text-[#1A1A1A]">{addresses.length}</div>
            </div>
            <button
              onClick={onLogout}
              className="px-4 py-2 text-xs font-semibold text-[#A5432F] bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xs transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Grid: Navigation Tabs (Left) + Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2 bg-white p-3 rounded-[4px] border border-[#E8E3DE] shadow-2xs">
            <button
              onClick={() => handleTabChange('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${activeTab === 'orders' || activeTab === 'order-detail'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F6F3]'
                }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#C8A87C]" />
                <span>My Orders</span>
              </div>
              <span className="font-mono text-[11px] opacity-80">{orders.length}</span>
            </button>

            <button
              onClick={() => handleTabChange('payments')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${activeTab === 'payments'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F6F3]'
                }`}
            >
              <div className="flex items-center gap-3">
                <CreditCard className="w-4 h-4 text-[#C8A87C]" />
                <span>Payment History</span>
              </div>
              <span className="font-mono text-[11px] opacity-80">{payments.length}</span>
            </button>

            <button
              onClick={() => handleTabChange('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${activeTab === 'addresses'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F6F3]'
                }`}
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C8A87C]" />
                <span>Saved Addresses</span>
              </div>
              <span className="font-mono text-[11px] opacity-80">{addresses.length}</span>
            </button>

            <button
              onClick={() => handleTabChange('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${activeTab === 'profile'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F6F3]'
                }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#C8A87C]" />
                <span>My Profile</span>
              </div>
            </button>

            <div className="pt-3 border-t border-[#E8E4DC] mt-3">
              <Link
                to="/contact"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#687163] hover:text-[#1D241C] hover:bg-[#FAF8F5] rounded-xl transition-colors font-medium"
              >
                <Headphones className="w-4 h-4 text-[#506040]" />
                <span>Contact Customer Support</span>
              </Link>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* ============================================================
                TAB 1: ORDERS LIST
            ============================================================ */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">Order History</h2>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">
                      View all your past orders, delivery status, and invoices.
                    </p>
                  </div>
                  <Link
                    to="/products"
                    className="text-xs font-semibold text-[#C8A87C] hover:text-[#1A1A1A] flex items-center gap-1 transition-colors"
                  >
                    <span>Browse Catalog</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-12 text-center space-y-4">
                    <Package className="w-12 h-12 text-[#C8A87C] mx-auto opacity-50" />
                    <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">No Orders Placed Yet</h3>
                    <p className="text-xs text-[#6B6B6B] max-w-sm mx-auto">
                      You have not placed any orders yet. Explore our fashion collections and find styles you love.
                    </p>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#C8A87C] hover:text-[#1A1A1A] transition-colors"
                    >
                      <span>Explore Collections</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs hover:shadow-md transition-shadow relative overflow-hidden"
                      >
                        {/* Order Header Summary */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F2EFE9] text-xs">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-mono font-bold text-sm text-[#1A1A1A]">
                                {order.orderNumber}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border ${order.paymentStatus === 'paid'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : order.paymentStatus === 'cod_pending'
                                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                                      : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                                  }`}
                              >
                                {order.paymentStatus === 'paid'
                                  ? 'PAID'
                                  : order.paymentStatus === 'cod_pending'
                                    ? 'COD (PENDING)'
                                    : order.paymentStatus?.toUpperCase()}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${getStatusBadge(
                                  order.status
                                )}`}
                              >
                                {order.status?.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#6B6B6B] flex items-center gap-2 sm:gap-3 flex-wrap">
                              <span>Placed on {order.date || 'Recent'}</span>
                              <span>•</span>
                              <span>{order.items?.length || 0} Piece(s)</span>
                              <span>•</span>
                              <span>{order.paymentMethod === 'upi' ? 'UPI Instant Payment' : order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod || 'UPI'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 sm:text-right">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">Total Amount</div>
                              <div className="font-mono text-base font-bold text-[#1A1A1A]">
                                ₹{Number(order.total || 0).toFixed(2)}
                              </div>
                            </div>
                            <button
                              onClick={() => handleViewOrderDetail(order.id)}
                              className="px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shrink-0"
                            >
                              View Details
                            </button>
                          </div>
                        </div>

                        {/* Garments Thumbnails Gallery */}
                        <div className="mt-4 pt-2 flex items-center justify-between gap-4 flex-wrap">
                          <div className="flex items-center gap-3 overflow-x-auto pb-1">
                            {(order.items || []).map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 shrink-0">
                                <img
                                  src={resolveImageUrl(item.image || item.product?.image || (Array.isArray(item.product?.images) && item.product.images[0]) || '')}
                                  alt={item.name || 'Garment Piece'}
                                  onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
                                  }}
                                  className="w-14 h-16 object-cover rounded-xs border border-[#E8E3DE] bg-[#F8F6F3]"
                                />
                                <div className="text-xs">
                                  <p className="font-semibold text-[#1A1A1A] truncate max-w-[140px]">
                                    {item.name || 'Garment Piece'}
                                  </p>
                                  <p className="text-[11px] text-[#6B6B6B]">
                                    {item.selectedSize || item.size || 'Standard'} • Qty: {Number(item.quantity || 1)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {order.status === 'confirmed' && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={async () => {
                                  try {
                                    await cancelOrder(order.id);
                                  } catch (err) {
                                    console.error('Cancel order error:', err);
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-neutral-500 hover:text-red-700 border border-[#E8E3DE] hover:border-red-300 rounded-xs transition-colors cursor-pointer bg-white"
                              >
                                <span>Cancel Order</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================
                TAB 2: ORDER DETAILS DOSSIER
            ============================================================ */}
            {activeTab === 'order-detail' && activeOrder && (
              <div className="space-y-6">
                {/* Back Button & Title Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8E3DE]">
                  <div>
                    <button
                      onClick={() => handleTabChange('orders')}
                      className="text-xs text-[#A68758] hover:text-[#1A1A1A] flex items-center gap-1 mb-2 font-semibold cursor-pointer"
                    >
                      ← Back to Orders List
                    </button>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                        Order #{activeOrder.orderNumber}
                      </h2>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider font-semibold border ${activeOrder.paymentStatus === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : activeOrder.paymentStatus === 'cod_pending'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                          }`}
                      >
                        {activeOrder.paymentStatus === 'paid'
                          ? 'PAID'
                          : activeOrder.paymentStatus === 'cod_pending'
                            ? 'COD (PENDING)'
                            : activeOrder.paymentStatus?.toUpperCase()}
                      </span>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${getStatusBadge(
                          activeOrder.status
                        )}`}
                      >
                        {activeOrder.status?.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6B6B] mt-1">
                      Placed on {activeOrder.date} • Estimated Delivery: {activeOrder.estimatedDelivery || 'In 2-3 Business Days'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#E8E3DE] hover:border-[#C8A87C] text-xs font-semibold text-[#1A1A1A] rounded-xs transition-colors cursor-pointer shadow-2xs"
                    >
                      <Printer className="w-4 h-4 text-[#C8A87C]" />
                      <span>Print Receipt</span>
                    </button>
                  </div>
                </div>

                {/* 4-Step Visual Progress Tracker */}
                <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#A68758] mb-6">
                    Fulfillment & Delivery Tracker
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                    {[
                      { step: 1, label: 'Order Confirmed', sub: activeOrder.date, done: true },
                      { step: 2, label: 'Atelier Tailoring', sub: 'Quality Inspected', done: true },
                      {
                        step: 3,
                        label: 'Dispatched in Transit',
                        sub: activeOrder.trackingNumber ? `DHL: ${activeOrder.trackingNumber}` : 'DHL Express',
                        done: activeOrder.status === 'shipped' || activeOrder.status === 'delivered'
                      },
                      {
                        step: 4,
                        label: 'Delivered',
                        sub: activeOrder.status === 'delivered' ? 'Completed' : 'Expected soon',
                        done: activeOrder.status === 'delivered'
                      }
                    ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center relative z-10">
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors shadow-2xs mb-2 ${item.done
                              ? 'bg-[#1A1A1A] text-[#C8A87C] border border-[#C8A87C]'
                              : 'bg-[#F8F6F3] text-neutral-400 border border-[#E8E3DE]'
                            }`}
                        >
                          {item.done ? <CheckCircle2 className="w-4 h-4" /> : item.step}
                        </div>
                        <div className="text-xs font-semibold text-[#1A1A1A]">{item.label}</div>
                        <div className="text-[11px] text-[#6B6B6B] mt-0.5">{item.sub}</div>
                      </div>
                    ))}
                  </div>

                  {activeOrder.trackingNumber && (
                    <div className="mt-6 pt-4 border-t border-[#F2EFE9] flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-[#C8A87C]" />
                        <span className="text-[#6B6B6B]">Carrier:</span>
                        <span className="font-semibold text-[#1A1A1A]">DHL Express Worldwide</span>
                        <span className="font-mono text-[#A68758] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E8E3DE]">
                          {activeOrder.trackingNumber}
                        </span>
                      </div>

                    </div>
                  )}
                </div>

                {/* Garments Itemized Breakdown */}
                <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs">
                  <h3 className="font-serif text-lg font-bold text-[#1A1A1A] mb-4">
                    Ordered Pieces ({activeOrder.items?.length || 0})
                  </h3>

                  <div className="divide-y divide-[#F2EFE9]">
                    {activeOrder.items?.map((item, idx) => (
                      <div key={idx} className="py-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 min-w-0">
                          <img
                            src={resolveImageUrl(item.image || item.product?.image || (Array.isArray(item.product?.images) && item.product.images[0]) || '')}
                            alt={item.name || item.product?.name || 'Garment Piece'}
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900';
                            }}
                            className="w-16 h-20 object-cover rounded-xs border border-[#E8E4DC] bg-[#F8F6F3]"
                          />
                          <div className="space-y-1">
                            <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">
                              {item.name || item.product?.name || 'Garment Piece'}
                            </h4>
                            <div className="text-xs text-[#6B6B6B] flex items-center gap-3">
                              <span>Size: <strong className="text-[#1A1A1A]">{item.selectedSize || item.size || 'Standard'}</strong></span>
                              <span>•</span>
                              <span>Color: <strong className="text-[#1A1A1A]">{typeof item.selectedColor === 'object' ? item.selectedColor?.name : (item.selectedColor || item.color || 'Standard')}</strong></span>
                              <span>•</span>
                              <span>Quantity: <strong className="text-[#1A1A1A]">{Number(item.quantity || 1)}</strong></span>
                            </div>
                            <div className="text-[11px] text-[#A68758]">
                              Handcrafted with certified Italian textiles
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-base font-bold text-[#1A1A1A]">
                            ₹{(Number(item.price !== undefined ? item.price : (item.product?.price || 0)) * Number(item.quantity || 1)).toFixed(2)}
                          </div>
                          <div className="text-[11px] text-[#6B6B6B]">
                            ₹{Number(item.price !== undefined ? item.price : (item.product?.price || 0)).toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2-Column Section: Shipping Address & Financial Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping & Delivery Info */}
                  <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#506040]">
                      <MapPin className="w-4 h-4 text-[#506040]" />
                      <span>Shipping Destination</span>
                    </div>

                    <div className="text-xs space-y-1 text-[#1D241C]">
                      <div className="font-bold text-sm">
                        {activeOrder.shippingAddress?.fullName || activeOrder.shippingAddress?.name || currentUser?.name || 'Customer'}
                      </div>
                      <div className="text-[#687163]">
                        {activeOrder.shippingAddress?.street}
                        {activeOrder.shippingAddress?.apartment ? `, ${activeOrder.shippingAddress.apartment}` : ''}
                      </div>
                      <div className="text-[#687163]">
                        {activeOrder.shippingAddress?.city}{activeOrder.shippingAddress?.state ? `, ${activeOrder.shippingAddress.state}` : ''} {activeOrder.shippingAddress?.postalCode}
                      </div>
                      <div className="text-[#687163]">{activeOrder.shippingAddress?.country || 'India'}</div>
                      {(activeOrder.shippingAddress?.phone || currentUser?.phone) && (
                        <div className="text-[#1D241C] font-mono pt-1">
                          Phone: {activeOrder.shippingAddress?.phone || currentUser?.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Financial Breakdown & Payment Summary */}
                  <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#506040] border-b border-[#E8E4DC] pb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#506040]" />
                        <span>Payment Summary</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#1D241C]">
                        {activeOrder.paymentMethod === 'upi' ? 'UPI Transfer' : activeOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : activeOrder.paymentMethod}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs divide-y divide-[#E8E4DC]">
                      <div className="flex justify-between py-1 text-[#687163]">
                        <span>Subtotal</span>
                        <span className="font-mono text-[#1D241C]">
                          ₹{Number(activeOrder.subtotal !== undefined ? activeOrder.subtotal : (activeOrder.total || 0)).toFixed(2)}
                        </span>
                      </div>
                      {Number(activeOrder.discount || 0) > 0 && (
                        <div className="flex justify-between py-1 text-[#506040]">
                          <span>Discount Applied</span>
                          <span className="font-mono">-₹{Number(activeOrder.discount).toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between py-1 text-[#687163]">
                        <span>Standard Delivery</span>
                        <span className="font-mono text-[#1D241C]">
                          {Number(activeOrder.shippingCost || 0) === 0 ? (
                            <span className="text-emerald-700 font-semibold uppercase">Free</span>
                          ) : (
                            `₹${Number(activeOrder.shippingCost).toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 text-[#687163]">
                        <span>Estimated Taxes</span>
                        <span className="font-mono text-[#1D241C]">₹0.00 (Inclusive)</span>
                      </div>
                      <div className="flex justify-between pt-3 font-bold text-sm text-[#1D241C]">
                        <span>Total {activeOrder.paymentStatus === 'paid' ? 'Amount Paid' : 'Payable'}</span>
                        <span className="font-mono text-base text-[#1D241C]">
                          ₹{Number(activeOrder.total || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {activeOrder.razorpay?.paymentId && (
                      <div className="pt-2 border-t border-[#E8E4DC] text-[11px] text-[#687163] flex justify-between items-center">
                        <span>Transaction ID:</span>
                        <span className="font-mono font-bold text-[#1D241C]">{activeOrder.razorpay.paymentId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================
                TAB 3: PAYMENT HISTORY
            ============================================================ */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1D241C]">Payment History</h2>
                    <p className="text-xs text-[#687163] mt-0.5">
                      Verified records of your UPI transfers, COD orders, and Razorpay transactions.
                    </p>
                  </div>
                </div>

                {payments.length === 0 ? (
                  <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-12 text-center text-[#687163] text-xs space-y-3">
                    <CreditCard className="w-10 h-10 text-[#C8A87C] mx-auto opacity-50" />
                    <h3 className="font-serif text-base font-bold text-[#1D241C]">No Payment Records Found</h3>
                    <p>Once you complete a UPI or COD purchase, transaction receipts will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {payments.map((p) => (
                      <div
                        key={p.id || p.transactionId}
                        className="bg-white rounded-[4px] border border-[#E8E3DE] p-5 shadow-2xs hover:shadow-xs transition-shadow flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-sm text-[#1D241C]">
                              {p.transactionId}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold tracking-wider border ${p.status === 'Settled' || p.paymentStatus === 'paid'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : p.status === 'Refunded' || p.paymentStatus === 'refunded'
                                    ? 'bg-purple-50 text-purple-800 border-purple-200'
                                    : p.status === 'Failed' || p.paymentStatus === 'failed'
                                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                                      : 'bg-amber-50 text-amber-800 border-amber-200'
                                }`}
                            >
                              {p.status || p.paymentStatus}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#687163] flex items-center gap-3">
                            <span>Order #{p.orderNumber}</span>
                            <span>•</span>
                            <span>{p.method}</span>
                            <span>•</span>
                            <span>{p.date ? new Date(p.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                          </div>
                          {p.razorpayPaymentId && (
                            <div className="text-[10px] font-mono text-[#A68758]">
                              Razorpay ID: {p.razorpayPaymentId}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#F2EFE9]">
                          <div className="text-left sm:text-right">
                            <div className="text-[10px] uppercase tracking-wider text-[#687163]">Amount Paid</div>
                            <div className="font-mono font-bold text-base text-[#1D241C]">
                              ₹{Number(p.amount || 0).toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              setSelectedOrderId(p.orderId || p.orderNumber);
                              setActiveTab('order-detail');
                            }}
                            className="px-3.5 py-1.5 bg-white border border-[#E8E3DE] hover:border-[#C8A87C] text-[#1D241C] text-xs font-semibold rounded-xs transition-colors cursor-pointer"
                          >
                            View Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================
                TAB 4: ADDRESS BOOK
            ============================================================ */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1D241C]">Saved Address Book</h2>
                    <p className="text-xs text-[#687163] mt-0.5">
                      Manage your delivery addresses and set your default shipping destination.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddAddress}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                {addresses.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#E8E4DC] p-12 text-center text-[#687163] text-xs space-y-3">
                    <MapPin className="w-8 h-8 text-[#C69E58] mx-auto opacity-70" />
                    <p className="font-semibold text-sm text-[#1D241C]">No addresses saved yet</p>
                    <p>Add a delivery address to ensure faster and smoother checkout on future orders.</p>
                    <button
                      onClick={handleOpenAddAddress}
                      className="px-4 py-2 bg-[#1D241C] text-white text-xs font-semibold rounded-xl hover:bg-[#C69E58] hover:text-[#1D241C] transition-colors cursor-pointer"
                    >
                      Add Your First Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((addr) => (
                      <div
                        key={addr.id || addr._id}
                        className={`bg-white rounded-2xl border p-6 shadow-2xs relative flex flex-col justify-between ${addr.isDefault
                            ? 'border-[#506040] ring-1 ring-[#506040]/30'
                            : 'border-[#E8E4DC]'
                          }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-[#1D241C]">
                                {addr.fullName || addr.name}
                              </span>
                              <span className="px-2 py-0.5 bg-[#FAF8F5] border border-[#E8E4DC] text-[#687163] rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                                {addr.addressType || 'Home'}
                              </span>
                            </div>
                            {addr.isDefault && (
                              <span className="px-2 py-0.5 bg-[#506040]/15 text-[#506040] border border-[#506040]/30 rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                                Default Address
                              </span>
                            )}
                          </div>

                          <div className="text-xs text-[#687163] space-y-1">
                            <p className="text-[#1D241C] font-medium">{addr.street}</p>
                            {addr.apartment && <p>{addr.apartment}</p>}
                            <p>
                              {addr.city}, {addr.state} {addr.postalCode}
                            </p>
                            <p>{addr.country || 'India'}</p>
                            <p className="pt-2 font-mono text-[#1D241C]">
                              Phone: <strong>{addr.phone || currentUser?.phone || 'Not specified'}</strong>
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#E8E4DC] flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => handleOpenEditAddress(addr)}
                              className="text-[#1D241C] hover:text-[#C69E58] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => onDeleteAddress(addr.id || addr._id)}
                              className="text-red-700 hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>

                          {!addr.isDefault && (
                            <button
                              onClick={() => onSetDefaultAddress(addr.id || addr._id)}
                              className="text-xs text-[#506040] hover:text-[#1D241C] font-semibold underline cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ============================================================
                TAB 3: PROFILE DETAILS
            ============================================================ */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E8E3DE]">
                  <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">My Profile & Account Details</h2>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">
                    Update your personal contact information and account details.
                  </p>
                </div>

                <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 sm:p-8 shadow-2xs space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name || ''}
                        placeholder="Your full name"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={currentUser?.email || ''}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={currentUser?.phone || ''}
                        placeholder="10-digit mobile number"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F2EFE9] flex justify-end">
                    <button
                      onClick={() => alert('Profile details saved successfully.')}
                      className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                    >
                      Save Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      {isAddressModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in text-[#1D241C]">
          <div className="bg-white rounded-2xl border border-[#E8E4DC] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E4DC]">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#1D241C]">
                  {editingAddress ? 'Edit Delivery Address' : 'Add New Address'}
                </h3>
                <p className="text-[11px] text-[#687163] mt-0.5">
                  Enter your recipient contact and delivery location details.
                </p>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-black cursor-pointer rounded-lg hover:bg-[#FAF8F5]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                    Recipient Full Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={addressForm.fullName}
                    onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                    10-Digit Mobile Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="e.g. 9876543210"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs font-mono text-[#1D241C]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                  Address Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['home', 'work', 'other'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setAddressForm({ ...addressForm, addressType: type })}
                      className={`py-2 px-3 rounded-xl border text-xs font-semibold capitalize transition-colors cursor-pointer ${addressForm.addressType === type
                          ? 'bg-[#1D241C] text-white border-[#1D241C]'
                          : 'bg-[#FAF8F5] text-[#687163] border-[#E8E4DC] hover:text-[#1D241C]'
                        }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                  Flat, House No., Building, Street *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Flat 402, Royal Palms, Link Road"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                  Area, Colony, Sector, Landmark (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near City Center Mall"
                  value={addressForm.apartment}
                  onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                    City *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Mumbai"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                    State *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Maharashtra"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs text-[#1D241C]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1D241C] block mb-1">
                    PIN Code *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 400050"
                    pattern="[0-9]{6}"
                    title="Please enter a 6-digit PIN code"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E8E4DC] rounded-xl focus:outline-none focus:border-[#C69E58] text-xs font-mono text-[#1D241C]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="defaultAddressCheckbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="rounded text-[#506040] focus:ring-[#506040]"
                />
                <label htmlFor="defaultAddressCheckbox" className="text-xs text-[#1D241C] cursor-pointer font-medium">
                  Set as default shipping address
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E4DC]">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#687163] hover:text-[#1D241C] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingAddress}
                  className="px-5 py-2 bg-[#1D241C] hover:bg-[#C69E58] text-white hover:text-[#1D241C] text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSavingAddress ? 'Saving...' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;
