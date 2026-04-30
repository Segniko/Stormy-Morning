import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProductStore from '../store/productStore';

const Bundles = () => {
    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts();
        }
    }, [fetchProducts, products.length]);

    // Curate bundles based on real products
    const bundleAnchors = products.filter(p => ['Apparel', 'Bags', 'Laptops'].includes(p.category)).slice(0, 3);

    const defaultBundles = [
        {
            name: 'The Executive',
            description: 'Leather Briefcase + Mechanical Keyboard',
            colors: ['#8B4513', '#1A1A1A'],
        },
        {
            name: 'The Creative',
            description: 'Canvas Tote + Pro Drawing Tablet',
            colors: ['#D1D5DB', '#111827'],
        },
        {
            name: 'The Traveler',
            description: 'Waterproof Duffel + Noise Cancelling Headphones',
            colors: ['#1E3A8A', '#374151'],
        },
    ];

    // Use anchor products to make bundles feel more "live" if possible
    const displayBundles = bundleAnchors.length >= 3 ? bundleAnchors.map((p, idx) => ({
        name: idx === 0 ? 'The Executive' : idx === 1 ? 'The Creative' : 'The Traveler',
        description: p.name + ' + Essential Match',
        image: p.images[0],
        colors: p.type === 'Fashion' ? ['#1A1A1A', '#FFFFFF'] : ['#3B82F6', '#1F2937'],
        id: p._id
    })) : defaultBundles;

    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <span className="text-xs font-bold uppercase tracking-widest text-stormy-bright mb-4 block">Curated For You</span>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl lg:text-5xl font-bold text-stormy-dark mb-6 tracking-tight">The Complete Setup</h2>
                            <p className="text-gray-500 text-lg">Handpicked combinations of premium goods. Elevate your daily carry with these perfectly matched sets.</p>
                        </div>
                        <Link to="/products" className="w-full md:w-auto text-center border border-gray-200 px-8 py-3 rounded-md font-bold text-sm hover:bg-gray-50 transition-colors">
                            View All Bundles
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {displayBundles.map((bundle, idx) => (
                        <Link to={bundle.id ? `/product/${bundle.id}` : "/products"} key={idx} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100 flex items-center justify-center p-8 aspect-square">
                                <img
                                    src={bundle.image}
                                    alt={bundle.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-stormy-dark mb-1 group-hover:text-stormy-blue transition-colors">{bundle.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{bundle.description}</p>
                            <div className="flex space-x-2">
                                {bundle.colors.map((color, cIdx) => (
                                    <div
                                        key={cIdx}
                                        className="w-4 h-4 rounded-full border border-gray-100"
                                        style={{ backgroundColor: color }}
                                    ></div>
                                ))}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Bundles;
