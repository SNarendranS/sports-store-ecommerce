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
    useMediaQuery,
    Paper,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchText } from '../redux/searchSlice';
import { setCategoryValue } from '../redux/categorySlice';
import ProductService from '../Services/productService';

const SecondaryBar = () => {
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();
    const searchText = useSelector((state) => state.search.searchText);
    const categoryValue = useSelector((state) => state.category.value);
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:768px)');

    const [searchVisibility, setSearchVisibility] = useState(true);
    const iconVisibility = (sessionStorage.getItem('userData') || localStorage.getItem('userData'));


    const cartItems = useSelector((state) => state.cart.items);
    const favItems = useSelector((state) => state.favorite.items);
    const fetchCategories = async () => {
        const res = await ProductService.getAllProductsCategories();
        if (Array.isArray(res?.data)) setCategories(['All', ...res.data]);
    };

    useEffect(() => {
        fetchCategories();


    }, []);


    const location = useLocation();
    useEffect(() => {
        const path = location.pathname;
        setSearchVisibility(path === '/all-products' || path === '/offers');
    }, [location]);

    const handleSearchChange = (e) => dispatch(setSearchText(e.target.value));
    const handleCategoryChange = (e) => dispatch(setCategoryValue(e.target.value));


    return (<AppBar
        position="fixed"
        sx={{
            top: 64, // below main AppBar
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            color: '#333',
            height: 'auto',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            py: 1,
        }}
    >
        <Toolbar
            sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 1.5,
                px: isMobile ? 2 : 4,
            }}
        >
            {/* Search + Category or Placeholder */}
            {searchVisibility ? (
                <Paper
                    elevation={0}
                    sx={{
                        display: 'flex',
                        width: isMobile ? '100%' : '50%',
                        borderRadius: 4,
                        overflow: 'hidden',
                        backgroundColor: '#f9f9f9',
                        border: '1px solid #ddd',
                        transition: 'all 0.3s ease',
                        '&:hover': { boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
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
                                border: 'none',
                                backgroundColor: 'transparent',
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
                                        size="small"
                                        onClick={() => dispatch(setSearchText(''))}
                                        sx={{ color: '#888', '&:hover': { color: '#000' } }}
                                    >
                                        <Close fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />

                    {/* Category Select */}
                    <FormControl
                        size="small"
                        sx={{
                            minWidth: 120,
                            borderLeft: '1px solid #ddd',
                            backgroundColor: '#fff',
                        }}
                    >
                        <Select
                            value={categoryValue || 'All'}
                            onChange={handleCategoryChange}
                            displayEmpty
                            sx={{
                                height: '100%',
                                borderRadius: 0,
                                '& .MuiSelect-select': { py: 1, px: 2 },
                            }}
                        >
                            {categories.length > 0 ? (
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
            ) : (
                <Box sx={{ width: isMobile ? '100%' : '50%' }} />
            )}

            {/* Icons */}
            {iconVisibility && <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    gap: 2,
                    width: isMobile ? '100%' : 'auto',
                }}
            >
                <Badge badgeContent={favItems.length || 0} color="error">
                    <IconButton
                        onClick={() => navigate('/favorite')}
                        sx={{
                            color: '#555',
                            transition: '0.3s all',
                            '&:hover': {
                                color: '#ff4081',
                                transform: 'scale(1.1)',
                                backgroundColor: 'rgba(255,64,129,0.1)',
                            },
                        }}
                    >
                        <Favorite />
                    </IconButton>
                </Badge>

                <Badge badgeContent={cartItems.length || 0} color="primary">
                    <IconButton
                        onClick={() => navigate('/cart')}
                        sx={{
                            color: '#555',
                            transition: '0.3s all',
                            '&:hover': {
                                color: '#1976d2',
                                transform: 'scale(1.1)',
                                backgroundColor: 'rgba(25,118,210,0.1)',
                            },
                        }}
                    >
                        <ShoppingCart />
                    </IconButton>
                </Badge>
            </Box>}
        </Toolbar>
    </AppBar>
    );
};

export default SecondaryBar;
