import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useCartStore from '../store/cartStore';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');
    const navigate = useNavigate();

    const cartItems = useCartStore((state) => state.cartItems);
    const userInfo = useAuthStore((state) => state.userInfo);

    const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + (item.qty || 0), 0) : 0;

    const navLinks = [
        { name: 'Shop', path: '/products' },
        { name: 'Collections', path: '/collections' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            navigate(`/products?search=${searchKeyword}`);
            setIsMenuOpen(false);
            setSearchKeyword('');
        }
    };

    return (
        <>
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
                            {navLinks.map((link) => (
                                <Link key={link.name} to={link.path} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-stormy-blue transition-colors">
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Search Pill */}
                        <div className="hidden lg:flex items-center bg-gray-50 border border-gray-100 rounded-full px-5 py-2.5 w-80 group focus-within:bg-white focus-within:ring-2 focus-within:ring-stormy-blue/10 transition-all">
                            <Search className="w-4 h-4 text-gray-400 group-focus-within:text-stormy-blue" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={handleSearch}
                                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 text-gray-600 placeholder:text-gray-300 placeholder:italic"
                            />
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center space-x-4 md:space-x-6">
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
                            <button 
                                onClick={() => setIsMenuOpen(true)}
                                className="md:hidden p-2.5 bg-gray-50 rounded-full text-gray-500 hover:bg-gray-100 transition-all"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Drawer */}
            <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isMenuOpen ? 'visible' : 'invisible'}`}>
                {/* Backdrop */}
                <div 
                    className={`absolute inset-0 bg-stormy-dark/40 backdrop-blur-md transition-opacity duration-500 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    onClick={() => setIsMenuOpen(false)}
                />
                
                {/* Drawer */}
                <div className={`absolute right-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-6 flex justify-between items-center border-b border-gray-50">
                        <span className="text-sm font-black uppercase tracking-widest text-stormy-dark">Menu</span>
                        <button 
                            onClick={() => setIsMenuOpen(false)}
                            className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-stormy-dark transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-8 flex-grow">
                        {/* Mobile Search */}
                        <div className="flex items-center bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4 group focus-within:bg-white focus-within:ring-2 focus-within:ring-stormy-blue/10 transition-all">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchKeyword}
                                onChange={(e) => setSearchKeyword(e.target.value)}
                                onKeyDown={handleSearch}
                                className="bg-transparent border-none focus:ring-0 text-sm w-full ml-3 text-stormy-dark placeholder:text-gray-300"
                            />
                        </div>

                        {/* Links */}
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-6 py-4 rounded-2xl text-lg font-bold text-stormy-dark hover:bg-stormy-blue/5 hover:text-stormy-blue transition-all"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100">
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] text-center">
                            Stormy Morning &copy; 2026
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
