import axios from 'axios';
import { create } from 'zustand';

const useAuthStore = create((set) => ({
    // User information from localStorage
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

    resetRequests: [],
    users: [],
    loading: false,
    error: null,

    // Data[Object] - Set user info and save to localStorage
    setUserInfo: (data) => {
        localStorage.setItem('userInfo', JSON.stringify(data));
        set({ userInfo: data });
    },

    // Remove user info from state and localStorage
    logout: () => {
        localStorage.removeItem('userInfo');
        set({ userInfo: null });
    },

    requestPasswordReset: async (email) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.post('/api/users/forgot-password', { email });
            set({ loading: false });
            return data;
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || error.message
            });
            return null;
        }
    },

    getResetRequests: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get('/api/users/reset-requests');
            set({ resetRequests: data, loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || error.message
            });
        }
    },

    adminResetPassword: async (id, password) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.put(`/api/users/reset-password/${id}`, { password });
            set((state) => ({
                resetRequests: state.resetRequests.filter((r) => r._id !== id),
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

    getAllUsers: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get('/api/users');
            set({ users: data, loading: false });
        } catch (error) {
            set({
                loading: false,
                error: error.response?.data?.message || error.message
            });
        }
    },

    updateUserRole: async (id, role) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.put(`/api/users/${id}/role`, { role });
            set((state) => ({
                users: state.users.map((user) => user._id === id ? data : user),
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
    }
}));

export default useAuthStore;
