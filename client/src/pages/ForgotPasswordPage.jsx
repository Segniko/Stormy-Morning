import { ArrowLeft, Send } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const { requestPasswordReset, loading, error } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await requestPasswordReset(email);
        if (result) {
            setSubmitted(true);
        }
    };

    return (
        <div className="py-24 flex items-center justify-center bg-stormy-dark relative overflow-hidden px-4 min-h-screen">
            {/* Decorative Blur Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-stormy-blue opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-stormy-bright opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="w-full max-w-2xl z-10 animate-in fade-in zoom-in duration-500">
                <div className="bg-white bg-opacity-10 backdrop-blur-2xl border border-white border-opacity-10 rounded-3xl p-8 md:p-14 shadow-2xl">
                    <div className="text-center mb-10">
                        <Link to="/login" className="inline-flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6 hover:text-stormy-bright transition-colors">
                            <ArrowLeft className="w-3 h-3 mr-2" />
                            Back to Login
                        </Link>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Reset Password</h1>
                        <p className="text-gray-400 text-sm max-w-xs mx-auto">Enter your email and we'll notify the admin to reset your credentials.</p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center font-bold uppercase tracking-widest">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Account Email</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="johndoe@gmail.com"
                                    className="w-full bg-white bg-opacity-5 border border-white border-opacity-10 rounded-2xl px-6 py-4 text-sm text-white focus:ring-1 focus:ring-stormy-bright focus:bg-white/20 transition-all outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-stormy-bright text-stormy-dark py-4 rounded-2xl font-bold text-sm hover:bg-white transition-all shadow-xl shadow-stormy-bright/10 flex items-center justify-center group disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Request Reset'}
                                {!loading && <Send className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-10 animate-in fade-in duration-700">
                            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Send className="w-8 h-8" />
                            </div>
                            <h2 className="text-xl font-bold text-white mb-2">Request Sent</h2>
                            <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                                Your password reset request has been sent to the administrator. 
                                Please contact support or wait for the admin to process your request.
                            </p>
                            <Link to="/login" className="text-stormy-bright font-bold text-sm hover:underline">
                                Return to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
