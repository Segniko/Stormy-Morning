import {
    AlertCircle,
    ChevronLeft, ChevronRight,
    Droplets,
    Heart,
    Loader2,
    Maximize2,
    Play,
    Ruler,
    Settings,
    ShieldCheck,
    ShoppingBag,
    Star,
    Truck
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useCartStore from '../store/cartStore';
import useProductStore from '../store/productStore';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, loading, fetchProductById, products, fetchProducts } = useProductStore();
    const addItem = useCartStore((state) => state.addItem);

    const [activeTab, setActiveTab] = useState('fashion');
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('M');

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchProductById(id);
        if (products.length === 0) {
            fetchProducts();
        }
    }, [id, fetchProductById, fetchProducts, products.length]);

    // Set tab based on product type when loaded
    useEffect(() => {
        if (product) {
            setActiveTab(product.type === 'Fashion' ? 'fashion' : 'tech');
        }
    }, [product]);

    if (loading) {
        return (
            <div className="pt-40 pb-20 flex flex-col items-center justify-center text-stormy-blue">
                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                <p className="font-bold text-gray-400 uppercase tracking-widest text-xs tracking-[0.3em]">Decoding Aesthetics...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pt-40 pb-20 flex flex-col items-center justify-center text-gray-400">
                <AlertCircle className="w-12 h-12 mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs mb-6">Product not found</p>
                <Link to="/products" className="text-stormy-blue font-bold border-b-2 border-stormy-blue pb-1 text-xs">Back to Collection</Link>
            </div>
        );
    }

    const isFashion = product.type === 'Fashion';
    const images = product.images && product.images.length > 0 ? product.images : ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600'];

    return (
        <div className="pt-28 pb-20">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

                {/* Breadcrumbs */}
                <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-10 ml-1">
                    <Link to="/" className="hover:text-stormy-blue transition-colors">Home</Link>
                    <span className="opacity-30">/</span>
                    <Link to="/products" className="hover:text-stormy-blue transition-colors">{product.category}</Link>
                    <span className="opacity-30">/</span>
                    <span className="text-stormy-dark">{product.name}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-16 mb-24">

                    {/* Media Gallery (Left) */}
                    <div className="flex-1">
                        <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-gray-200/50 mb-6 group border border-white">
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            />
                            <button className="absolute bottom-8 right-8 p-4 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white group-hover:bg-white transition-all transform hover:scale-110 active:scale-95 duration-300">
                                <Maximize2 className="w-5 h-5 text-stormy-dark" />
                            </button>
                            {isFashion && (
                                <div className="absolute top-8 left-8 bg-stormy-dark text-white text-[10px] font-bold px-4 py-2 rounded-xl uppercase tracking-[0.2em] shadow-lg">
                                    Limited Edition
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(idx)}
                                    className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 shadow-sm ${selectedImage === idx ? 'border-stormy-blue bg-white' : 'border-transparent opacity-50 hover:opacity-100 hover:border-gray-200'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                            <button className="aspect-square rounded-2xl overflow-hidden bg-white flex flex-col items-center justify-center border-2 border-transparent relative group shadow-sm hover:border-stormy-blue/30 transition-all duration-500">
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-1 group-hover:bg-stormy-light/20 transition-colors">
                                    <Play className="w-4 h-4 text-gray-400 group-hover:text-stormy-blue" />
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-widest text-gray-400">Preview</span>
                            </button>
                        </div>
                    </div>

                    {/* Product Details (Right) */}
                    <div className="flex-1 lg:py-4">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-[10px] font-bold text-stormy-blue uppercase tracking-[0.3em] mb-3">Premium {product.category}</p>
                                <h1 className="text-5xl lg:text-6xl font-black text-stormy-dark mb-4 tracking-tight leading-[1.1]">{product.name}</h1>
                                <p className="text-gray-400 text-sm font-medium tracking-wide">Signature Edition / Cloud Grey Gradient</p>
                            </div>
                            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-md text-gray-500 px-4 py-2 rounded-xl text-xs font-bold shadow-sm border border-white">
                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                                <span className="text-stormy-dark">4.9</span>
                                <span className="opacity-30">|</span>
                                <span className="text-[10px] opacity-70">128 Reviews</span>
                            </div>
                        </div>

                        <div className="flex items-end space-x-5 mb-12">
                            <span className="text-4xl font-black text-stormy-dark tracking-tighter">${product.price}</span>
                            <span className="text-lg text-gray-300 line-through mb-1.5">$320.00</span>
                            <div className="bg-green-50 text-green-600 text-[10px] font-black px-3 py-1.5 rounded-lg mb-1.5 uppercase tracking-widest border border-green-100">
                                22% Off
                            </div>
                        </div>

                        {/* Selection Toggles */}
                        <div className="mb-12">
                            <div className="flex p-1 bg-gray-100 rounded-2xl w-fit mb-8 shadow-inner border border-gray-200/50">
                                <button
                                    onClick={() => setActiveTab('fashion')}
                                    className={`flex items-center space-x-3 px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === 'fashion' ? 'bg-white text-stormy-dark shadow-xl' : 'text-gray-400 hover:text-stormy-dark'}`}
                                >
                                    <Ruler className="w-4 h-4" />
                                    <span>Design Details</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('tech')}
                                    className={`flex items-center space-x-3 px-8 py-4 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${activeTab === 'tech' ? 'bg-white text-stormy-dark shadow-xl' : 'text-gray-400 hover:text-stormy-dark'}`}
                                >
                                    <Settings className="w-4 h-4" />
                                    <span>Technical Specs</span>
                                </button>
                            </div>

                            {/* Tab View */}
                            <div className="min-h-[150px] animate-in fade-in duration-700">
                                {activeTab === 'fashion' ? (
                                    <div className="space-y-6">
                                        <div>
                                            <div className="flex justify-between items-center mb-4 px-1">
                                                <span className="text-[10px] font-bold text-stormy-dark uppercase tracking-widest">Select Size</span>
                                                <button className="text-[10px] font-bold text-stormy-blue underline uppercase tracking-widest">Size Chart</button>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`w-14 h-14 rounded-xl border-2 font-black text-xs transition-all duration-500 flex items-center justify-center ${selectedSize === size ? 'border-stormy-dark bg-stormy-dark text-white shadow-xl shadow-stormy-dark/20' : 'border-white bg-white/50 text-gray-400 hover:border-gray-200'}`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-[2rem] flex items-start space-x-5 border border-white shadow-sm">
                                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <Droplets className="w-5 h-5 text-stormy-blue" />
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-black text-stormy-dark uppercase tracking-widest mb-1">Material Integrity</h4>
                                                <p className="text-xs text-gray-500 leading-relaxed font-medium">Sourced from eco-certified textile mills, utilizing our signature breathable membrane for all-weather comfort.</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4 bg-white/40 p-6 rounded-[2rem] border border-white/60">
                                        {Object.entries(product.gadgetDetails?.specs || { 'Shell': 'Reinforced Polymer', 'Lining': '3D Mesh', 'Weight': '850g' }).map(([key, val]) => (
                                            <div key={key} className="flex justify-between items-center py-4 border-b border-gray-100 last:border-0">
                                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">{key}</span>
                                                <span className="text-xs font-black text-stormy-dark">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Add to Bag CTA */}
                        <div className="flex flex-col sm:flex-row gap-5 mb-10">
                            <button
                                onClick={() => addItem(product)}
                                className="flex-3 bg-stormy-dark text-white py-6 rounded-[1.5rem] font-black text-sm flex items-center justify-center space-x-4 hover:translate-y-[-3px] hover:shadow-2xl hover:shadow-stormy-dark/30 transition-all duration-500 shadow-xl shadow-stormy-dark/10"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span className="uppercase tracking-widest">Add to Bag</span>
                            </button>
                            <button className="flex-1 py-6 bg-white rounded-[1.5rem] text-gray-300 hover:text-red-500 hover:shadow-xl transition-all duration-500 border border-white flex items-center justify-center group">
                                <Heart className="w-6 h-6 group-hover:fill-current transition-all" />
                            </button>
                        </div>

                        {/* Utility Info */}
                        <div className="grid grid-cols-2 gap-6 pt-10 border-t border-gray-200/50">
                            <div className="flex items-center space-x-4 group">
                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-green-50 transition-colors">
                                    <Truck className="w-4 h-4 text-green-500" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Shipping</span>
                            </div>
                            <div className="flex items-center space-x-4 group">
                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-50 transition-colors">
                                    <ShieldCheck className="w-4 h-4 text-stormy-blue" />
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lifetime Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Suggestion Grid */}
                <div className="mb-24">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <p className="text-[10px] font-bold text-stormy-blue uppercase tracking-[0.3em] mb-2 px-1">Complete the Look</p>
                            <h2 className="text-4xl font-black text-stormy-dark tracking-tight">{isFashion ? 'Styled With' : 'Compatible With'}</h2>
                        </div>
                        <div className="flex space-x-3">
                            <button className="p-3 bg-white rounded-full hover:bg-stormy-blue hover:text-white transition-all shadow-sm border border-gray-100"><ChevronLeft className="w-5 h-5" /></button>
                            <button className="p-3 bg-white rounded-full hover:bg-stormy-blue hover:text-white transition-all shadow-sm border border-gray-100"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {products.filter(p => p._id !== product._id).slice(0, 4).map((p) => (
                            <ProductCard key={p._id} product={p} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
