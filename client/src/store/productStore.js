import axios from 'axios';
import { create } from 'zustand';

const useProductStore = create((set) => ({
    // State
    products: [],    // List of all products
    product: null,   // Single product details
    loading: false,  // Fetching status
    error: null,     // Error message

    // Category[String], Keyword[String] - Fetch products by category/search
    fetchProducts: async (category = '', keyword = '') => {
        set({ loading: true, error: null });
        try {
            let url = '/api/products?';
            if (category) url += `category=${category}&`;
            if (keyword) url += `keyword=${keyword}`;
            
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
