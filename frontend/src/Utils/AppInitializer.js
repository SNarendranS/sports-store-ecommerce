import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../redux/cartSlice';
import { setFavoriteItems } from '../redux/favoriteSlice';
import cartService from '../Services/cartService';
import favService from '../Services/favService';

export default function AppInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await cartService.getUserCart();
                if (res.items) {
                    dispatch(setCartItems(res.items || []));
                }
            } catch (err) {
                console.error("Error loading cart:", err);
            }
        };
        const loadFav = async () => {
            try {
                const res = await favService.getUserFav();
                if (res.items) {
                    dispatch(setFavoriteItems(res.items||[])); // Assuming you have a similar action for favorites
                }
            } catch (err) {
                console.error("Error loading cart:", err);
            }
        };

        loadCart();
        loadFav();
    }, []);

    return null; // invisible component
}
