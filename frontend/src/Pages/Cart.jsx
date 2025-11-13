import React, { useEffect, useState } from 'react';
import cartService from '../Services/cartService';
import ProductService from '../Services/productService';
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
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { getIsLoggedIn } from '../Utils/headerToken';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const getCartItems = async () => {
        try {
            setIsLoading(true)
            const res = await cartService.getUserCart();
            setCartItems(res || []);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
        finally{
            setIsLoading(false)
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
        // Optimistic UI update
        setCartItems((prev) => prev.filter((item) => item.productid !== productid));
        setProducts((prev) => prev.filter((product) => product.productid !== productid));

        try {
            await cartService.removeFromCart(productid);
        } catch (error) {
            console.error('Failed to remove item:', error);
            getCartItems();
        }
    };

    const handleQuantityChange = async (productid, delta) => {
        const cartItem = cartItems.find((item) => item.productid === productid);
        if (!cartItem) return;

        const newQty = cartItem.quantity + delta;
        if (newQty <= 0) {
            handleRemove(productid);
            return;
        }

        // Optimistic quantity update
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
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
            <Paper sx={{ p: { xs: 2, sm: 3 }, borderRadius: 3, boxShadow: 3 }}>
                <Typography
                    variant="h5"
                    fontWeight="bold"
                    align="center"
                    gutterBottom
                >
                    Your Cart
                </Typography>

                {products.length <= 0 ? (
                    <Box textAlign="center" mt={6}>
                        <Typography>
                            {getIsLoggedIn() ? (
                                'No items in your cart.'
                            ) : (
                                <Button onClick={() => navigate('/')}>Login to view your cart</Button>
                            )}
                        </Typography>
                    </Box>
                ) : (
                    <>
                        {products.map((product) => {
                            const quantity = getQuantity(product.productid);
                            return (
                                <Box
                                    key={product.productid}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: { xs: 'column', sm: 'row' },
                                        alignItems: { xs: 'flex-start', sm: 'center' },
                                        justifyContent: 'space-between',
                                        p: 2,
                                        mb: 2,
                                        borderRadius: 2,
                                        boxShadow: 1,
                                        backgroundColor: '#fdfdfd',
                                        '&:hover': { boxShadow: 3 },
                                        gap: { xs: 1.5, sm: 2 },
                                    }}
                                >
                                    {/* Left: Image + Name */}
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
                                                width: 60,
                                                height: 60,
                                                borderRadius: 1,
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Typography
                                            fontWeight="medium"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                maxWidth: '100%',
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                    </Box>

                                    {/* Middle: Quantity controls */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: { xs: 'flex-start', sm: 'center' },
                                            flex: { xs: '1 1 auto', sm: '0 0 140px' },
                                            mt: { xs: 1, sm: 0 },
                                        }}
                                    >
                                        <IconButton onClick={() => handleQuantityChange(product.productid, -1)}>
                                            <Remove />
                                        </IconButton>
                                        <Typography>{quantity}</Typography>
                                        <IconButton onClick={() => handleQuantityChange(product.productid, 1)}>
                                            <Add />
                                        </IconButton>
                                    </Box>

                                    {/* Right: Price + Delete */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: { xs: 'row', sm: 'column' },
                                            justifyContent: { xs: 'space-between', sm: 'flex-end' },
                                            alignItems: { xs: 'center', sm: 'flex-end' },
                                            width: { xs: '100%', sm: 'auto' },
                                            mt: { xs: 1, sm: 0 },
                                        }}
                                    >
                                        <Typography
                                            fontWeight="bold"
                                            sx={{ mt: { sm: 0.5 }, fontSize: { xs: '1rem', sm: '1.05rem' } }}
                                        >
                                            ₹{(quantity * product.price).toFixed(2)}
                                        </Typography>
                                        <IconButton
                                            sx={{ color: 'red', ml: { xs: 1, sm: 0 } }}
                                            onClick={() => handleRemove(product.productid)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                </Box>
                            );
                        })}

                        <Divider sx={{ my: 2 }} />

                        {/* Total Section */}
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
                    </>
                )}
            </Paper>
        </Container>
    );
};

export default Cart;