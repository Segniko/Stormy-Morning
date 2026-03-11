import { Award, Globe, Shield } from 'lucide-react';

const AboutPage = () => {
    return (
        <div className="pt-28 pb-20">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden mb-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2000"
                        alt="Stormy Morning Heritage"
                        className="w-full h-full object-cover opacity-60 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-stormy-bg/0 via-stormy-bg/50 to-stormy-bg"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <h1 className="text-6xl md:text-8xl font-black text-stormy-dark mb-6 tracking-tighter">
                        The Storm <span className="text-stormy-blue italic font-serif">Arrives.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed max-w-2xl mx-auto uppercase tracking-widest text-[10px]">
                        Redefining the intersection of high-end tech and timeless fashion since 2024.
                    </p>
                </div>
            </section>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Brand Story */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                    <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000 shadow-2xl rounded-[2.5rem] overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
                            alt="Luxury Fashion"
                            className="w-full h-[500px] object-cover"
                        />
                    </div>

                    <div className="space-y-10 animate-in fade-in slide-in-from-right-10 duration-1000 delay-300">
                        <div className="space-y-4">
                            <span className="text-stormy-blue font-black text-[10px] uppercase tracking-[0.3em]">Our Heritage</span>
                            <h2 className="text-4xl md:text-5xl font-black text-stormy-dark tracking-tight leading-tight">
                                Born in the Quiet, <br />Defined by the Bold.
                            </h2>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-lg">
                            Stormy Morning began with a single vision: that luxury shouldn't be loud—it should be felt. We curate essentials that bridge the gap between high-performance technology and the effortless elegance of modern streetwear.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-6">
                            <div className="space-y-2">
                                <h4 className="text-3xl font-black text-stormy-dark tracking-tighter">50k+</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Global Members</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-3xl font-black text-stormy-dark tracking-tighter">12</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Curated Collections</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Values / Pillars */}
                <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[3rem] p-12 md:p-24 shadow-[0_32px_80px_-20px_rgba(56,73,89,0.08)] mb-32 border-opacity-50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-stormy-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>

                    <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
                        <span className="text-stormy-blue font-black text-[10px] uppercase tracking-[0.3em]">The Pillars</span>
                        <h2 className="text-4xl font-black text-stormy-dark tracking-tight">Built on Excellence</h2>
                        <p className="text-gray-400 font-medium">Every piece we release is guided by three core principles of the storm.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { icon: <Shield className="w-8 h-8" />, title: "Uncompromising Quality", desc: "We source only the finest materials, from Italian fabrics to Grade-5 Titanium." },
                            { icon: <Globe className="w-8 h-8" />, title: "Sustainable Future", desc: "Commitment to 100% recycled packaging and ethical labor by 2026." },
                            { icon: <Award className="w-8 h-8" />, title: "Next-Gen Tech", desc: "Our gadgets are integrated with bespoke firmware designed for elite performance." }
                        ].map((pillar, idx) => (
                            <div key={idx} className="group p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-stormy-blue mb-6 shadow-sm border border-gray-50 transition-colors group-hover:bg-stormy-dark group-hover:text-white">
                                    {pillar.icon}
                                </div>
                                <h3 className="text-xl font-black text-stormy-dark mb-3 tracking-tight">{pillar.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed font-medium">{pillar.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Team / Visionaries Section */}
                <div className="text-center mb-20 space-y-4">
                    <span className="text-stormy-blue font-black text-[10px] uppercase tracking-[0.3em]">Our Founder</span>
                    <div className="flex flex-col items-center space-y-8 mt-10">
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl">
                            <img
                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                                alt="Founder"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black text-stormy-dark tracking-tight">Alex Storm</h3>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Creative Director & Visionary</p>
                        </div>
                        <p className="max-w-2xl text-gray-400 italic font-serif text-lg leading-relaxed">
                            "We don't create products; we create the background for your most ambitious moments. Stormy Morning is a lifestyle for those who know the difference between loud and luxury."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
