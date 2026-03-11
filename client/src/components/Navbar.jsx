import { Menu, Search, ShoppingBag, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

const Navbar = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const userInfo = useAuthStore((state) => state.userInfo);

    const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + (item.qty || 0), 0) : 0;

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 group">
                        <div className="w-9 h-9 rounded-xl bg-stormy-dark flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-lg shadow-stormy-dark/10">
                            <span className="text-white font-black text-sm">S</span>
                        </div>
                        <span className="text-xl font-bold text-stormy-dark tracking-tight">Stormy Morning</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link to="/products" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-stormy-blue transition-colors">Shop</Link>
                        <Link to="/collections" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-stormy-blue transition-colors">Collections</Link>
                        <Link to="/about" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-stormy-blue transition-colors">About</Link>
                        <Link to="/contact" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-stormy-blue transition-colors">Contact</Link>
                    </div>

                    {/* Search Pill */}
                    <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 w-80 group focus-within:bg-white focus-within:ring-2 focus-within:ring-stormy-blue/10 transition-all">
                        <Search className="w-4 h-4 text-gray-400 group-focus-within:text-stormy-blue" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 text-gray-600 placeholder:text-gray-300 placeholder:italic"
                        />
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-6">
                        <Link to="/cart" className="relative p-2.5 bg-gray-50 rounded-full text-gray-500 hover:bg-stormy-blue hover:text-white transition-all shadow-sm">
                            <ShoppingBag className="w-5 h-5" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-stormy-bright text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <Link to={userInfo ? "/profile" : "/login"} className="p-2.5 bg-gray-50 rounded-full text-gray-500 hover:bg-stormy-blue hover:text-white transition-all shadow-sm">
                            <User className="w-5 h-5" />
                        </Link>
                        <button className="md:hidden p-2.5 bg-gray-50 rounded-full text-gray-500">
                            <Menu className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
