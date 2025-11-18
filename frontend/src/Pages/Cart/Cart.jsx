import React, { useEffect, useState } from 'react';
import cartService from '../../Services/cartService';
import { Box, Container, Paper, Typography, Divider, Button, CircularProgress, Stack } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { getIsLoggedIn } from '../../Utils/headerToken';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totals, setTotals] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchCartItems = async () => {
        try {
            setIsLoading(true);
            const res = await cartService.getUserCart();
            setCartItems(res?.items || []);
        } catch (err) {
            console.error('Error fetching cart:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    const handleRemoveFromList = (productid) => {
        setCartItems(prev => prev.filter(item => item.productid !== productid));
        setTotals(prev => { const t = { ...prev }; delete t[productid]; return t; });
    };

    const updateItemTotal = (productid, total) => {
        setTotals(prev => ({ ...prev, [productid]: total }));
    };

    const totalPrice = Object.values(totals).reduce((acc, val) => acc + val, 0);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
            <Paper
                sx={{
                    p: 3,
                    mb: 4,
                    borderRadius: 4,
                    background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
                    color: '#fff',
                    textAlign: 'center',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                }}
            >
                <ShoppingCartIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">Your Shopping Cart</Typography>
                <Typography variant="body2">Review your items and proceed to checkout 🛍️</Typography>
            </Paper>

            {cartItems.length === 0 ? (
                <Box textAlign="center" mt={6}>
                    {getIsLoggedIn() ? (
                        <>
                            <Typography variant="h6" color="text.secondary">Your cart is empty</Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, borderRadius: 3, py: 1.2, px: 4 }}
                                onClick={() => navigate('/')}
                            >
                                Shop Now
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ mt: 3, borderRadius: 3, py: 1.2, px: 4 }}
                            onClick={() => navigate('/')}
                        >
                            Login to view your cart
                        </Button>
                    )}
                </Box>
            ) : (
                <>
                    <Stack spacing={2}>
                        {cartItems.map(item => (
                            <CartItem
                                key={item.productid}
                                product={item}
                                onRemoveFromList={handleRemoveFromList}
                                reportTotal={updateItemTotal}
                            />
                        ))}
                    </Stack>

                    <Divider sx={{ my: 3 }} />

                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Total:</Typography>
                        <Typography variant="h5" fontWeight="bold" color="primary">₹{totalPrice.toFixed(2)}</Typography>
                    </Box>

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                            mt: 3,
                            py: 1.5,
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                            '&:hover': { background: 'linear-gradient(135deg, #1e88e5, #5e35b1)' },
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