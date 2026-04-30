import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const CartPage = () => {
    const { cartItems, removeItem, addItem, decreaseQty } = useCartStore();

    const subtotal = cartItems ? cartItems.reduce((acc, item) => acc + (item.price || 0) * (item.qty || 0), 0) : 0;

    return (
        <div className="pt-28 pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <h1 className="text-4xl font-black text-stormy-dark mb-10 tracking-tight">Your Bag</h1>

                {!cartItems || cartItems.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-16 text-center shadow-xl shadow-gray-200/50 border border-white flex flex-col items-center animate-in fade-in zoom-in duration-700">
                        <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mb-8 shadow-inner">
                            <ShoppingBag className="w-10 h-10 text-gray-200" />
                        </div>
                        <h2 className="text-2xl font-bold text-stormy-dark mb-4">Bag is currently empty</h2>
                        <p className="text-gray-400 text-sm mb-12 font-medium">Seems like you haven't added anything to your collection yet.</p>
                        <Link to="/products" className="w-full sm:w-auto text-center bg-stormy-dark text-white px-12 py-5 rounded-2xl font-bold text-sm hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-stormy-dark/20 transition-all duration-300 shadow-xl shadow-stormy-dark/10">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Bag Items */}
                        <div className="flex-[2] space-y-6">
                            {cartItems.map((item) => (
                                <div key={item._id} className="bg-white rounded-[2.5rem] p-8 border border-white shadow-xl shadow-gray-200/50 flex flex-col sm:flex-row items-center gap-8 group hover:border-stormy-blue/30 transition-all duration-500">
                                    <div className="w-36 h-36 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 shadow-sm">
                                        <img
                                            src={item.images?.[0] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'}
                                            alt=""
                                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                                        />
                                    </div>
                                    <div className="flex-grow text-center sm:text-left">
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{item.category}</p>
                                        <h3 className="text-xl font-bold text-stormy-dark mb-3 tracking-tight">{item.name}</h3>
                                        <div className="flex items-center justify-center sm:justify-start space-x-3 mb-6">
                                            {item.fashionDetails?.sizes && <span className="text-[10px] bg-gray-50 px-3 py-1.5 rounded-lg text-gray-500 font-bold uppercase tracking-widest">Size: M</span>}
                                            <span className="text-[10px] bg-green-50 px-3 py-1.5 rounded-lg text-green-600 font-bold uppercase tracking-widest">In Stock</span>
                                        </div>
                                    </div>
                                    {/* Quantity Actions */}
                                    <div className="flex items-center bg-gray-50 rounded-2xl p-1.5 border border-gray-100 shadow-inner">
                                        <button onClick={() => decreaseQty(item._id)} className="p-2.5 text-gray-400 hover:text-stormy-dark transition-colors"><Minus className="w-4 h-4" /></button>
                                        <span className="w-12 text-center font-bold text-sm text-stormy-dark">{item.qty}</span>
                                        <button onClick={() => addItem(item)} className="p-2.5 text-gray-400 hover:text-stormy-dark transition-colors"><Plus className="w-4 h-4" /></button>
                                    </div>
                                    <div className="text-right flex flex-col items-center sm:items-end gap-5 min-w-[120px]">
                                        <span className="text-xl font-black text-stormy-dark tracking-tight">${((item.price || 0) * (item.qty || 1)).toFixed(2)}</span>
                                        <button
                                            onClick={() => removeItem(item._id)}
                                            className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Checkout Summary */}
                        <aside className="flex-1 sticky top-28">
                            <div className="bg-white rounded-[2.5rem] p-10 border border-white shadow-2xl shadow-gray-200/50">
                                <h3 className="text-lg font-bold text-stormy-dark mb-8">Order Summary</h3>
                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                                        <span>Subtotal</span>
                                        <span className="text-stormy-dark font-black">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                                        <span>Estimated Tax</span>
                                        <span className="text-stormy-dark font-black">$0.00</span>
                                    </div>
                                    <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                                        <span className="text-sm font-bold text-stormy-dark uppercase tracking-widest mb-1.5">Total Amount</span>
                                        <span className="text-3xl font-black text-stormy-dark tracking-tight">${subtotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link to="/checkout" className="w-full bg-stormy-dark text-white py-5 rounded-[1.5rem] font-bold text-sm flex items-center justify-center space-x-3 hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-stormy-dark/20 transition-all duration-500 shadow-xl shadow-stormy-dark/10 group">
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>

                                <div className="mt-8 flex items-center justify-center space-x-2 text-[8px] font-bold text-gray-300 uppercase tracking-[0.3em]">
                                    <ShieldCheck className="w-3 h-3" />
                                    <span>256-bit Secure Encryption</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
