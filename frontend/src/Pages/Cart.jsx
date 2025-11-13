import React, { useEffect, useState } from 'react';
import cartService from '../Services/cartService';
import ProductService from '../Services/productService';
import favService from '../Services/favService';
import {
    Box,
    CardMedia,
    Container,
    Paper,
    Typography,
    Divider,
    IconButton,
    Button,
    CircularProgress,
    Stack,
} from '@mui/material';
import {
    Delete,
    Add,
    Remove,
    ArrowCircleLeft,
    ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import { getIsLoggedIn } from '../Utils/headerToken';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const getCartItems = async () => {
        try {
            setIsLoading(true);
            const res = await cartService.getUserCart();
            setCartItems(res || []);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCartItems();
    }, []);

    const getProducts = async () => {
        try {
            if (!cartItems || cartItems.length === 0) return;
            const results = await Promise.all(
                cartItems.map((item) => ProductService.getProductById(item.productid))
            );
            setProducts(results.map((res) => res.data));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        getProducts();
    }, [cartItems]);

    const getQuantity = (productid) => {
        return cartItems.find((item) => item.productid === productid)?.quantity || 0;
    };

    const totalPrice = products.reduce((acc, product) => {
        const quantity = getQuantity(product.productid);
        return acc + product.price * quantity;
    }, 0);

    const handleRemove = async (productid) => {
        setCartItems((prev) => prev.filter((item) => item.productid !== productid));
        setProducts((prev) => prev.filter((product) => product.productid !== productid));

        try {
            await cartService.removeFromCart(productid);
        } catch (error) {
            console.error('Failed to remove item:', error);
            getCartItems();
        }
    };

    const handleMoveToFav = async (productid) => {
        const res = await favService.add(productid);
        if (res) handleRemove(productid);
    };

    const handleQuantityChange = async (productid, delta) => {
        const cartItem = cartItems.find((item) => item.productid === productid);
        if (!cartItem) return;

        const newQty = cartItem.quantity + delta;
        if (newQty <= 0) {
            handleRemove(productid);
            return;
        }

        setCartItems((prev) =>
            prev.map((item) =>
                item.productid === productid ? { ...item, quantity: newQty } : item
            )
        );

        try {
            await cartService.updateCartItem(cartItem.productid, newQty);
        } catch (error) {
            console.error('Failed to update quantity:', error);
            getCartItems();
        }
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
            {/* Header Section */}
            <Paper
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
                    color: '#fff',
                    textAlign: 'center',
                    boxShadow: 3,
                }}
            >
                <ShoppingCartIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                    Your Shopping Cart
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Review your items and proceed to checkout 🛍️
                </Typography>
            </Paper>

            {/* Cart Content */}
            {products.length <= 0 ? (
                <Box textAlign="center" mt={6}>
                    {getIsLoggedIn() ? (
                        <>
                            <Typography variant="h6" color="text.secondary">
                                Your cart is empty
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
                                Start shopping and fill it up with your favorite products!
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
                                }}
                                onClick={() => navigate('/')}
                            >
                                Shop Now
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, borderRadius: 3 }}
                            onClick={() => navigate('/')}
                        >
                            Login to view your cart
                        </Button>
                    )}
                </Box>
            ) : (
                <>
                    <Stack spacing={2}>
                        {products.map((product) => {
                            const quantity = getQuantity(product.productid);
                            return (
                                <Paper
                                    key={product.productid}
                                    elevation={3}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        p: 2.5,
                                        borderRadius: 3,
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)',
                                            boxShadow: 6,
                                        },
                                    }}
                                >
                                    {/* Product Info */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            flex: '1 1 50%',
                                            minWidth: 0,
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={product.img}
                                            alt={product.name}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 3,
                                                objectFit: 'cover',
                                                boxShadow: 1,
                                            }}
                                        />
                                        <Box>
                                            <Typography
                                                variant="subtitle1"
                                                fontWeight="bold"
                                                noWrap
                                                sx={{ maxWidth: 180 }}
                                            >
                                                {product.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ mt: 0.5 }}
                                            >
                                                ₹{product.price?.toFixed(2) || 'N/A'}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* Quantity Controls */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: { xs: 'flex-start', sm: 'center' },
                                            gap: 1.5,
                                            mt: { xs: 2, sm: 0 },
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => handleQuantityChange(product.productid, -1)}
                                            sx={{ backgroundColor: '#f3f3f3', '&:hover': { backgroundColor: '#e0e0e0' } }}
                                        >
                                            <Remove />
                                        </IconButton>
                                        <Typography variant="body1" fontWeight="bold">
                                            {quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={() => handleQuantityChange(product.productid, 1)}
                                            sx={{ backgroundColor: '#f3f3f3', '&:hover': { backgroundColor: '#e0e0e0' } }}
                                        >
                                            <Add />
                                        </IconButton>
                                    </Box>

                                    {/* Price + Actions */}
                                    <Stack
                                        direction="row"
                                        spacing={1.5}
                                        alignItems="center"
                                        sx={{ mt: { xs: 2, sm: 0 } }}
                                    >
                                        <Typography
                                            fontWeight="bold"
                                            variant="body1"
                                            color="primary"
                                            sx={{ minWidth: 80, textAlign: 'right' }}
                                        >
                                            ₹{(quantity * product.price).toFixed(2)}
                                        </Typography>

                                        <Button
                                            variant="text"
                                            size="small"
                                            startIcon={<ArrowCircleLeft />}
                                            onClick={() => handleMoveToFav(product.productid)}
                                            sx={{
                                                textTransform: 'none',
                                                color: '#7e57c2',
                                                '&:hover': { color: '#5e35b1' },
                                            }}
                                        >
                                            Move to Favorite
                                        </Button>

                                        <IconButton
                                            sx={{
                                                color: '#e57373',
                                                '&:hover': { color: '#c62828', transform: 'scale(1.2)' },
                                                transition: '0.3s',
                                            }}
                                            onClick={() => handleRemove(product.productid)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                </Paper>
                            );
                        })}
                    </Stack>

                    {/* Total Section */}
                    <Divider sx={{ my: 3 }} />
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        flexWrap="wrap"
                        gap={2}
                    >
                        <Typography fontWeight="bold" variant="h6">
                            Total:
                        </Typography>
                        <Typography fontWeight="bold" variant="h6" color="primary">
                            ₹{totalPrice.toFixed(2)}
                        </Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: 3,
                            textTransform: 'none',
                            fontSize: '1rem',
                            background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #1e88e5, #5e35b1)',
                            },
                        }}
                    >
                        Proceed to Checkout
                    </Button>
                </>
            )}
        </Container>
    );
};

export default Cart;
