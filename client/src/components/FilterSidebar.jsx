import { X } from 'lucide-react';

const FilterSidebar = ({ isOpen, setIsOpen }) => {
    return (
        <aside className={`fixed inset-y-0 left-0 bg-white z-40 w-64 p-6 border-r border-gray-100 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:relative lg:translate-x-0 lg:block`}>
            <div className="flex justify-between items-center mb-10 lg:hidden">
                <h2 className="text-xl font-bold text-stormy-dark">Filters</h2>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-50 rounded-full">
                    <X className="w-5 h-5 text-gray-500" />
                </button>
            </div>

            {/* Categories */}
            <div className="mb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Categories</h3>
                <div className="space-y-3">
                    {['Apparel', 'Laptops', 'Audio', 'Wearables', 'Bags', 'Photography'].map((cat) => (
                        <label key={cat} className="flex items-center group cursor-pointer text-gray-400 hover:text-stormy-blue transition-colors">
                            <span className="text-sm font-medium">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
