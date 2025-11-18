import React, { useEffect, useState } from 'react';
import FavService from '../../Services/favService';
import { Box, Container, Paper, Typography, Divider, Button, CircularProgress, Stack } from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { getIsLoggedIn } from '../../Utils/headerToken';
import { useNavigate } from 'react-router-dom';
import FavoriteItem from './FavoriteItem';

const FavoritePage = () => {
    const [favItems, setFavItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const fetchFavItems = async () => {
        try {
            setIsLoading(true);
            const res = await FavService.getUserFav();
            setFavItems(res?.items || []);
        } catch (err) {
            console.error('Error fetching favorites:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFavItems();
    }, []);

    const handleRemoveFromList = (productid) => {
        setFavItems(prev => prev.filter(item => item.productid !== productid));
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
            {/* Header */}
            <Paper
                sx={{
                    p: 4,
                    mb: 5,
                    borderRadius: 5,
                    background: 'linear-gradient(135deg, #f0405dff, #be8bcaff)',
                    color: '#fff',
                    textAlign: 'center',
                    boxShadow: 3,
                }}
            >
                <Favorite sx={{ fontSize: 50, mb: 1 }} />
                <Typography variant="h4" fontWeight="bold">
                    Your Favorite Items
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                    All the products you love in one place 💖
                </Typography>
            </Paper>

            {/* Empty Favorites */}
            {favItems.length === 0 ? (
                <Box textAlign="center" mt={8}>
                    {getIsLoggedIn() ? (
                        <>
                            <Typography variant="h6" color="text.secondary">
                                Your favorites list is empty
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    mt: 3,
                                    borderRadius: 3,
                                    background: 'linear-gradient(135deg, #7e57c2, #42a5f5)',
                                    color: '#fff',
                                    '&:hover': { background: 'linear-gradient(135deg, #5e35b1, #1e88e5)' },
                                    px: 4,
                                }}
                                onClick={() => navigate('/')}
                            >
                                Shop Now
                            </Button>
                        </>
                    ) : (
                        <Button
                            variant="contained"
                            sx={{
                                mt: 3,
                                borderRadius: 3,
                                background: 'linear-gradient(135deg, #7e57c2, #42a5f5)',
                                color: '#fff',
                                '&:hover': { background: 'linear-gradient(135deg, #5e35b1, #1e88e5)' },
                                px: 4,
                            }}
                            onClick={() => navigate('/login')}
                        >
                            Login to view your favorites
                        </Button>
                    )}
                </Box>
            ) : (
                <Stack spacing={3}>
                    {favItems.map(item => (
                        <FavoriteItem
                            key={item.productid}
                            product={item}
                            onRemoveFromList={handleRemoveFromList}
                        />
                    ))}
                </Stack>
            )}
        </Container>
    );
};

export default FavoritePage;
