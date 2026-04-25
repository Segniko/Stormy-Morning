import React from 'react';

const ShippingPolicyPage = () => {
    return (
        <div className="pt-32 pb-20 bg-[#F8FAFC]">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-sm">
                    <h1 className="text-4xl font-black text-stormy-dark mb-4 tracking-tight">Shipping Policy</h1>
                    <p className="text-gray-400 font-medium mb-12">Last Updated: April 25, 2026</p>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">1. Shipping Options</h2>
                            <p className="text-gray-500 leading-relaxed">
                                We offer several shipping options to meet your needs, including Standard Shipping (5-7 business days) and Express Shipping (1-3 business days). Shipping costs are calculated at checkout.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">2. Processing Time</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Orders are processed within 1-2 business days. You will receive a confirmation email with tracking information once your order has shipped.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">3. International Shipping</h2>
                            <p className="text-gray-500 leading-relaxed">
                                We ship to most countries worldwide. Please note that international orders may be subject to customs duties and taxes, which are the responsibility of the recipient.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">4. Shipping Restrictions</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Some products may have shipping restrictions based on local laws and regulations. If an item cannot be shipped to your location, you will be notified during checkout.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShippingPolicyPage;
