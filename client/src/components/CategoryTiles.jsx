import { Briefcase, Camera, Headphones, Laptop, Shirt, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    { name: 'Apparel', icon: Shirt, color: 'bg-white' },
    { name: 'Laptops', icon: Laptop, color: 'bg-white' },
    { name: 'Audio', icon: Headphones, color: 'bg-white' },
    { name: 'Wearables', icon: Watch, color: 'bg-white' },
    { name: 'Bags', icon: Briefcase, color: 'bg-white' },
    { name: 'Photography', icon: Camera, color: 'bg-white' },
];

const CategoryTiles = () => {
    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-stormy-dark">Shop by Category</h2>
                    </div>
                    <Link to="/products" className="text-sm font-bold text-stormy-dark flex items-center hover:text-stormy-blue transition-colors">
                        View All <span className="ml-1">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((cat, idx) => (
                        <Link
                            key={idx}
                            to={`/products?category=${cat.name}`}
                            className="group cursor-pointer bg-white rounded-xl p-8 flex flex-col items-center justify-center border border-transparent hover:border-stormy-blue hover:shadow-lg transition-all duration-300"
                        >
                            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-stormy-light transition-colors">
                                <cat.icon className="w-8 h-8 text-stormy-blue group-hover:text-stormy-dark transition-colors" />
                            </div>
                            <span className="text-sm font-bold text-stormy-dark">{cat.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryTiles;
