// hooks/useProductActions.js
import { useState, useEffect } from 'react';
import cartService from '../Services/cartService';
import FavoriteService from '../Services/favService';

const useProductActions = () => {
    const [cartItems, setCartItems] = useState([]);
    const [favItems, setFavItems] = useState([]);
    const getUserCart = async () => {
        try {
            const res = await cartService.getUserCart();
            if (res) {
                const productIds = res.map((item) => item.productid);
                setCartItems(productIds);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };
    const getUserFav = async () => {
        try {
            const res = await FavoriteService.getUserFav(); 
            if (res) {
                const productIds = res.map((item) => item.productid);
                setFavItems(productIds);
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };
    useEffect(() => {

        getUserCart();
        getUserFav();
    }, []);


    // ✅ Check if item exists
    const isInCart = (productId) => {
        return cartItems.includes(productId);
    }
    const isFavorite = (productId) => {
        return favItems.includes(productId);
    }
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
    const toggleFavorite = async (productId) => {
        try {
            if (isFavorite(productId)) {
                await FavoriteService.remove(productId);
                setFavItems((prev) => prev.filter((id) => id !== productId));
            } else {
                await FavoriteService.add(productId);
                setFavItems((prev) => [...prev, productId]);
            }
        } catch (error) {
            console.error('Error updating favorites:', error);
        }

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
