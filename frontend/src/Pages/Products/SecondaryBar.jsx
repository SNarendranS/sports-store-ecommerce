import React, { useEffect, useState } from 'react';
import { ShoppingCart, Favorite, Search, Close } from '@mui/icons-material';
import {
    AppBar,
    Toolbar,
    Badge,
    Box,
    IconButton,
    TextField,
    InputAdornment,
    FormControl,
    MenuItem,
    Select,
    InputLabel,
    useMediaQuery,
    Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../../redux/searchSlice';
import { setCategoryValue } from '../../redux/categorySlice';
import cartService from '../../Services/cartService';
import ProductService from '../../Services/productService';

const SecondaryBar = () => {
    const [favItems, setFavItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.search.searchText);
    const categoryValue = useSelector((state) => state.category.value);

    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');

    const fetchCart = async () => {
        const res = await cartService.getUserCart();
        if (res) setCartItems(res);
    };

    const fetchFavorites = async () => setFavItems([]);

    const fetchCategories = async () => {
        const res = await ProductService.getAllProductsCategories();
        if (Array.isArray(res?.data)) setCategories(['All', ...res?.data]);
        else setCategories([]);
    };

    useEffect(() => {
        fetchCart();
        fetchFavorites();
        fetchCategories();

        const updateCart = async () => await fetchCart();
        const updateFav = async () => await fetchFavorites();

        window.addEventListener('cartToggled', updateCart);
        window.addEventListener('favToggled', updateFav);

        return () => {
            window.removeEventListener('cartToggled', updateCart);
            window.removeEventListener('favToggled', updateFav);
        };
    }, []);

    const handleSearchChange = (e) => dispatch(setSearchText(e.target.value));
    const handleCategoryChange = (e) => dispatch(setCategoryValue(e.target.value));

    const quantityLength = () => cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: '#fff',
                color: '#333',
                mt: 8,
                height: 70,
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                borderBottom: '1px solid #e0e0e0',
                justifyContent: 'center',
            }}
        >
            <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: isMobile ? 'wrap' : 'nowrap',
                    gap: 2,
                    px: isMobile ? 2 : 4,
                    alignItems: 'center',
                }}
            >
                {/* 🔍 Search + Category Wrapper */}
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        width: isMobile ? '100%' : '45%',
                        borderRadius: 3,
                        backgroundColor: '#f5f5f5',
                    }}
                >
                    {/* Search Input */}
                    <TextField
                        size="small"
                        placeholder="Search products..."
                        value={searchText}
                        onChange={handleSearchChange}
                        variant="outlined"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 0,
                                borderRight: '1px solid #ccc',
                                '&:hover fieldset': {
                                    borderColor: '#1976d2',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1976d2',
                                },
                            },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search sx={{ color: '#888' }} />
                                </InputAdornment>
                            ),
                            endAdornment: searchText && (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="medium"
                                        onClick={() => dispatch(setSearchText(''))}
                                        sx={{ color: '#888', '&:hover': { color: '#000' } }}
                                    >
                                        <Close fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                            sx: { paddingRight: 0 },
                        }}
                    />



                    {/* Category Select */}
                    <FormControl size="small" sx={{ minWidth: 140, borderRadius: 0 }}>
                        <Select
                            value={categoryValue || 'All'}
                            onChange={handleCategoryChange}
                            displayEmpty
                            sx={{
                                borderRadius: 0,
                                height: '100%',
                                '& .MuiSelect-select': { py: 1 },
                            }}
                        >
                            {Array.isArray(categories) && categories.length > 0 ? (
                                categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))
                            ) : (
                                <MenuItem disabled>No categories</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                </Paper>

                {/* ❤️ + 🛒 icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge badgeContent={favItems.length} color="error">
                        <IconButton
                            sx={{
                                '&:hover': {
                                    color: '#ff4081',
                                    transform: 'scale(1.1)',
                                    backgroundColor: 'rgba(255,64,129,0.1)',
                                },
                                transition: '0.3s all',
                            }}
                        >
                            <Favorite />
                        </IconButton>
                    </Badge>

                    <Badge badgeContent={quantityLength()} color="primary">
                        <IconButton
                            onClick={() => navigate('/cart')}
                            sx={{
                                '&:hover': {
                                    color: '#1976d2',
                                    transform: 'scale(1.1)',
                                    backgroundColor: 'rgba(25,118,210,0.1)',
                                },
                                transition: '0.3s all',
                            }}
                        >
                            <ShoppingCart />
                        </IconButton>
                    </Badge>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SecondaryBar;
