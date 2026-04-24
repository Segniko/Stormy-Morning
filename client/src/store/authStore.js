import { create } from 'zustand';

const useAuthStore = create((set) => ({
    // User information from localStorage
    userInfo: localStorage.getItem('userInfo')
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null,

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
}));

export default useAuthStore;
