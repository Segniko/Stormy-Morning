import { Info, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const ProductCard = ({ product }) => {
    const addItem = useCartStore((state) => state.addItem);

    const isFashion = product.type === 'Fashion';

    return (
        <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
            <Link to={`/product/${product._id}`} className="block">
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                    <img
                        src={product.images[0]}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-500 ${isFashion ? 'group-hover:opacity-0' : 'group-hover:scale-110'}`}
                    />

                    {/* Fashion Image Hover Swap */}
                    {isFashion && product.images[1] && (
                        <img
                            src={product.images[1]}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110 group-hover:scale-100"
                        />
                    )}

                    {/* Gadget Specs Overlay */}
                    {!isFashion && product.gadgetDetails && (
                        <div className="absolute inset-0 bg-stormy-dark bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-white text-center">
                            <Info className="w-6 h-6 mb-2" />
                            <div className="space-y-1">
                                {Object.entries(product.gadgetDetails.specs || {}).slice(0, 3).map(([key, val]) => (
                                    <p key={key} className="text-[10px] font-bold uppercase tracking-widest">{val}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="text-sm font-bold text-stormy-dark group-hover:text-stormy-blue transition-colors">
                            {product.name}
                        </h3>
                        <span className="text-sm font-bold text-stormy-dark">${product.price}</span>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-3 font-bold">{product.brand}</p>

                    {isFashion && product.fashionDetails?.sizes && (
                        <div className="flex space-x-1">
                            {product.fashionDetails.sizes.slice(0, 3).map((size) => (
                                <span key={size} className="text-[10px] bg-gray-50 px-2 py-1 rounded text-gray-400 font-bold">{size}</span>
                            ))}
                            {product.fashionDetails.sizes.length > 3 && (
                                <span className="text-[10px] text-gray-300 font-bold self-end">+{product.fashionDetails.sizes.length - 3}</span>
                            )}
                        </div>
                    )}
                </div>
            </Link>

            {/* Quick Add Button - Separated from Link to avoid navigation on click */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addItem(product);
                }}
                className="absolute bottom-[108px] right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-stormy-dark hover:bg-stormy-bright hover:text-white transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 z-10"
            >
                <Plus className="w-5 h-5" />
            </button>
        </div>
    );
};

export default ProductCard;
