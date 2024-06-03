import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.items.push(action.payload.product);
        },
        // addToCart: (state, action) => {
        //     console.log('Adding to cart:', action.payload);
        //     const existingIndex = state.items.findIndex(
        //         (item) => item.id === action.payload.product.id
        //     );

        //     if (existingIndex >= 0) {
        //         state.items[existingIndex] = {
        //             ...state.items[existingIndex],
        //             quantity: state.items[existingIndex].quantity + 1,
        //         };
        //     } else {
        //         state.items.push({ ...action.payload.product, quantity: 1 });
        //     }
        //     console.log('Cart items after addition:', state.items);
        // },
        removeFromCart: (state, action) => {
            console.log('Removing from cart:', action.payload);
            state.items = state.items.filter(item => item.id !== action.payload.id);
            console.log('Cart items after removal:', state.items);
        },
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
