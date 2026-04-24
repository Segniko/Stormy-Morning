import axios from 'axios';
import { create } from 'zustand';

/**
 * State management for Orders using Zustand.
 * Handles creating, fetching, and updating orders.
 */
const useOrderStore = create((set, get) => ({
    // State
    orders: [],      // List of orders
    loading: false,  // Async operation status
    error: null,     // Error messages from API
    success: false,  // Status for successful order creation

    /**
     * Create a new order and update the state.
     * OrderData[Object] - The order details.
     */
    createOrder: async (orderData) => {
        set({ loading: true, error: null, success: false });
        try {
            const { data } = await axios.post('/api/orders', orderData);
            set({
                orders: [...get().orders, data],
                loading: false,
                success: true
            });
            return data;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || error.message
            });
            return null;
        }
    },

    // Fetch orders belonging to the logged in user.
    fetchMyOrders: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get('/api/orders/mine');
            set({ orders: data, loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || error.message
            });
        }
    },

    // Fetch all orders (Admin only).
    fetchAllOrders: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get('/api/orders');
            set({ orders: data, loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || error.message
            });
        }
    },

    /**
     * Update the status of an order (Admin only).
     * Id[String] - Order ID.
     * Status[String] - New status (e.g., 'Shipped', 'Delivered').
     */
    updateOrderStatus: async (id, status) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.put(`/api/orders/${id}/status`, { status });
            set((state) => ({
                orders: state.orders.map((o) => (o._id === id ? data : o)),
                loading: false
            }));
            return data;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || error.message
            });
            return null;
        }
    },

    // Reset the success status after it has been consumed by the UI.
    resetOrderSuccess: () => set({ success: false })
}));

export default useOrderStore;
