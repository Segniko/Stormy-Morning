import { ArrowLeft, ArrowRight, CheckCircle2, CreditCard, MapPin, ShieldCheck, Truck } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';
import useOrderStore from '../store/orderStore';

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCartStore();
    const { userInfo } = useAuthStore();
    const { createOrder, loading: orderLoading } = useOrderStore();
    const [step, setStep] = useState(1);
    const [shippingData, setShippingData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        zip: '',
        country: 'Ethiopia'
    });

    const subtotal = cartItems ? cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0) : 0;
    const shipping = 15.00;
    const total = subtotal + shipping;

    const handleShippingChange = (e) => {
        setShippingData({ ...shippingData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = async () => {
        const orderData = {
            items: cartItems.map(item => ({
                _id: item._id,
                quantity: item.qty,
                priceAtPurchase: item.price
            })),
            shippingAddress: {
                street: shippingData.street,
                city: shippingData.city,
                zip: shippingData.zip,
                country: shippingData.country
            },
            totalAmount: total
        };

        const result = await createOrder(orderData);
        if (result) {
            clearCart();
            setStep(3);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="pt-28 pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <Link to="/cart" className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4 hover:text-stormy-blue transition-colors group">
                            <ArrowLeft className="w-3 h-3 mr-2 transition-transform group-hover:-translate-x-1" />
                            Back to Bag
                        </Link>
                        <h1 className="text-4xl font-black text-stormy-dark tracking-tight">Secure Checkout</h1>
                    </div>

                    {/* Visual Step Indicator */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= 1 ? 'bg-stormy-dark text-white shadow-lg shadow-stormy-dark/20' : 'bg-white text-gray-300'}`}>
                                {step > 1 ? <CheckCircle2 className="w-5 h-5 text-white" /> : '01'}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 1 ? 'text-stormy-dark' : 'text-gray-300'}`}>Shipping</span>
                        </div>
                        <div className={`w-12 h-[2px] rounded-full transition-colors duration-500 ${step >= 2 ? 'bg-stormy-dark' : 'bg-gray-200'}`}></div>
                        <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-500 ${step >= 2 ? 'bg-stormy-dark text-white shadow-lg shadow-stormy-dark/20' : 'bg-white text-gray-300'}`}>
                                {step > 2 ? <CheckCircle2 className="w-5 h-5 text-white" /> : '02'}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 2 ? 'text-stormy-dark' : 'text-gray-300'}`}>Payment</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* Main Content Area */}
                    <div className="w-full lg:flex-[1.8] space-y-8">

                        {step === 1 && (
                            <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-xl shadow-gray-200/50 border border-white animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="flex items-center space-x-3 mb-10">
                                    <div className="w-8 h-8 rounded-xl bg-stormy-light/20 flex items-center justify-center">
                                        <MapPin className="w-4 h-4 text-stormy-blue" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-stormy-dark">Shipping Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">First Name</label>
                                        <input name="firstName" value={shippingData.firstName} onChange={handleShippingChange} type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="Enter first name" required />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Last Name</label>
                                        <input name="lastName" value={shippingData.lastName} onChange={handleShippingChange} type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="Enter last name" required />
                                    </div>
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Delivery Address</label>
                                        <input name="street" value={shippingData.street} onChange={handleShippingChange} type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="Street address, apartment, suite" required />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">City</label>
                                        <input name="city" value={shippingData.city} onChange={handleShippingChange} type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="New York" required />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Postal Code</label>
                                        <input name="zip" value={shippingData.zip} onChange={handleShippingChange} type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="10001" required />
                                    </div>
                                </div>

                                <div className="mt-12 p-6 bg-gray-50 rounded-3xl border border-gray-100/50 flex items-start space-x-4">
                                    <div className="mt-1">
                                        <Truck className="w-5 h-5 text-stormy-blue" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-stormy-dark mb-1">Standard Premium Delivery</h4>
                                        <p className="text-xs text-gray-400 leading-relaxed font-medium">Estimated arrival in 3-5 business days. Your package will be handled with meticulous care.</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    className="mt-12 w-full bg-stormy-dark text-white py-5 rounded-[1.5rem] font-bold text-sm hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-stormy-dark/20 transition-all duration-500 flex items-center justify-center group"
                                >
                                    Continue to Payments
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="bg-white rounded-[2.5rem] p-10 lg:p-14 shadow-xl shadow-gray-200/50 border border-white animate-in fade-in slide-in-from-bottom-8 duration-700">
                                <div className="flex items-center space-x-3 mb-10">
                                    <div className="w-8 h-8 rounded-xl bg-stormy-light/20 flex items-center justify-center">
                                        <CreditCard className="w-4 h-4 text-stormy-blue" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-stormy-dark">Payment Information</h2>
                                </div>

                                <div className="grid grid-cols-1 gap-6 mb-10">
                                    <div className="relative group cursor-pointer">
                                        <div className="absolute inset-0 bg-stormy-blue rounded-[2rem] opacity-0 group-hover:opacity-5 transition-opacity"></div>
                                        <div className="border-2 border-stormy-blue p-8 rounded-[2rem] flex items-center justify-between bg-blue-50/30">
                                            <div className="flex items-center space-x-6">
                                                <div className="w-16 h-10 bg-stormy-dark rounded-xl flex items-center justify-center shadow-lg shadow-black/10">
                                                    <span className="text-white text-[10px] font-black italic uppercase">VISA</span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-stormy-dark">Credit / Debit Card</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Directly processed by Stripe</p>
                                                </div>
                                            </div>
                                            <div className="w-6 h-6 rounded-full border-2 border-stormy-blue flex items-center justify-center">
                                                <div className="w-3 h-3 bg-stormy-blue rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border border-gray-100 p-8 rounded-[2rem] flex items-center justify-between hover:bg-gray-50 transition-colors cursor-not-allowed opacity-50">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-16 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                                                <span className="text-gray-400 text-[10px] font-black italic">PAYPAL</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-gray-400">PayPal Express</p>
                                                <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-1">Temporarily unavailable</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-8 mb-12">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Name on Card</label>
                                        <input type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Card Number</label>
                                        <input type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="0000 0000 0000 0000" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Expiration</label>
                                            <input type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="MM / YY" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Security Code</label>
                                            <input type="text" className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-stormy-blue/20 focus:bg-white transition-all outline-none" placeholder="CVC" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={orderLoading || cartItems.length === 0}
                                    className="w-full bg-stormy-dark text-white py-5 rounded-[1.5rem] font-bold text-sm hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-stormy-dark/20 transition-all duration-500 shadow-xl shadow-stormy-dark/10 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {orderLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                            <span>Processing Secure Payment...</span>
                                        </>
                                    ) : (
                                        <span>Pay ${total.toFixed(2)} Securely</span>
                                    )}
                                </button>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="bg-white rounded-[2.5rem] p-16 lg:p-24 shadow-xl shadow-gray-200/50 border border-white text-center animate-in zoom-in duration-700">
                                <div className="w-24 h-24 bg-green-50 text-green-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-lg shadow-green-500/10">
                                    <ShieldCheck className="w-12 h-12" />
                                </div>
                                <h2 className="text-4xl font-black text-stormy-dark mb-6 tracking-tight">Order Confirmed!</h2>
                                <p className="text-gray-400 text-sm max-w-sm mx-auto mb-12 font-medium leading-relaxed">
                                    We've received your order **#ST-88392**. A confirmation email is on its way to your inbox.
                                </p>
                                <Link to="/profile" className="bg-stormy-dark text-white px-14 py-5 rounded-2xl font-bold text-sm hover:translate-y-[-2px] transition-all duration-300 shadow-xl shadow-stormy-dark/10 inline-block">
                                    View My Order
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Summary Area */}
                    <aside className="w-full lg:flex-1 sticky top-28">
                        <div className="bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white shadow-2xl shadow-gray-200/50 overflow-hidden relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-stormy-blue/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                            <h3 className="text-lg font-bold text-stormy-dark mb-8 relative z-10">Premium Summary</h3>

                            <div className="space-y-8 mb-10 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                {cartItems && cartItems.length > 0 ? cartItems.map((item) => (
                                    <div key={item._id} className="flex space-x-5 group">
                                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                                            <img src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-center py-1">
                                            <p className="text-[11px] font-black text-stormy-dark mb-1 line-clamp-1 group-hover:text-stormy-blue transition-colors uppercase tracking-tight">{item.name}</p>
                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{item.qty || 1} Unit{item.qty > 1 ? 's' : ''} × ${item.price}</p>
                                        </div>
                                    </div>
                                )) : (
                                    <p className="text-xs text-gray-300 font-bold uppercase tracking-widest text-center py-10">Your bag is empty</p>
                                )}
                            </div>

                            <div className="space-y-4 pt-8 border-t border-gray-100/50 mb-10 relative z-10">
                                <div className="flex justify-between text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                                    <span>Subtotal</span>
                                    <span className="text-stormy-dark font-black">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                                    <span>Premium Shipping</span>
                                    <span className="text-stormy-dark font-black">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-stormy-dark pt-6 border-t border-gray-100/50 mt-4">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="bg-stormy-dark/5 p-6 rounded-3xl flex items-start space-x-4 border border-stormy-dark/5 relative z-10">
                                <Truck className="w-5 h-5 text-stormy-blue flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[10px] text-gray-500 leading-relaxed font-bold uppercase tracking-tight">
                                        Estimated Delivery
                                    </p>
                                    <p className="text-xs font-black text-stormy-dark mt-1">Nov 02 - Nov 04, 2026</p>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-center space-x-2 text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em] relative z-10">
                                <ShieldCheck className="w-3 h-3" />
                                <span>End-to-End Encryption</span>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
