import { X } from 'lucide-react';

const FilterSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`fixed inset-y-0 left-0 bg-white z-50 w-72 p-8 border-r border-gray-100 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-out lg:relative lg:translate-x-0 lg:block shadow-2xl lg:shadow-none`}>
                <div className="flex justify-between items-center mb-10 lg:hidden">
                    <h2 className="text-xl font-bold text-stormy-dark">Filters</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <div className="space-y-10">
                    {/* Categories */}
                    <div>
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-6">Collections</h3>
                        <div className="space-y-2">
                            {['All Products', 'Apparel', 'Laptops', 'Audio Tech', 'Wearables', 'Bags', 'Photography'].map((cat) => (
                                <button
                                    key={cat}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${cat === 'All Products' ? 'bg-stormy-blue/5 text-stormy-blue' : 'text-gray-400 hover:bg-gray-50 hover:text-stormy-dark'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default FilterSidebar;
