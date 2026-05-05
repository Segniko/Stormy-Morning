import axios from 'axios';
import { ArrowRight, Lock, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const setUserInfo = useAuthStore((state) => state.setUserInfo);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            setUserInfo(data);
            navigate('/profile');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="py-24 flex items-center justify-center bg-stormy-dark relative overflow-hidden px-4">
            {/* Decorative Blur Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-stormy-blue opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-stormy-bright opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="w-full max-w-2xl z-10 animate-in fade-in zoom-in duration-500">
                <div className="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-10 rounded-3xl p-8 md:p-14 shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="w-12 h-12 rounded-2xl bg-stormy-bright flex items-center justify-center mx-auto mb-4 shadow-lg shadow-stormy-bright/30">
                            <span className="text-stormy-dark font-bold text-lg">SM</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-1">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Sign in to your premium account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold uppercase tracking-widest">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-stormy-bright transition-colors" />
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="johndoe@gmail.com"
                                        className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl pl-12 pr-4 py-4 text-sm text-stormy-dark focus:ring-1 focus:ring-stormy-bright focus:bg-white/20 transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 text-left">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Password</label>
                                    <Link to="/forgot-password" className="text-[10px] font-bold text-stormy-bright uppercase tracking-widest hover:underline">Forgot?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-stormy-bright transition-colors" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl pl-12 pr-4 py-4 text-sm text-stormy-dark focus:ring-1 focus:ring-stormy-bright focus:bg-white/20 transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-stormy-bright text-stormy-dark py-4 rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-xl shadow-stormy-bright/10 flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                            {!loading && <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                        </button>
                    </form>

                    <p className="mt-8 text-xs text-gray-500 font-medium text-center">
                        Don't have an account? <Link to="/register" className="text-stormy-bright font-bold hover:underline">Create for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
