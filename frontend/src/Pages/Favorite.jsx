import React, { useEffect, useState } from 'react';
import favService from '../Services/favService';
import ProductService from '../Services/productService';
import cartService from '../Services/cartService';
import {
    Box,
    CardMedia,
    Container,
    Paper,
    Typography,
    IconButton,
    Button,
    CircularProgress,
    Stack,
} from '@mui/material';
import { ArrowCircleRight, Delete, Favorite as FavoriteIcon } from '@mui/icons-material';
import { getIsLoggedIn } from '../Utils/headerToken';
import { useNavigate } from 'react-router-dom';

const Favorite = () => {
    const [favoriteItems, setFavoriteItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchFavoriteItems = async () => {
        try {
            setIsLoading(true);
            const res = await favService.getUserFav();
            setFavoriteItems(res || []);
        } catch (error) {
            console.error('Error fetching favorite items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            if (!favoriteItems || favoriteItems.length === 0) return;
            const results = await Promise.all(
                favoriteItems.map(item => ProductService.getProductById(item.productid))
            );
            setProducts(results.map(res => res.data));
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchFavoriteItems();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [favoriteItems]);

    const handleRemove = async (productid) => {
        setFavoriteItems(prev => prev.filter(item => item.productid !== productid));
        setProducts(prev => prev.filter(product => product.productid !== productid));
        try {
            await favService.remove(productid);
        } catch (error) {
            console.error('Failed to remove item:', error);
            fetchFavoriteItems();
        }
    };

    const handleMoveToCart = async (productid) => {
        const res = await cartService.addToCart(productid, 1);
        if (res) handleRemove(productid);
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
                    borderRadius: 4,
                    mb: 4,
                    background: 'linear-gradient(135deg, #ff8a65, #f06292)',
                    color: '#fff',
                    textAlign: 'center',
                    boxShadow: 3,
                }}
            >
                <FavoriteIcon sx={{ fontSize: 40, mb: 1 }} />
                <Typography variant="h5" fontWeight="bold">
                    Your Favorite Items
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    All the products you love in one place 💖
                </Typography>
            </Paper>

            {/* Content Section */}
            {products.length === 0 ? (
                <Box textAlign="center" mt={6}>
                    {getIsLoggedIn() ? (
                        <>
                            <Typography variant="h6" color="text.secondary">
                                Your favorites list is empty
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                Browse products and add the ones you love!
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{ mt: 3, borderRadius: 3, textTransform: 'none' }}
                                onClick={() => navigate('/')}
                            >
                                Start Shopping
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{ mt: 2, borderRadius: 3, textTransform: 'none' }}
                            onClick={() => navigate('/')}
                        >
                            Login to view your favorites
                        </Button>
                    )}
                </Box>
            ) : (
                <Stack spacing={2}>
                    {products.map(product => (
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
                                    flex: '1 1 60%',
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
                                        sx={{ maxWidth: 200 }}
                                    >
                                        {product.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ mt: 0.5 }}
                                    >
                                        ${product.price?.toFixed(2) || 'N/A'}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Actions */}
                            <Stack
                                direction="row"
                                spacing={1.5}
                                sx={{
                                    mt: { xs: 2, sm: 0 },
                                    justifyContent: { xs: 'flex-start', sm: 'flex-end' },
                                }}
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    startIcon={<ArrowCircleRight />}
                                    sx={{
                                        textTransform: 'none',
                                        borderRadius: 3,
                                        background: 'linear-gradient(135deg, #42a5f5, #478ed1)',
                                        '&:hover': { background: 'linear-gradient(135deg, #1e88e5, #1565c0)' },
                                    }}
                                    onClick={() => handleMoveToCart(product.productid)}
                                >
                                    Move to Cart
                                </Button>

                                <IconButton
                                    sx={{
                                        color: '#e57373',
                                        transition: '0.3s',
                                        '&:hover': {
                                            color: '#c62828',
                                            transform: 'scale(1.2)',
                                        },
                                    }}
                                    onClick={() => handleRemove(product.productid)}
                                >
                                    <Delete />
                                </IconButton>
                            </Stack>
                        </Paper>
                    ))}
                </Stack>
            )}
        </Container>
    );
};

export default Favorite;
