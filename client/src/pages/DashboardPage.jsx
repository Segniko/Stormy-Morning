import {
    CheckCircle2,
    ChevronRight,
    Clock,
    HelpCircle,
    LogOut,
    Package,
    RefreshCcw,
    ShoppingBag,
    Truck,
    User as UserIcon
} from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useOrderStore from '../store/orderStore';

const DashboardPage = () => {
    const { userInfo, logout } = useAuthStore();
    const { orders, fetchMyOrders, loading: ordersLoading } = useOrderStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            fetchMyOrders();
        }
    }, [userInfo, navigate, fetchMyOrders]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Active order is the most recent one that isn't delivered yet
    const activeOrder = orders.find(o => o.orderStatus !== 'Delivered') || orders[0];
    const moodBoardItems = [];

    if (!userInfo) return null;

    return (
        <div className="pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Nav */}
                    <aside className="w-full lg:w-64 space-y-2">
                        <div className="bg-white rounded-2xl p-6 text-center mb-6 border border-gray-100 shadow-sm">
                            <div className="w-20 h-20 rounded-full bg-stormy-light mx-auto mb-4 overflow-hidden border-4 border-white shadow-sm flex items-center justify-center">
                                {userInfo?.avatar ? (
                                    <img src={userInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <UserIcon className="w-10 h-10 text-stormy-blue" />
                                )}
                            </div>
                            <h2 className="text-lg font-bold text-stormy-dark">{userInfo?.name || 'Guest User'}</h2>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {userInfo?.role || 'Member'} since 2026
                            </p>
                        </div>

                        <nav className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Log Out</span>
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 space-y-8">
                        <div className="flex justify-between items-end">
                            <div>
                                <h1 className="text-3xl font-bold text-stormy-dark mb-1">Dashboard</h1>
                                <p className="text-gray-400 text-sm">Track your latest tech drops and fashion finds.</p>
                            </div>
                        </div>

                        {/* Active Order Card with Stepper - Only show if current orders exist */}
                        {ordersLoading ? (
                            <div className="bg-white rounded-3xl p-20 border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                                <div className="w-10 h-10 border-4 border-stormy-blue/20 border-t-stormy-blue rounded-full animate-spin mb-4"></div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Syncing Orders...</p>
                            </div>
                        ) : activeOrder && (
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden animate-in fade-in duration-700">
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <h3 className="text-lg font-bold text-stormy-dark mb-1 uppercase tracking-tighter">Order #{activeOrder._id.slice(-6)}</h3>
                                        <p className="text-xs text-gray-400 font-medium tracking-tight">
                                            {activeOrder.items.map(i => i.product?.name || 'Product').join(', ')} — Total ${activeOrder.totalAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center ${activeOrder.paymentStatus === 'Paid' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-stormy-blue'}`}>
                                        <span className={`w-2 h-2 rounded-full mr-2 ${activeOrder.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-stormy-blue animate-pulse'}`}></span>
                                        {activeOrder.orderStatus.toUpperCase()}
                                    </div>
                                </div>

                                {/* Visual Stepper */}
                                <div className="relative flex justify-between items-center mb-10 px-4">
                                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-50 -translate-y-1/2 z-0"></div>
                                    <div className={`absolute top-1/2 left-0 h-0.5 bg-stormy-blue -translate-y-1/2 z-0 transition-all duration-1000`} style={{
                                        width: activeOrder.orderStatus === 'Processing' ? '0%' :
                                            activeOrder.orderStatus === 'Shipped' ? '33%' :
                                                activeOrder.orderStatus === 'Out for Delivery' ? '66%' : '100%'
                                    }}></div>

                                    {[
                                        { label: 'Order Placed', icon: CheckCircle2, status: 'Processing' },
                                        { label: 'Shipped', icon: Truck, status: 'Shipped' },
                                        { label: 'Out for Delivery', icon: LogOut, status: 'Out for Delivery' },
                                        { label: 'Delivered', icon: Package, status: 'Delivered' },
                                    ].map((step, idx) => {
                                        const isCompleted = activeOrder.orderStatus === step.status ||
                                            (idx === 0) ||
                                            (idx === 1 && ['Shipped', 'Out for Delivery', 'Delivered'].includes(activeOrder.orderStatus)) ||
                                            (idx === 2 && ['Out for Delivery', 'Delivered'].includes(activeOrder.orderStatus)) ||
                                            (idx === 3 && activeOrder.orderStatus === 'Delivered');

                                        return (
                                            <div key={idx} className="relative z-10 flex flex-col items-center">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-all duration-500 ${isCompleted ? 'bg-stormy-dark text-white' : 'bg-gray-100 text-gray-300'}`}>
                                                    <step.icon className="w-4 h-4" />
                                                </div>
                                                <div className="absolute top-12 whitespace-nowrap text-center">
                                                    <p className={`text-[10px] font-bold uppercase tracking-tight ${isCompleted ? 'text-stormy-dark' : 'text-gray-300'}`}>{step.label}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Bottom Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">


                            <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-stormy-dark mb-8">Support & Returns</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group border border-transparent hover:border-stormy-blue transition-all">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-stormy-blue shadow-sm">
                                                    <HelpCircle className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-stormy-dark">Tech Support</p>
                                                    <p className="text-[10px] text-gray-400">Setup and troubleshooting</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-stormy-blue transition-all" />
                                        </button>
                                        <button className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl group border border-transparent hover:border-stormy-blue transition-all">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-400 shadow-sm">
                                                    <RefreshCcw className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="text-xs font-bold text-stormy-dark">Start a Return</p>
                                                    <p className="text-[10px] text-gray-400">30-day money back guarantee</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-stormy-blue transition-all" />
                                        </button>
                                    </div>
                                </div>
                                <div className="lg:w-72 bg-gray-50 p-6 rounded-2xl flex items-start space-x-3 self-stretch">
                                    <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                                    <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
                                        Holiday season returns extended until Jan 31st for all tech items. Our experts are available 24/7 for support.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Transactions Table Widget */}
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-stormy-dark">Recent Transactions</h3>
                                <button className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-stormy-blue">Filter</button>
                            </div>
                            <div className="overflow-x-auto">
                                {orders.length > 0 ? (
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-50 pb-4">
                                                <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-4">Order ID</th>
                                                <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-4">Product</th>
                                                <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-4">Date</th>
                                                <th className="text-left text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-4">Status</th>
                                                <th className="text-right text-[10px] font-bold uppercase tracking-widest text-gray-400 pb-4">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order._id} className="group hover:bg-gray-50 transition-colors">
                                                    <td className="py-5 text-xs font-bold text-stormy-dark uppercase tracking-tight">#{order._id.slice(-6)}</td>
                                                    <td className="py-5 text-xs text-gray-500">
                                                        {order.items[0]?.product?.name || 'Unknown Product'}
                                                        {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                                                    </td>
                                                    <td className="py-5 text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                                                    <td className="py-5">
                                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${order.paymentStatus === 'Paid' ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-stormy-blue'}`}>
                                                            {order.orderStatus}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 text-xs font-bold text-stormy-dark text-right">${order.totalAmount.toFixed(2)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-20">
                                        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                            <ShoppingBag className="w-8 h-8 text-gray-200" />
                                        </div>
                                        <p className="text-xs font-bold text-gray-400">No transactions found</p>
                                        <p className="text-[10px] text-gray-500 mt-1">Your recent orders will appear here once you make a purchase.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
