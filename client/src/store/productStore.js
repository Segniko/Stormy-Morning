import axios from 'axios';
import { create } from 'zustand';

const useProductStore = create((set) => ({
    // State
    products: [],    // List of all products
    product: null,   // Single product details
    loading: false,  // Fetching status
    error: null,     // Error message

    // Category[String] - Fetch products by category or all products
    fetchProducts: async (category = '') => {
        set({ loading: true, error: null });
        try {
            const url = category ? `/api/products?category=${category}` : '/api/products';
            const response = await axios.get(url);
            set({ products: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                loading: false
            });
        }
    },

    // Id[String] - Fetch a single product by ID
    fetchProductById: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`/api/products/${id}`);
            set({ product: response.data, loading: false });
        } catch (error) {
            set({
                error: error.response?.data?.message || error.message,
                loading: false
            });
        }
    },
}));

export default useProductStore;
