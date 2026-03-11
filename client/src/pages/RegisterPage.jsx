import axios from 'axios';
import { ArrowRight, Lock, Mail, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const setUserInfo = useAuthStore((state) => state.setUserInfo);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('/api/users/', { name, email, password });
            setUserInfo(data);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex-grow flex items-center justify-center bg-stormy-dark py-24 px-4 relative overflow-hidden">
            {/* Soft Ambient Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-stormy-blue opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-stormy-bright opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="w-full max-w-2xl z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
                    <div className="text-center mb-10">
                        <Link to="/" className="inline-block mb-4 group">
                            <div className="w-12 h-12 rounded-2xl bg-stormy-bright flex items-center justify-center transition-transform group-hover:scale-110 duration-500 shadow-xl shadow-stormy-bright/20">
                                <span className="text-stormy-dark font-black text-lg">S</span>
                            </div>
                        </Link>
                        <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Join the Storm</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Experience premium essentials</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold uppercase tracking-widest">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-stormy-bright transition-colors duration-300" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Alex Morgan"
                                        className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl pl-14 pr-6 py-4 text-sm text-stormy-dark focus:ring-1 focus:ring-stormy-bright focus:bg-white/20 transition-all outline-none font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-stormy-bright transition-colors duration-300" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="alex@morgan.com"
                                        className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl pl-14 pr-6 py-4 text-sm text-stormy-dark focus:ring-1 focus:ring-stormy-bright focus:bg-white/20 transition-all outline-none font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Create Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-stormy-bright transition-colors duration-300" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl pl-14 pr-6 py-4 text-sm text-stormy-dark focus:ring-1 focus:ring-stormy-bright focus:bg-white/20 transition-all outline-none font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start space-x-3 pt-2">
                            <input type="checkbox" required className="mt-1 rounded border-white/10 bg-white/5 text-stormy-bright focus:ring-stormy-bright/20 cursor-pointer" />
                            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                                I agree to the <Link to="#" className="text-white font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-white font-bold hover:underline">Privacy Policy</Link>.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-stormy-bright text-stormy-dark py-4 rounded-[1.5rem] font-bold text-sm hover:translate-y-[-2px] hover:bg-white transition-all duration-500 shadow-xl shadow-stormy-bright/10 flex items-center justify-center group tracking-widest uppercase disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Create Master Account'}
                            {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-white/5 pt-8">
                        <p className="text-[11px] text-gray-500 font-bold tracking-tight">
                            Already a member? <Link to="/login" className="text-stormy-bright font-black hover:text-white transition-colors">Sign in to account</Link>
                        </p>
                    </div>
                </div>

                {/* Secure Badge */}
                <div className="mt-6 flex items-center justify-center space-x-2 opacity-30">
                    <div className="w-1.5 h-1.5 bg-stormy-bright rounded-full animate-pulse"></div>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Global Privacy Standards Verified</span>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
