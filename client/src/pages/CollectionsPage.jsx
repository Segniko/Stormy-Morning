import { ArrowRight, Box, Layers, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollectionsPage = () => {
    const collections = [
        {
            id: 'obsidian-essence',
            title: 'Obsidian Essence',
            subtitle: 'THE DARK CORE',
            description: 'A curated selection of matte black gadgetry and deep-toned technical apparel. Built for those who move in the shadows.',
            image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1600',
            category: 'Laptops',
            accent: 'bg-stormy-dark',
            features: ['Matte Finishes', 'Grade-5 Titanium', 'Stealth Design']
        },
        {
            id: 'arctic-minimal',
            title: 'Arctic Minimal',
            subtitle: 'PURE CALM',
            description: 'Monochromatic whites and brushed silvers. Clean lines for the modern workplace and the open road.',
            image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1600',
            category: 'Apparel',
            accent: 'bg-stormy-blue',
            features: ['Breathable Fabrics', 'Ergonomic Forms', 'Silver Accents']
        },
        {
            id: 'urban-nomad',
            title: 'Urban Nomad',
            subtitle: 'READY FOR ARRIVAL',
            description: 'Weather-resistant gear and smart carry-ons designed for the high-frequency traveler.',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=1600',
            category: 'Bags',
            accent: 'bg-stormy-bright',
            features: ['Waterproof Tech', 'Modular Carry', 'Global Ready']
        }
    ];

    return (
        <div className="pt-28 pb-20 bg-white">
            {/* Header */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mb-20">
                <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <span className="text-stormy-blue font-black text-[10px] uppercase tracking-[0.3em]">Curation</span>
                    <h1 className="text-6xl font-black text-stormy-dark mt-4 tracking-tighter leading-none">
                        Editorial <br />Collections.
                    </h1>
                    <p className="text-gray-400 mt-8 text-lg font-medium leading-relaxed max-w-xl">
                        Explore our thematic stories. Each collection is a cohesive ecosystem of high-end performance and aesthetic harmony.
                    </p>
                </div>
            </div>

            {/* Collections List */}
            <div className="space-y-32">
                {collections.map((col, idx) => (
                    <section
                        key={col.id}
                        className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden group`}
                    >
                        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                            {/* Image Side */}
                            <div className={`lg:col-span-7 relative group cursor-pointer overflow-hidden rounded-[3rem] shadow-2xl ${idx % 2 !== 0 ? 'lg:order-2' : ''}`}>
                                <Link to={`/products?category=${col.category}`}>
                                    <div className="absolute inset-0 bg-stormy-dark/20 group-hover:bg-stormy-dark/10 transition-colors z-10"></div>
                                    <img
                                        src={col.image}
                                        alt={col.title}
                                        className="w-full h-[600px] object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    {/* Abstract Badge */}
                                    <div className="absolute top-10 left-10 z-20 px-6 py-3 bg-white/90 backdrop-blur-md rounded-2xl flex items-center space-x-3 shadow-xl">
                                        <div className={`w-2 h-2 rounded-full ${col.accent}`}></div>
                                        <span className="text-[10px] font-black text-stormy-dark uppercase tracking-widest">{col.subtitle}</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Content Side */}
                            <div className={`lg:col-span-5 space-y-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 ${idx % 2 !== 0 ? 'lg:order-1' : ''}`}>
                                <div className="space-y-4">
                                    <h2 className="text-4xl md:text-5xl font-black text-stormy-dark tracking-tight leading-tight">
                                        {col.title}
                                    </h2>
                                    <p className="text-gray-500 leading-relaxed text-lg">
                                        {col.description}
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {col.features.map((feat, fIdx) => (
                                        <div key={fIdx} className="space-y-2">
                                            <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-stormy-blue">
                                                {fIdx === 0 ? <Zap className="w-4 h-4" /> : fIdx === 1 ? <Layers className="w-4 h-4" /> : <Box className="w-4 h-4" />}
                                            </div>
                                            <p className="text-[9px] font-black text-stormy-dark uppercase tracking-widest leading-tight">{feat}</p>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to={`/products?category=${col.category}`}
                                    className="inline-flex items-center space-x-4 group/btn"
                                >
                                    <span className="text-sm font-black text-stormy-dark uppercase tracking-[0.2em] group-hover/btn:text-stormy-blue transition-colors">Explore the ecosystem</span>
                                    <div className="w-12 h-12 bg-stormy-dark rounded-full flex items-center justify-center text-white shadow-xl group-hover/btn:translate-x-2 transition-all">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* Newsletter Callout */}
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-40">
                <div className="bg-stormy-dark rounded-[3.5rem] p-12 md:p-24 text-center relative overflow-hidden shadow-3xl shadow-stormy-dark/40">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-stormy-blue/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-stormy-bright/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10 max-w-2xl mx-auto space-y-8">
                        <span className="text-stormy-bright font-black text-[10px] uppercase tracking-[0.4em]">Early Access</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Never Miss a Drop.</h2>
                        <p className="text-gray-400 font-medium">Join our global network for early access to limited edition obsidian series releases.</p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-stormy-bright/30 transition-all"
                            />
                            <button className="w-full sm:w-auto bg-white text-stormy-dark px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-stormy-bright transition-colors shadow-2xl">
                                Join Network
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CollectionsPage;
