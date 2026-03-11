import { create } from 'zustand';

const useCartStore = create((set, get) => ({
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    addItem: (item) => {
        const existing = get().cartItems.find((x) => x._id === item._id);
        let newItems;
        if (existing) {
            newItems = get().cartItems.map((x) =>
                x._id === item._id ? { ...x, qty: x.qty + 1 } : x
            );
        } else {
            newItems = [...get().cartItems, { ...item, qty: 1 }];
        }
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        set({ cartItems: newItems });
    },
    removeItem: (id) => {
        const newItems = get().cartItems.filter((x) => x._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        set({ cartItems: newItems });
    },
    decreaseQty: (id) => {
        const existing = get().cartItems.find((x) => x._id === id);
        if (existing.qty > 1) {
            const newItems = get().cartItems.map((x) =>
                x._id === id ? { ...x, qty: x.qty - 1 } : x
            );
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            set({ cartItems: newItems });
        } else {
            const newItems = get().cartItems.filter((x) => x._id !== id);
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            set({ cartItems: newItems });
        }
    },
    clearCart: () => {
        localStorage.removeItem('cartItems');
        set({ cartItems: [] });
    },
}));

export default useCartStore;
