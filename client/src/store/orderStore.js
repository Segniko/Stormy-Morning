import axios from 'axios';
import { create } from 'zustand';

const useOrderStore = create((set, get) => ({
    orders: [],
    loading: false,
    error: null,
    success: false,

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

    resetOrderSuccess: () => set({ success: false })
}));

export default useOrderStore;
