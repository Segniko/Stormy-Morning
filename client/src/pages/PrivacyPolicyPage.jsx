import React from 'react';

const PrivacyPolicyPage = () => {
    return (
        <div className="pt-32 pb-20 bg-[#F8FAFC]">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-sm">
                    <h1 className="text-4xl font-black text-stormy-dark mb-4 tracking-tight">Privacy Policy</h1>
                    <p className="text-gray-400 font-medium mb-12">Last Updated: April 25, 2026</p>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">1. Information We Collect</h2>
                            <p className="text-gray-500 leading-relaxed">
                                At Stormy Morning, we collect information to provide better services to all our users. This includes information you provide to us, such as your name, email address, and shipping information when you create an account or make a purchase.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">2. How We Use Information</h2>
                            <p className="text-gray-500 leading-relaxed">
                                We use the information we collect to process your orders, maintain your account, and provide you with a personalized experience. We also use this data to improve our products and services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">3. Information Sharing</h2>
                            <p className="text-gray-500 leading-relaxed">
                                We do not share personal information with companies, organizations, or individuals outside of Stormy Morning unless one of the following circumstances applies: with your consent, for external processing (like shipping partners), or for legal reasons.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">4. Data Security</h2>
                            <p className="text-gray-500 leading-relaxed">
                                We work hard to protect Stormy Morning and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
