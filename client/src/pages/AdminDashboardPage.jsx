import {
    BarChart3,
    CheckCircle2,
    Clock,
    Filter,
    KeyRound,
    Package,
    Search,
    ShieldAlert,
    Truck,
    User as UserIcon
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useOrderStore from '../store/orderStore';

const AdminDashboardPage = () => {
    const { userInfo, resetRequests, getResetRequests, adminResetPassword} = useAuthStore();
    const { orders, fetchAllOrders, updateOrderStatus, loading } = useOrderStore();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!userInfo || userInfo.role !== 'admin') {
            navigate('/profile');
        } else {
            fetchAllOrders();
            getResetRequests();
        }
    }, [userInfo, navigate, fetchAllOrders, getResetRequests]);

    const handleStatusUpdate = async (id, status) => {
        await updateOrderStatus(id, status);
    };

    const handleAdminReset = async (id, name) => {
        const newPassword = window.prompt(`Enter new password for ${name}:`, 'Stormy123!');
        if (newPassword) {
            const result = await adminResetPassword(id, newPassword);
            if (result) alert(result.message);
        }
    };

    const filteredOrders = orders.filter(o =>
        o._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const stats = {
        totalOrders: orders.length,
        pending: orders.filter(o => o.orderStatus === 'Processing').length,
        shipped: orders.filter(o => o.orderStatus === 'Shipped').length,
        delivered: orders.filter(o => o.orderStatus === 'Delivered').length,
        revenue: orders.reduce((acc, o) => acc + o.totalAmount, 0).toFixed(2)
    };

    if (!userInfo || userInfo.role !== 'admin') return null;

    return (
        <div className="pt-28 pb-20 min-h-screen bg-[#F8FAFC]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <div className="bg-stormy-dark text-white p-2 rounded-xl">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h1 className="text-3xl font-black text-stormy-dark tracking-tight">Command Center</h1>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">Manage logistics and track premium sales growth.</p>
                    </div>

                    <div className="flex items-center bg-white rounded-2xl px-6 py-3 shadow-sm border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-stormy-light/20 flex items-center justify-center mr-4">
                            <UserIcon className="w-5 h-5 text-stormy-blue" />
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stormy-dark">{userInfo.name}</p>
                            <p className="text-[10px] font-black text-stormy-blue uppercase tracking-widest">Master Admin</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
                    {[
                        { label: 'Total Revenue', value: `$${stats.revenue}`, icon: BarChart3, color: 'text-green-500', bg: 'bg-green-50' },
                        { label: 'Active Orders', value: stats.totalOrders, icon: Package, color: 'text-stormy-blue', bg: 'bg-blue-50' },
                        { label: 'Processing', value: stats.pending, icon: Clock, color: 'text-orange-400', bg: 'bg-orange-50' },
                        { label: 'In Transit', value: stats.shipped, icon: Truck, color: 'text-purple-400', bg: 'bg-purple-50' },
                        { label: 'Delivered', value: stats.delivered, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-50' },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className={`${s.bg} ${s.color} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                                <s.icon className="w-5 h-5" />
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{s.label}</p>
                            <p className="text-2xl font-black text-stormy-dark">{s.value}</p>
                        </div>
                    ))}
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm mb-8">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by Order ID or Customer Name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-gray-50 border-none rounded-2xl pl-14 pr-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 transition-all outline-none"
                            />
                        </div>
                        <button className="bg-white border border-gray-100 text-stormy-dark px-8 py-4 rounded-2xl text-sm font-bold flex items-center hover:bg-gray-50 transition-colors">
                            <Filter className="w-4 h-4 mr-2" />
                            Advanced Filters
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Details</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Date</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center">
                                            <div className="w-8 h-8 border-4 border-stormy-blue/20 border-t-stormy-blue rounded-full animate-spin mx-auto mb-4"></div>
                                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Records...</p>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center">
                                            <Package className="w-8 h-8 text-gray-200 mx-auto mb-4" />
                                            <p className="text-xs font-bold text-gray-400">No orders found matching your search.</p>
                                        </td>
                                    </tr>
                                ) : filteredOrders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 animate-in fade-in duration-500">
                                        <td className="px-8 py-6">
                                            <p className="text-xs font-black text-stormy-dark mb-1">#{order._id.slice(-8).toUpperCase()}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase">{order.items.length} Product{order.items.length > 1 ? 's' : ''}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-bold text-stormy-dark">{order.user?.name || 'Guest'}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{order.shippingAddress.city}, {order.shippingAddress.country}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-xs text-gray-500 font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                                            <p className="text-[10px] text-gray-400">{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <p className="text-sm font-black text-stormy-dark">${order.totalAmount.toFixed(2)}</p>
                                            <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Processed</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${order.orderStatus === 'Delivered' ? 'bg-green-50 text-green-500' :
                                                    order.orderStatus === 'Shipped' ? 'bg-purple-50 text-purple-500' :
                                                        order.orderStatus === 'Out for Delivery' ? 'bg-blue-50 text-blue-500' :
                                                            'bg-orange-50 text-orange-500'
                                                }`}>
                                                {order.orderStatus}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex items-center justify-end space-x-2">
                                                {order.orderStatus === 'Processing' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order._id, 'Shipped')}
                                                        className="bg-stormy-dark text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-stormy-blue transition-colors flex items-center"
                                                    >
                                                        <Truck className="w-3 h-3 mr-2" />
                                                        Mark Shipped
                                                    </button>
                                                )}
                                                {order.orderStatus === 'Shipped' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order._id, 'Out for Delivery')}
                                                        className="bg-blue-500 text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-blue-600 transition-colors flex items-center"
                                                    >
                                                        <Truck className="w-3 h-3 mr-2" />
                                                        Out for Delivery
                                                    </button>
                                                )}
                                                {order.orderStatus === 'Out for Delivery' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                                                        className="bg-green-500 text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-green-600 transition-colors flex items-center"
                                                    >
                                                        <CheckCircle2 className="w-3 h-3 mr-2" />
                                                        Confirm Delivery
                                                    </button>
                                                )}
                                                <button className="p-2 text-gray-400 hover:text-stormy-blue hover:bg-gray-100 rounded-lg transition-all">
                                                    <Filter className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Placeholder */}
                    <div className="bg-gray-50/50 px-8 py-4 border-t border-gray-100 flex justify-between items-center">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Showing {filteredOrders.length} of {orders.length} Global Transactions</p>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 rounded-lg bg-white border border-gray-100 text-[10px] font-bold text-gray-400 disabled:opacity-50" disabled>Previous</button>
                            <button className="px-3 py-1 rounded-lg bg-white border border-gray-100 text-[10px] font-bold text-gray-400 disabled:opacity-50" disabled>Next</button>
                        </div>
                    </div>
                </div>

                {/* Maintenance & Tools */}
                <div className="mt-12 max-w-2xl">
                    {/* Password Reset Requests */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="bg-orange-50 text-orange-500 p-2 rounded-xl">
                                    <ShieldAlert className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-stormy-dark">Password Reset Requests</h2>
                            </div>
                            <span className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-[10px] font-black">{resetRequests.length} Pending</span>
                        </div>
                        <div className="max-h-[400px] overflow-y-auto">
                            {resetRequests.length === 0 ? (
                                <div className="p-12 text-center">
                                    <CheckCircle2 className="w-8 h-8 text-green-100 mx-auto mb-4" />
                                    <p className="text-xs font-bold text-gray-400">All clear! No pending reset requests.</p>
                                </div>
                            ) : (
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-gray-50">
                                        {resetRequests.map((user) => (
                                            <tr key={user._id} className="hover:bg-gray-50">
                                                <td className="px-8 py-4">
                                                    <p className="text-xs font-bold text-stormy-dark">{user.name}</p>
                                                    <p className="text-[10px] text-gray-400">{user.email}</p>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <button
                                                        onClick={() => handleAdminReset(user._id, user.name)}
                                                        className="bg-stormy-dark text-white px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-stormy-blue transition-colors flex items-center ml-auto"
                                                    >
                                                        <KeyRound className="w-3 h-3 mr-2" />
                                                        Reset Now
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
