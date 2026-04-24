import { create } from 'zustand';

/**
 * State management for the Shopping Cart using Zustand.
 * Persists cart items to localStorage for session continuity.
 */
const useCartStore = create((set, get) => ({
    // Initialize cart items from localStorage if available, otherwise start with an empty array
    cartItems: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],

    /**
     * Add an item to the cart or increment quantity if it already exists.
     * Item[Object] - The product to add.
     */
    addItem: (item) => {
        const existing = get().cartItems.find((x) => x._id === item._id);
        let newItems;
        if (existing) {
            // If item exists, increment its quantity
            newItems = get().cartItems.map((x) =>
                x._id === item._id ? { ...x, qty: x.qty + 1 } : x
            );
        } else {
            // If new item, add to list with quantity 1
            newItems = [...get().cartItems, { ...item, qty: 1 }];
        }
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        set({ cartItems: newItems });
    },

    /**
     * Remove an item from the cart completely.
     * Id[String] - The ID of the item to remove.
     */
    removeItem: (id) => {
        const newItems = get().cartItems.filter((x) => x._id !== id);
        localStorage.setItem('cartItems', JSON.stringify(newItems));
        set({ cartItems: newItems });
    },

    /**
     * Decrease the quantity of an item. If quantity reaches 0, remove it.
     * Id[String] - The ID of the item.
     */
    decreaseQty: (id) => {
        const existing = get().cartItems.find((x) => x._id === id);
        if (existing.qty > 1) {
            const newItems = get().cartItems.map((x) =>
                x._id === id ? { ...x, qty: x.qty - 1 } : x
            );
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            set({ cartItems: newItems });
        } else {
            // Remove item if quantity becomes 0
            const newItems = get().cartItems.filter((x) => x._id !== id);
            localStorage.setItem('cartItems', JSON.stringify(newItems));
            set({ cartItems: newItems });
        }
    },

    // Clear all items from the cart and localStorage.
    clearCart: () => {
        localStorage.removeItem('cartItems');
        set({ cartItems: [] });
    },
}));

export default useCartStore;
