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

            {/* Price Range */}
            <div className="mb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Price Range</h3>
                <div className="flex items-center space-x-2 mb-4">
                    <input type="text" placeholder="$0" className="w-full bg-gray-50 border-none rounded-md px-3 py-2 text-xs focus:ring-1 focus:ring-stormy-blue" />
                    <span className="text-gray-300">-</span>
                    <input type="text" placeholder="$1000" className="w-full bg-gray-50 border-none rounded-md px-3 py-2 text-xs focus:ring-1 focus:ring-stormy-blue" />
                </div>
                <input type="range" className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-stormy-blue" />
            </div>

            {/* Colors */}
            <div className="mb-10">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Colors</h3>
                <div className="flex flex-wrap gap-2">
                    {['bg-stormy-dark', 'bg-stormy-blue', 'bg-blue-500', 'bg-gray-400', 'bg-white border'].map((color) => (
                        <button key={color} className={`w-8 h-8 rounded-full ${color} ring-offset-2 hover:ring-2 ring-stormy-blue transition-all`}></button>
                    ))}
                </div>
            </div>

            {/* Tech Specs (Dynamic Toggle based on mockup logic) */}
            <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">Tech Specs</h3>
                <div className="space-y-3">
                    {['Waterproof', 'ANC Enabled', 'Bluetooth 5.3'].map((spec) => (
                        <label key={spec} className="flex items-center group cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 border-gray-200 rounded text-stormy-blue focus:ring-stormy-blue" />
                            <span className="ml-3 text-sm text-gray-600 group-hover:text-stormy-blue transition-colors font-medium">{spec}</span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default FilterSidebar;
