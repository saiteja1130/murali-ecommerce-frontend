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

  // Determine active tab from route or state
  const [activeTab, setActiveTab] = useState(tab);
  const [selectedOrderId, setSelectedOrderId] = useState(orderIdParam || null);

  // Address Modal State
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addressForm, setAddressForm] = useState({
    name: currentUser?.name || 'Eleanor Vance',
    street: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: '+1 (415) 890-2144',
    isDefault: false
  });

  // Reorder notification feedback
  const [reorderSuccess, setReorderSuccess] = useState('');

  // Sync tab with URL
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
    setSelectedOrderId(null);
    navigate(`/account/${newTab}`);
  };

  const handleViewOrderDetail = (orderId) => {
    setSelectedOrderId(orderId);
    setActiveTab('order-detail');
    navigate(`/account/orders/${orderId}`);
  };

  const activeOrder = orders.find(
    (o) => o.id === selectedOrderId || o.orderNumber === selectedOrderId
  ) || orders[0];

  // Address modal handlers
  const handleOpenAddAddress = () => {
    setEditingAddress(null);
    setAddressForm({
      name: currentUser?.name || 'Eleanor Vance',
      street: '',
      apartment: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
      phone: '+1 (415) 890-2144',
      isDefault: addresses.length === 0
    });
    setIsAddressModalOpen(true);
  };

  const handleOpenEditAddress = (addr) => {
    setEditingAddress(addr);
    setAddressForm({ ...addr });
    setIsAddressModalOpen(true);
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (editingAddress) {
      onUpdateAddress({ ...addressForm, id: editingAddress.id });
    } else {
      onAddAddress({ ...addressForm, id: `addr-${Date.now()}` });
    }
    setIsAddressModalOpen(false);
  };

  const handleReorder = (order) => {
    if (!order || !order.items) return;
    order.items.forEach((item) => {
      if (onAddToCart) {
        onAddToCart(
          item.product || {
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            images: [item.image],
            category: 'Apparel',
            sizes: ['S', 'M', 'L'],
            colors: [{ name: item.color || 'Standard', hex: '#1A1A1A' }]
          },
          item.size || 'M',
          { name: item.color || 'Standard', hex: '#1A1A1A' },
          item.quantity || 1
        );
      }
    });
    setReorderSuccess('Pieces have been added to your shopping bag!');
    setTimeout(() => setReorderSuccess(''), 4000);
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
          <Link to="/account/orders" className="hover:text-[#1A1A1A] transition-colors">Patron Account</Link>
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
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1A1A]">
                  {currentUser?.name || 'Eleanor Vance'}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-mono tracking-widest bg-[#FAF8F5] text-[#1A1A1A] font-bold border border-[#E8E3DE]">
                  <Sparkles className="w-3 h-3 text-[#C8A87C]" />
                  Patron Account
                </span>
              </div>
              <p className="text-xs text-[#6B6B6B] mt-1">
                {currentUser?.email || 'eleanor.vance@sumilux.com'} • Member since {currentUser?.memberSince || '2026'}
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

        {/* Reorder Toast Banner */}
        {reorderSuccess && (
          <div className="mb-6 p-4 bg-[#4A7A5E]/10 border border-[#4A7A5E]/30 rounded-xs text-xs text-[#4A7A5E] flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4A7A5E]" />
              <span>{reorderSuccess}</span>
            </div>
            <Link to="/cart" className="font-bold underline hover:text-[#1A1A1A]">
              View Shopping Bag →
            </Link>
          </div>
        )}

        {/* Main Grid: Navigation Tabs (Left) + Content (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-2 bg-white p-3 rounded-[4px] border border-[#E8E3DE] shadow-2xs">
            <button
              onClick={() => handleTabChange('orders')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                activeTab === 'orders' || activeTab === 'order-detail'
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
              onClick={() => handleTabChange('addresses')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                activeTab === 'addresses'
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
              onClick={() => handleTabChange('payments')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                activeTab === 'payments'
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
              onClick={() => handleTabChange('profile')}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#1A1A1A] text-white shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F6F3]'
              }`}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-[#C8A87C]" />
                <span>Patron Profile</span>
              </div>
            </button>

            <div className="pt-3 border-t border-[#E8E3DE] mt-3">
              <Link
                to="/support"
                className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-[#6B6B6B] hover:text-[#1A1A1A] hover:bg-[#F8F6F3] rounded-xs transition-colors"
              >
                <Headphones className="w-4 h-4 text-[#C8A87C]" />
                <span>Client Support & Concierge</span>
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
                      Review all past orders, delivery tracking numbers, and garment receipts.
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
                      Your atelier collection wardrobe is waiting. Explore our signature pieces crafted from certified organic textiles.
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
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-[#1A1A1A]">
                                {order.orderNumber}
                              </span>
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${getStatusBadge(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#6B6B6B] flex items-center gap-3">
                              <span>Placed on {order.date}</span>
                              <span>•</span>
                              <span>{order.items?.length || 0} Piece(s)</span>
                              <span>•</span>
                              <span>Paid via {order.paymentMethod || 'Credit Card'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 sm:text-right">
                            <div>
                              <div className="text-[10px] uppercase tracking-wider text-[#6B6B6B]">Total Amount</div>
                              <div className="font-mono text-base font-bold text-[#1A1A1A]">
                                ₹{order.total?.toFixed(2)}
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
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-14 h-16 object-cover rounded-xs border border-[#E8E3DE] bg-[#F8F6F3]"
                                />
                                <div className="text-xs">
                                  <p className="font-semibold text-[#1A1A1A] truncate max-w-[140px]">
                                    {item.name}
                                  </p>
                                  <p className="text-[11px] text-[#6B6B6B]">
                                    {item.size} • Qty: {item.quantity}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleReorder(order)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#1A1A1A] hover:text-[#C8A87C] border border-[#E8E3DE] hover:border-[#C8A87C] rounded-xs transition-colors cursor-pointer bg-white"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                              <span>Reorder Pieces</span>
                            </button>
                          </div>
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
                    <div className="flex items-center gap-3">
                      <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">
                        Order #{activeOrder.orderNumber}
                      </h2>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border ${getStatusBadge(
                          activeOrder.status
                        )}`}
                      >
                        {activeOrder.status}
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
                    <button
                      onClick={() => handleReorder(activeOrder)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
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
                          className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors shadow-2xs mb-2 ${
                            item.done
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
                      <a
                        href={`https://www.dhl.com/en/express/tracking.html?AWB=${activeOrder.trackingNumber}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-[#C8A87C] hover:underline flex items-center gap-1"
                      >
                        <span>Live Carrier Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
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
                        <div className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-20 object-cover rounded-xs border border-[#E8E3DE] bg-[#F8F6F3]"
                          />
                          <div className="space-y-1">
                            <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">
                              {item.name}
                            </h4>
                            <div className="text-xs text-[#6B6B6B] flex items-center gap-3">
                              <span>Size: <strong className="text-[#1A1A1A]">{item.size}</strong></span>
                              <span>•</span>
                              <span>Color: <strong className="text-[#1A1A1A]">{item.color || 'Signature'}</strong></span>
                              <span>•</span>
                              <span>Quantity: <strong className="text-[#1A1A1A]">{item.quantity}</strong></span>
                            </div>
                            <div className="text-[11px] text-[#A68758]">
                              Handcrafted with certified Italian textiles
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-mono text-base font-bold text-[#1A1A1A]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <div className="text-[11px] text-[#6B6B6B]">
                            ₹{item.price.toFixed(2)} each
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2-Column Section: Shipping Address & Financial Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Shipping & Delivery Dossier */}
                  <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A68758]">
                      <MapPin className="w-4 h-4 text-[#C8A87C]" />
                      <span>Shipping Destination</span>
                    </div>

                    <div className="text-xs space-y-1 text-[#1A1A1A]">
                      <div className="font-bold text-sm">{activeOrder.shippingAddress?.name || currentUser?.name || 'Eleanor Vance'}</div>
                      <div className="text-[#6B6B6B]">{activeOrder.shippingAddress?.street || '742 Montgomery Street, Suite 1400'}</div>
                      <div className="text-[#6B6B6B]">
                        {activeOrder.shippingAddress?.city || 'San Francisco'}, {activeOrder.shippingAddress?.state || 'CA'} {activeOrder.shippingAddress?.postalCode || '94111'}
                      </div>
                      <div className="text-[#6B6B6B]">{activeOrder.shippingAddress?.country || 'United States'}</div>
                      <div className="text-[#6B6B6B] pt-2">Phone: +1 (415) 890-2144</div>
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 shadow-2xs space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A68758]">
                      <CreditCard className="w-4 h-4 text-[#C8A87C]" />
                      <span>Payment Summary</span>
                    </div>

                    <div className="space-y-2 text-xs divide-y divide-[#F2EFE9]">
                      <div className="flex justify-between py-1 text-[#6B6B6B]">
                        <span>Subtotal</span>
                        <span className="font-mono text-[#1A1A1A]">
                          ${((activeOrder.total || 0) * 1.15).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between py-1 text-[#4A7A5E]">
                        <span>Promotional Discount (SUMI15)</span>
                        <span className="font-mono">-${((activeOrder.total || 0) * 0.15).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1 text-[#6B6B6B]">
                        <span>Complimentary Global Express</span>
                        <span className="font-mono text-emerald-600 uppercase font-semibold">Free</span>
                      </div>
                      <div className="flex justify-between py-1 text-[#6B6B6B]">
                        <span>Estimated Taxes & Duties</span>
                        <span className="font-mono text-[#1A1A1A]">₹0.00 (Inclusive)</span>
                      </div>
                      <div className="flex justify-between pt-3 font-bold text-sm text-[#1A1A1A]">
                        <span>Total Paid</span>
                        <span className="font-mono text-base text-[#1A1A1A]">
                          ${activeOrder.total?.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================
                TAB 3: ADDRESS BOOK
            ============================================================ */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
                  <div>
                    <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">Saved Address Book</h2>
                    <p className="text-xs text-[#6B6B6B] mt-0.5">
                      Manage your primary shipping residence, holiday ateliers, and concierge drop-off locations.
                    </p>
                  </div>

                  <button
                    onClick={handleOpenAddAddress}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Address</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      className={`bg-white rounded-[4px] border p-6 shadow-2xs relative flex flex-col justify-between ${
                        addr.isDefault ? 'border-[#C8A87C] ring-1 ring-[#C8A87C]/30' : 'border-[#E8E3DE]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-bold text-sm text-[#1A1A1A]">{addr.name}</span>
                          {addr.isDefault && (
                            <span className="px-2 py-0.5 bg-[#C8A87C]/15 text-[#A68758] border border-[#C8A87C]/30 rounded text-[10px] font-bold uppercase tracking-wider font-mono">
                              Default Shipping
                            </span>
                          )}
                        </div>

                        <div className="text-xs text-[#6B6B6B] space-y-1">
                          <p>{addr.street}</p>
                          {addr.apartment && <p>{addr.apartment}</p>}
                          <p>
                            {addr.city}, {addr.state} {addr.postalCode}
                          </p>
                          <p>{addr.country}</p>
                          <p className="pt-2 font-mono text-[#1A1A1A]">Phone: {addr.phone}</p>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-[#F2EFE9] flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleOpenEditAddress(addr)}
                            className="text-[#1A1A1A] hover:text-[#C8A87C] flex items-center gap-1 font-semibold transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => onDeleteAddress(addr.id)}
                            className="text-[#A5432F] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>

                        {!addr.isDefault && (
                          <button
                            onClick={() => onSetDefaultAddress(addr.id)}
                            className="text-xs text-[#A68758] hover:text-[#1A1A1A] font-semibold underline cursor-pointer"
                          >
                            Set as Default
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ============================================================
                TAB 4: PAYMENT HISTORY & METHODS
            ============================================================ */}
            {activeTab === 'payments' && (
              <div className="space-y-8">
                {/* Transaction Ledger */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
                    <div>
                      <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">Payment Histories</h2>
                      <p className="text-xs text-[#6B6B6B] mt-0.5">
                        Detailed audit trail of all authorizations, payments, and settlements.
                      </p>
                    </div>
                  </div>

                  <div className="bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xs overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E8E3DE] bg-[#FAF8F5] text-[10px] uppercase tracking-wider text-[#6B6B6B]">
                          <th className="py-3.5 px-4 font-semibold">Transaction</th>
                          <th className="py-3.5 px-4 font-semibold">Date</th>
                          <th className="py-3.5 px-4 font-semibold">Method</th>
                          <th className="py-3.5 px-4 font-semibold">Order</th>
                          <th className="py-3.5 px-4 font-semibold">Amount</th>
                          <th className="py-3.5 px-4 font-semibold">Status</th>
                          <th className="py-3.5 px-4 font-semibold text-right">Receipt</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F2EFE9]">
                        {payments.map((p) => (
                          <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                            <td className="py-3.5 px-4 font-mono font-semibold text-[#1A1A1A]">
                              {p.transactionId || p.id}
                            </td>
                            <td className="py-3.5 px-4 text-[#6B6B6B]">{p.date}</td>
                            <td className="py-3.5 px-4 text-[#1A1A1A] font-medium flex items-center gap-1.5">
                              <CreditCard className="w-3.5 h-3.5 text-[#C8A87C]" />
                              <span>{p.method}</span>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-[#A68758]">{p.orderNumber}</td>
                            <td className="py-3.5 px-4 font-mono font-bold text-[#1A1A1A]">
                              ${p.amount?.toFixed(2)}
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {p.status || 'Settled'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => window.print()}
                                className="text-xs text-[#A68758] hover:text-[#1A1A1A] font-semibold underline cursor-pointer"
                              >
                                PDF Receipt
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Saved Payment Methods */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
                    <div>
                      <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">Saved Payment Methods</h3>
                      <p className="text-xs text-[#6B6B6B] mt-0.5">
                        Encrypted payment methods for instant 1-click checkout.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-white border border-[#C8A87C] rounded-[4px] shadow-2xs relative flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-sm font-bold text-[#1A1A1A]">AMEX Centurion</span>
                          <span className="px-2 py-0.5 bg-[#C8A87C]/15 text-[#A68758] text-[10px] font-mono font-bold rounded">
                            Primary
                          </span>
                        </div>
                        <p className="font-mono text-base tracking-widest text-[#1A1A1A]">•••• •••• •••• 8821</p>
                        <p className="text-xs text-[#6B6B6B] mt-2">Expires 12/28 • Eleanor Vance</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#6B6B6B]">
                        <span className="flex items-center gap-1 text-emerald-700">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          TLS 1.3 Verified
                        </span>
                      </div>
                    </div>

                    <div className="p-5 bg-white border border-[#E8E3DE] rounded-[4px] shadow-2xs relative flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="font-mono text-sm font-bold text-[#1A1A1A]">Apple Pay</span>
                          <span className="text-[10px] text-neutral-400 font-mono">Biometric</span>
                        </div>
                        <p className="font-mono text-base tracking-widest text-[#1A1A1A]">Linked Device Card</p>
                        <p className="text-xs text-[#6B6B6B] mt-2">Apple Wallet • Touch ID / Face ID</p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-[#F2EFE9] flex items-center justify-between text-xs text-[#6B6B6B]">
                        <span className="flex items-center gap-1 text-emerald-700">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Tokenized Security
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ============================================================
                TAB 5: PATRON PROFILE & PREFERENCES
            ============================================================ */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="pb-3 border-b border-[#E8E3DE]">
                  <h2 className="font-serif text-xl font-bold text-[#1A1A1A]">Patron Profile & Atelier Preferences</h2>
                  <p className="text-xs text-[#6B6B6B] mt-0.5">
                    Customize your personal details, preferred garment sizing, and concierge communication.
                  </p>
                </div>

                <div className="bg-white rounded-[4px] border border-[#E8E3DE] p-6 sm:p-8 shadow-2xs space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name || 'Eleanor Vance'}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={currentUser?.email || 'eleanor.vance@sumilux.com'}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                        Telephone
                      </label>
                      <input
                        type="text"
                        defaultValue="+1 (415) 890-2144"
                        className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                        Preferred Size
                      </label>
                      <select className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]">
                        <option>Small (IT 40 / US 4)</option>
                        <option>Medium (IT 42 / US 6)</option>
                        <option>Large (IT 44 / US 8)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#F2EFE9] flex justify-end">
                    <button
                      onClick={() => alert('Profile preferences saved successfully.')}
                      className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                    >
                      Save Preferences
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-[4px] border border-[#E8E3DE] shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8E3DE]">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A]">
                {editingAddress ? 'Edit Delivery Address' : 'Add New Address'}
              </h3>
              <button
                onClick={() => setIsAddressModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-4 text-xs">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                  Recipient Full Name
                </label>
                <input
                  required
                  type="text"
                  value={addressForm.name}
                  onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                  Street Address
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. 742 Evergreen Terrace"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                  Apartment, Suite, Unit (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Penthouse 4B"
                  value={addressForm.apartment}
                  onChange={(e) => setAddressForm({ ...addressForm, apartment: e.target.value })}
                  className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    City
                  </label>
                  <input
                    required
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    State
                  </label>
                  <input
                    required
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A1A1A] block mb-1">
                    Postal Code
                  </label>
                  <input
                    required
                    type="text"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#E8E3DE] rounded-xs focus:outline-none focus:border-[#C8A87C]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="defaultAddressCheckbox"
                  checked={addressForm.isDefault}
                  onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                  className="rounded text-[#C8A87C] focus:ring-[#C8A87C]"
                />
                <label htmlFor="defaultAddressCheckbox" className="text-xs text-[#1A1A1A] cursor-pointer">
                  Set as default shipping address
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E8E3DE]">
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#6B6B6B] hover:text-[#1A1A1A] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1A1A1A] hover:bg-[#C8A87C] text-white hover:text-[#1A1A1A] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                >
                  Save Address
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
