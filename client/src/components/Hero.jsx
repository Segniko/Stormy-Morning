import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <div className="pt-24 pb-12 bg-gray-50">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-6 h-[75vh] min-h-[500px]">

                    {/* Left Card: Fashion */}
                    <div className="relative flex-1 group overflow-hidden rounded-[2.5rem] shadow-sm">
                        <img
                            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200"
                            alt="Fashion Collection"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10 lg:p-16 text-white">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-70">Autumn Collection</span>
                            <h1 className="text-5xl lg:text-6xl font-black mb-10 leading-[1.1] tracking-tight">
                                Timeless<br />Elegance
                            </h1>
                            <Link to="/products?category=Fashion" className="group flex items-center bg-white text-stormy-dark px-10 py-4 rounded-full w-fit font-bold hover:bg-stormy-light transition-all duration-500 shadow-xl shadow-black/10">
                                Shop Fashion
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                    {/* Right Card: Gadgets */}
                    <div className="relative flex-1 group overflow-hidden rounded-[2.5rem] shadow-sm">
                        <img
                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200"
                            alt="Tech Gadgets"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stormy-dark/70 via-transparent to-transparent flex flex-col justify-end p-10 lg:p-16 text-white">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 opacity-70">Tech Essentials</span>
                            <h1 className="text-5xl lg:text-6xl font-black mb-10 leading-[1.1] tracking-tight">
                                Innovation<br />Unleashed
                            </h1>
                            <Link to="/products?category=Gadget" className="group flex items-center bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full w-fit font-bold hover:bg-white hover:text-stormy-dark transition-all duration-500 shadow-xl shadow-black/10">
                                Shop Gadgets
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Hero;
