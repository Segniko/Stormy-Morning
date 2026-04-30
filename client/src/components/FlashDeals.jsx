import { Loader2, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/productStore';

const DURATION_MS = (12 * 60 + 30) * 60 * 1000; // 12h 30m in milliseconds
const LS_KEY = 'flashDealDeadline';

const getOrCreateDeadline = () => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
        const deadline = parseInt(saved, 10);
        if (deadline > Date.now()) return deadline; // still valid
    }
    // Create a fresh deadline and save it
    const newDeadline = Date.now() + DURATION_MS;
    localStorage.setItem(LS_KEY, String(newDeadline));
    return newDeadline;
};

const toTimeLeft = (deadline) => {
    const diff = Math.max(0, deadline - Date.now());
    const totalSecs = Math.floor(diff / 1000);
    return {
        hours: Math.floor(totalSecs / 3600),
        mins: Math.floor((totalSecs % 3600) / 60),
        secs: totalSecs % 60,
    };
};

const FlashDeals = () => {
    const { products, loading, fetchProducts } = useProductStore();
    const [timeLeft, setTimeLeft] = useState(() => toTimeLeft(getOrCreateDeadline()));

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    useEffect(() => {
        const timer = setInterval(() => {
            const deadline = getOrCreateDeadline();
            const remaining = toTimeLeft(deadline);

            // If expired, reset — getOrCreateDeadline already saved the new one
            if (remaining.hours === 0 && remaining.mins === 0 && remaining.secs === 0) {
                localStorage.removeItem(LS_KEY); // force a fresh deadline next tick
            }

            setTimeLeft(remaining);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const featuredDeal = products.find(p => p.type === 'Gadget') || products[0];

    return (
        <section className="py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-stormy-dark rounded-3xl overflow-hidden relative min-h-[400px] flex flex-col lg:flex-row items-center p-8 lg:p-16">
                    {/* Content */}
                    <div className="flex-1 text-white z-10 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start mb-6 text-stormy-bright">
                            <Zap className="w-5 h-5 fill-current mr-2" />
                            <span className="text-xs font-bold uppercase tracking-widest">Flash Deals</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            24-Hour Exclusive<br />Tech & Style Drops
                        </h2>
                        <p className="text-gray-400 max-w-md mb-10 text-sm lg:text-base leading-relaxed mx-auto lg:mx-0">
                            Limited time offers on our most premium bundles. Don't miss out on the storm.
                        </p>

                        {/* Timer */}
                        <div className="flex justify-center lg:justify-start space-x-4 mb-10">
                            {['hours', 'mins', 'secs'].map((unit) => (
                                <div key={unit} className="flex flex-col items-center">
                                    <div className="w-16 h-16 bg-stormy-bright rounded-xl flex items-center justify-center text-2xl font-black mb-1 text-stormy-dark shadow-lg shadow-stormy-bright/30">
                                        {String(timeLeft[unit]).padStart(2, '0')}
                                    </div>
                                    <span className="text-[10px] uppercase font-bold text-stormy-bright/70 tracking-widest mt-1">{unit}</span>
                                </div>
                            ))}
                        </div>

                        <Link to="/products" className="w-full sm:w-auto text-center inline-block bg-stormy-bright text-stormy-dark font-bold px-10 py-4 rounded-full hover:bg-white transition-all duration-300">
                            Shop Deals Now
                        </Link>
                    </div>

                    {/* Featured Deal Card */}
                    <div className="flex-1 mt-12 lg:mt-0 flex justify-center lg:justify-end z-10 w-full lg:w-auto">
                        {loading ? (
                            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 border border-white/10 flex flex-col items-center">
                                <Loader2 className="w-8 h-8 animate-spin text-stormy-bright mb-4" />
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Locking Deal...</p>
                            </div>
                        ) : featuredDeal ? (
                            <Link to={`/product/${featuredDeal._id}`} className="bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full relative group transition-all hover:scale-[1.02]">
                                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full z-20">
                                    -{Math.floor(Math.random() * 20) + 20}%
                                </div>
                                <div className="relative overflow-hidden rounded-xl mb-6 aspect-square">
                                    <img
                                        src={featuredDeal.images[0]}
                                        alt={featuredDeal.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-lg font-bold text-stormy-dark mb-2 group-hover:text-stormy-blue transition-colors">{featuredDeal.name}</h3>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-xl font-bold text-red-500">${(featuredDeal.price * 0.6).toFixed(2)}</span>
                                        <span className="text-sm text-gray-400 line-through">${featuredDeal.price.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-stormy-bright h-full w-[85%]"></div>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-2 font-bold uppercase tracking-tight">85% claimed</p>
                            </Link>
                        ) : null}
                    </div>

                    {/* Decorative background circle */}
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-stormy-bright opacity-10 rounded-full blur-3xl"></div>
                </div>
            </div>
        </section>
    );
};

export default FlashDeals;
