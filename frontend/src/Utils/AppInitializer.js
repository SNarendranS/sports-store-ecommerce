import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../redux/cartSlice';
import cartService from '../Services/cartService';
import favService from '../Services/favService';

export default function AppInitializer() {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadCart = async () => {
            try {
                const res = await cartService.getUserCart();
                if (res) {
                    dispatch(setCartItems(res.items||[]));
                }
            } catch (err) {
                console.error("Error loading cart:", err);
            }
        };
        const loadFav = async () => {
            try {
                const res = await favService.getUserFav();
                console.log("Favorite items:", res);    
                if (res) {
                    dispatch(setCartItems(res.items||[])); // Assuming you have a similar action for favorites
                }
            } catch (err) {
                console.error("Error loading cart:", err);
            }
        };
        const loadToken = async () => {
            try {
                const res = await favService.getUserFav();
                console.log("Favorite items:", res);    
                if (res) {
                    dispatch(setCartItems(res.items||[])); // Assuming you have a similar action for favorites
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
