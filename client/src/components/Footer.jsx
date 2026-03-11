import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="col-span-1 lg:col-span-1">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-stormy-dark flex items-center justify-center">
                                <span className="text-white font-bold text-xs">SM</span>
                            </div>
                            <span className="text-xl font-bold text-stormy-dark tracking-tight">Stormy Morning</span>
                        </Link>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Premium tech and fashion for the modern adventurer. Built for the elements, designed for life.
                        </p>
                        <div className="flex space-x-4">
                            <Link to="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-stormy-blue hover:border-stormy-blue transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link to="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-stormy-blue hover:border-stormy-blue transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link to="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-stormy-blue hover:border-stormy-blue transition-all">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className="text-sm font-bold text-stormy-dark uppercase tracking-widest mb-6">Shop</h4>
                        <ul className="space-y-4">
                            <li><Link to="/products?category=Apparel" className="text-sm text-gray-500 hover:text-stormy-blue transition-colors">Apparel</Link></li>
                            <li><Link to="/products?category=Laptops" className="text-sm text-gray-500 hover:text-stormy-blue transition-colors">Laptops</Link></li>
                            <li><Link to="/products?category=Audio" className="text-sm text-gray-500 hover:text-stormy-blue transition-colors">Audio Tech</Link></li>
                            <li><Link to="/products?category=Photography" className="text-sm text-gray-500 hover:text-stormy-blue transition-colors">Photography</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h4 className="text-sm font-bold text-stormy-dark uppercase tracking-widest mb-6">Support</h4>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-sm text-gray-500 hover:text-stormy-blue transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-500 hover:text-stormy-blue transition-colors">Contact Us</Link></li>
                            <li><Link to="#" className="text-sm text-gray-500 hover:text-stormy-blue transition-colors">Shipping Policy</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-sm font-bold text-stormy-dark uppercase tracking-widest mb-6">Newsletter</h4>
                        <p className="text-sm text-gray-500 mb-6">Subscribe for exclusive drops and early access.</p>
                        <div className="flex bg-gray-50 rounded-md p-1 border border-gray-100">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-transparent border-none focus:ring-0 text-sm w-full px-3 text-gray-700"
                            />
                            <button className="bg-stormy-dark text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-opacity-90 transition-all">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">© 2024 Stormy Morning. Designed for the modern aesthetic.</p>
                    <div className="flex space-x-6">
                        <Link to="#" className="text-xs text-gray-400 hover:text-stormy-blue transition-colors">Privacy Policy</Link>
                        <Link to="#" className="text-xs text-gray-400 hover:text-stormy-blue transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
