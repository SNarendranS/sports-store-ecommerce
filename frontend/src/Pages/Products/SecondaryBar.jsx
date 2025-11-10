import React, { useEffect, useState } from 'react';
import { ShoppingCart, Favorite, Search } from '@mui/icons-material';
import {
    AppBar, Toolbar, Badge, Box, IconButton,
    TextField, InputAdornment, FormControl, MenuItem, Select, InputLabel
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
    const categoryValue = useSelector((state) => state.category.value); // ✅ moved here

    const navigate = useNavigate();

    // 🛒 Fetch cart
    const fetchCart = async () => {
        const res = await cartService.getUserCart();
        if (res) setCartItems(res);
    };

    const fetchFavorites = async () => {
        setFavItems([]);
    };

    // 🏷️ Fetch categories
    const fetchCategories = async () => {
        const res = await ProductService.getAllProductsCategories();
        if (Array.isArray(res?.data)) setCategories(["all", ...res?.data]);
        else setCategories([]); // safety
    };

    // 📦 Load cart & favorites
    useEffect(() => {
        const loadCart = async () => await fetchCart();
        const loadFav = async () => await fetchFavorites();

        loadCart();
        loadFav();

        window.addEventListener("cartToggled", loadCart);
        window.addEventListener("favToggled", loadFav);

        return () => {
            window.removeEventListener("cartToggled", loadCart);
            window.removeEventListener("favToggled", loadFav);
        };
    }, []);

    // 🏷️ Load categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSearchChange = (e) => dispatch(setSearchText(e.target.value));
    const handleCategoryChange = (e) => dispatch(setCategoryValue(e.target.value))

    const quantityLength = () =>
        cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#fff', color: '#333', mt: 8, height: 70 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* 🔍 Search bar */}
                <TextField
                    size="small"
                    placeholder="Search for products..."
                    value={searchText}
                    onChange={handleSearchChange}
                    variant="outlined"
                    sx={{ width: '40%', backgroundColor: '#f5f5f5', borderRadius: 2 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search />
                            </InputAdornment>
                        ),
                    }}
                />

                {/* 🏷️ Category dropdown */}
                <FormControl sx={{ width: '200px' }}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        id="category-select"
                        label="Category"
                        value={categoryValue} // ✅ prevents "undefined" warning
                        onChange={handleCategoryChange}
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

                {/* ❤️ + 🛒 icons */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Badge badgeContent={favItems.length} color="error">
                        <IconButton>
                            <Favorite />
                        </IconButton>
                    </Badge>

                    <Badge badgeContent={quantityLength()} color="primary">
                        <IconButton onClick={() => navigate('/cart')}>
                            <ShoppingCart />
                        </IconButton>
                    </Badge>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default SecondaryBar;
