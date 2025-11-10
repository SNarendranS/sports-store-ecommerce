// hooks/useProductActions.js
import { useState, useEffect } from 'react';
import cartService from '../Services/cartService';

const useProductActions = () => {
    const [cartItems, setCartItems] = useState([]);
    const [favItems, setFavItems] = useState([]);

    // ✅ On mount, load saved state from localStorage
    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
        const savedFavs = JSON.parse(localStorage.getItem('favItems')) || [];
        setCartItems(savedCart);
        setFavItems(savedFavs);
    }, []);


    // ✅ Check if item exists
    const isInCart = (productId) => cartItems.includes(productId);
    const isFavorite = (productId) => favItems.includes(productId);

    // ✅ Toggle Cart
    const toggleCart = async (productId) => {
        try {
            if (isInCart(productId)) {
                await cartService.removeFromCart(productId);
                setCartItems((prev) => prev.filter((id) => id !== productId));
            } else {
                await cartService.addToCart(productId, 1);
                setCartItems((prev) => [...prev, productId]);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    // ✅ Toggle Favorite
    const toggleFavorite = (productId) => {
        setFavItems((prev) =>
            prev.includes(productId)
                ? prev.filter((id) => id !== productId)
                : [...prev, productId]
        );
    };

    // ✅ Fetch Cart from backend
    const fetchCart = async () => {
        try {
            const res = await cartService.getUserCart();
            if (res?.data) {
                const productIds = res.data.map((item) => item.productid);
                setCartItems(productIds);
                localStorage.setItem('cartItems', JSON.stringify(productIds));
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    // ✅ Remove completely from cart
    const removeFromCartCompletely = async (productId) => {
        try {
            await cartService.removeFromCart(productId);
            setCartItems((prev) => prev.filter((id) => id !== productId));
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };

    return {
        isInCart,
        isFavorite,
        toggleCart,
        toggleFavorite,
        fetchCart,
        removeFromCartCompletely,
        
    };
};

export default useProductActions;
