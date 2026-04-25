import React from 'react';

const TermsOfServicePage = () => {
    return (
        <div className="pt-32 pb-20 bg-[#F8FAFC]">
            <div className="max-w-4xl mx-auto px-6">
                <div className="bg-white rounded-[2.5rem] p-10 md:p-16 border border-gray-100 shadow-sm">
                    <h1 className="text-4xl font-black text-stormy-dark mb-4 tracking-tight">Terms of Service</h1>
                    <p className="text-gray-400 font-medium mb-12">Effective Date: April 25, 2026</p>

                    <div className="space-y-10">
                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-500 leading-relaxed">
                                By accessing or using the Stormy Morning website, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">2. Use License</h2>
                            <p className="text-gray-500 leading-relaxed">
                                Permission is granted to temporarily download one copy of the materials on Stormy Morning's website for personal, non-commercial transitory viewing only.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">3. Disclaimer</h2>
                            <p className="text-gray-500 leading-relaxed">
                                The materials on Stormy Morning's website are provided on an 'as is' basis. Stormy Morning makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-stormy-dark mb-4">4. Limitations</h2>
                            <p className="text-gray-500 leading-relaxed">
                                In no event shall Stormy Morning or its suppliers be liable for any damages arising out of the use or inability to use the materials on Stormy Morning's website.
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
