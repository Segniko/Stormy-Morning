import { ChevronDown, ChevronLeft, ChevronRight, Loader2, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import useProductStore from '../store/productStore';

const PRODUCTS_PER_PAGE = 6;

const ProductListingPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { products, loading, fetchProducts } = useProductStore();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category') || '';
        fetchProducts(category);
        setCurrentPage(1); // Reset to page 1 when filter changes
    }, [fetchProducts, location.search]);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const paginatedProducts = products.slice(
        (currentPage - 1) * PRODUCTS_PER_PAGE,
        currentPage * PRODUCTS_PER_PAGE
    );

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-10">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-stormy-blue">All Products</span>
                </div>

                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-stormy-dark mb-4">Premium Collection</h1>
                        <p className="text-gray-500 text-sm">
                            {!loading && `${products.length} items — Page ${currentPage} of ${totalPages || 1}`}
                        </p>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Mobile Filter Toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden flex items-center space-x-2 bg-white px-4 py-2 rounded-md border border-gray-100 shadow-sm font-bold text-xs"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span>Filters</span>
                        </button>

                        {/* Sort Dropdown */}
                        <div className="relative group">
                            <button className="flex items-center space-x-4 bg-white px-6 py-3 rounded-md border border-gray-100 shadow-sm font-bold text-xs text-stormy-dark">
                                <span>Recommend</span>
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex gap-10">
                    {/* Sidebar */}
                    <FilterSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                    {/* Product Grid */}
                    <div className="flex-1">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-40 text-stormy-blue">
                                <Loader2 className="w-12 h-12 animate-spin mb-4" />
                                <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Curating Collection...</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product._id} product={product} />
                                    ))}
                                </div>

                                {products.length === 0 && (
                                    <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
                                        <p className="text-gray-400 font-bold">No products found for this catalog.</p>
                                    </div>
                                )}
                            </>
                        )}

                        {/* Real Pagination */}
                        {!loading && totalPages > 1 && (
                            <div className="mt-20 flex justify-center items-center space-x-2">
                                {/* Previous */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="w-10 h-10 border border-gray-100 rounded-md flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {/* Page Numbers */}
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 border rounded-md flex items-center justify-center font-bold text-xs transition-all duration-200 ${currentPage === page
                                            ? 'bg-stormy-dark text-white border-stormy-dark shadow-md'
                                            : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                {/* Next */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="w-10 h-10 border border-gray-100 rounded-md flex items-center justify-center bg-white text-gray-400 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListingPage;
