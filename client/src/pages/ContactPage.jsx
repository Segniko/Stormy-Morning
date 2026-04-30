import { Clock, Mail, MapPin, Send, Smartphone } from 'lucide-react';
import { useState } from 'react';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        console.log('Form submitted:', formData);
        alert('Thank you for reaching out to the Storm. We will be in touch shortly.');
        window.location.reload();
    };

    return (
        <div className="pt-32 pb-20 bg-stormy-bg">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <span className="text-stormy-blue font-black text-[10px] uppercase tracking-[0.3em]">Connect</span>
                    <h1 className="text-5xl md:text-6xl font-black text-stormy-dark mt-4 tracking-tight leading-tight">
                        Reach the <span className="text-stormy-blue italic font-serif">Sanctuary.</span>
                    </h1>
                    <p className="text-gray-400 mt-6 text-lg font-medium leading-relaxed">
                        Our concierge team is available for bespoke support and partnership inquiries.
                    </p>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
                    {/* Contact Info (Left Column) */}
                    <div className="xl:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-10 duration-1000">
                        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[2.5rem] p-12 shadow-[0_32px_64px_-16px_rgba(56,73,89,0.06)] relative overflow-hidden h-full">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-stormy-blue/5 rounded-full blur-[60px] -translate-y-1/2 -translate-x-1/2"></div>

                            <h2 className="text-2xl font-black text-stormy-dark mb-12 tracking-tight">Direct Access</h2>

                            <div className="space-y-12">
                                <div className="flex items-start space-x-6">
                                    <div className="w-14 h-14 bg-stormy-dark rounded-2xl flex items-center justify-center text-white shadow-xl shadow-stormy-dark/20 flex-shrink-0">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</h4>
                                        <p className="text-lg font-black text-stormy-dark">johndoe@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-14 h-14 bg-stormy-dark rounded-2xl flex items-center justify-center text-white shadow-xl shadow-stormy-dark/20 flex-shrink-0">
                                        <Smartphone className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Phone Number</h4>
                                        <p className="text-lg font-black text-stormy-dark">+251911241297</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6">
                                    <div className="w-14 h-14 bg-stormy-dark rounded-2xl flex items-center justify-center text-white shadow-xl shadow-stormy-dark/20 flex-shrink-0">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Atelier</h4>
                                        <p className="text-lg font-black text-stormy-dark leading-relaxed">
                                            Addis Ababa, Ethiopia
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-6 pt-6 border-t border-gray-100">
                                    <Clock className="w-5 h-5 text-stormy-blue flex-shrink-0 mt-1" />
                                    <div className="space-y-1">
                                        <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Response Time</h4>
                                        <p className="text-sm font-medium text-gray-500">Typical response within 1-2 hours for elite members.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form (Right Column) */}
                    <div className="xl:col-span-7 animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
                        <div className="bg-white/80 backdrop-blur-3xl border border-white rounded-[2.5rem] p-12 lg:p-16 shadow-[0_48px_100px_-24px_rgba(56,73,89,0.1)] relative overflow-hidden">
                            <h2 className="text-3xl font-black text-stormy-dark mb-12 tracking-tight leading-tight">Send an Inquiry</h2>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stormy-dark uppercase tracking-widest ml-1">Full Identity</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm text-stormy-dark focus:ring-2 focus:ring-stormy-blue/10 focus:bg-white transition-all outline-none font-medium"
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-stormy-dark uppercase tracking-widest ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="johndoe@gmail.com"
                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm text-stormy-dark focus:ring-2 focus:ring-stormy-blue/10 focus:bg-white transition-all outline-none font-medium"
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-stormy-dark uppercase tracking-widest ml-1">Inquiry Topic</label>
                                    <select
                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-4 text-sm text-stormy-dark focus:ring-2 focus:ring-stormy-blue/10 focus:bg-white transition-all outline-none font-medium appearance-none"
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    >
                                        <option value="general">Bespoke Styling</option>
                                        <option value="support">Concierge Support</option>
                                        <option value="partnership">Press & Partnership</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] font-black text-stormy-dark uppercase tracking-widest ml-1">Message</label>
                                    <textarea
                                        rows="6"
                                        required
                                        placeholder="How can we elevate your journey?"
                                        className="w-full bg-gray-50/50 border border-gray-100 rounded-2xl px-6 py-5 text-sm text-stormy-dark focus:ring-2 focus:ring-stormy-blue/10 focus:bg-white transition-all outline-none font-medium resize-none"
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="md:col-span-2 pt-4">
                                    <button type="submit" className="w-full bg-stormy-dark text-white py-5 rounded-[1.5rem] font-bold text-sm hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-stormy-dark/30 transition-all duration-500 shadow-xl shadow-stormy-dark/10 flex items-center justify-center group tracking-widest uppercase">
                                        Transmit Message
                                        <Send className="w-4 h-4 ml-3 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* FAQ/Pre-Contact Selection Section */}
                <div className="mt-32 pt-20 border-t border-gray-200/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <h4 className="text-lg font-black text-stormy-dark tracking-tight">Global Shipping</h4>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">We offer insured white-glove delivery to over 120 countries. Transit times vary by location.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-black text-stormy-dark tracking-tight">Private Styling</h4>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">Book a 1 on 1 virtual consultant with our elite styling team for a curated look.</p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-black text-stormy-dark tracking-tight">Secure Checkout</h4>
                            <p className="text-sm text-gray-400 leading-relaxed font-medium">All transactions are processed through 256-bit AES encryption with multi-factor authentication.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
