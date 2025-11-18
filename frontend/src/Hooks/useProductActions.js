import cartService from '../Services/cartService';
import FavoriteService from '../Services/favService';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/cartSlice';
import { addToFavorite, removeFromFavorite } from '../redux/favoriteSlice';
const useProductActions = () => {
    const dispatch = useDispatch();

    const cartItems = useSelector((state) => state.cart.items);
    const favItems = useSelector((state) => state.favorite.items);



    // ✅ Check if item exists
    const isInCart = (productId) => {
        return cartItems?.some(item => item.productid === productId);
    };

    const isFavorite = (productId) => {
        return favItems?.some(item => item.productid === productId);

    }
    // ✅ Toggle Cart
    const removeProductFromCart = async (product) => {
        try {
            await cartService.removeFromCart(product.productid);
            dispatch(removeFromCart(product));

        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };
    const addProductToCart = async (product) => {
        try {
            await cartService.addToCart(product.productid, 1);
            dispatch(addToCart(product));

        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };
    const addProductToFavorite = async (product) => {
        try {
            await FavoriteService.add(product.productid);
            dispatch(addToFavorite(product));


        } catch (error) {
            console.error('Error updating favorites:', error);
        }

    };
    const removeProductFromFavorite = async (product) => {
        try {
            await FavoriteService.remove(product.productid);
            dispatch(removeFromFavorite(product));

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
        } catch (err) {
            console.error('Error removing from cart:', err);
        }
    };

    return {
        isInCart,
        isFavorite,
        addProductToCart,
        removeProductFromCart,
        addProductToFavorite,
        removeProductFromFavorite,
        fetchCart,
        removeFromCartCompletely,

    };
};

export default useProductActions;
