import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Grid,
    IconButton,
    Typography,
    Box,
    Chip,
    Dialog,
    DialogContent,
    Tooltip,
} from '@mui/material';
import { AddShoppingCart, Delete, Favorite } from '@mui/icons-material';
import ProductDetails from './ProductDetails';
import useProductActions from '../../Hooks/useProductActions';
import cartService from '../../Services/cartService';
import QuantityPopup from './QuantityPopup';
import ItemAdded from './ItemAdded';

const ProductCard = ({ cardData }) => {
    const [open, setOpen] = useState(false);
    const [openQ, setOpenQ] = useState(false);
    const [openI, setOpenI] = useState(false);

    const { isInCart, isFavorite, toggleCart, toggleFavorite } = useProductActions();
    const inCart = isInCart(cardData.productid);
    const fav = isFavorite(cardData.productid);
    const discountedPrice = Math.ceil(cardData.price - (cardData.discount / 100) * cardData.price);
    const [cartQuantity, setCartQuantity] = useState(0);

    const handleCartClick = async (e) => {
        e.stopPropagation();
        try {
            const res = await cartService.FindItemInCart(cardData.productid);

            if (res && res !== 404) {
                // Item already in cart → show quantity popup
                setCartQuantity(res.quantity || 1);
                setOpenQ(true);
            } else {
                console.log("new item added")
                setOpenI(true);
                toggleCart(cardData.productid);
                window.dispatchEvent(new CustomEvent('cartToggled', { detail: cardData.productid }));

            }
        } catch (error) {
            if (error.response?.status === 404) {
                // Item not found → add to cart & trigger refresh
                                setOpenI(true);

                toggleCart(cardData.productid);
                window.dispatchEvent(new CustomEvent('cartToggled', { detail: cardData.productid }));
            } else {
                console.error("Error fetching cart item:", error);
            }
        }
    };



    return (
        <>
            <Card
                onClick={() => setOpen(true)}
                sx={{
                    width: 270,
                    borderRadius: 4,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    transition: 'transform 0.25s ease, box-shadow 0.3s ease',
                    '&:hover': { transform: 'translateY(-6px)', boxShadow: '0 8px 20px rgba(0,0,0,0.15)' },
                }}
            >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                        component="img"
                        image={cardData.img}
                        alt={cardData.name}
                        height="180"
                        sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16, objectFit: 'cover' }}
                    />
                    {cardData.discount > 0 && (
                        <Chip
                            label={`${cardData.discount}% OFF`}
                            color="error"
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                fontWeight: 'bold',
                                backgroundColor: '#ff5252',
                                color: '#fff',
                            }}
                        />
                    )}
                    {cardData.availableStock < 5 && (
                        <Chip
                            label={`Only ${cardData.availableStock} left`}
                            color="warning"
                            size="small"
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                left: 10,
                                fontWeight: 600,
                                backgroundColor: '#fff3e0',
                                color: '#ff9800',
                            }}
                        />
                    )}
                </Box>

                <CardContent sx={{ px: 2.5, py: 2 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        sx={{
                            mb: 0.5,
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {cardData.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, textTransform: 'capitalize' }}>
                        {cardData.category}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                        {cardData.discount > 0 && (
                            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                ₹{cardData.price}
                            </Typography>
                        )}
                        <Typography variant="h6" color="primary" fontWeight="bold" sx={{ fontSize: '1.1rem' }}>
                            ₹{discountedPrice}
                        </Typography>
                    </Box>

                    <Grid container justifyContent="space-between" alignItems="center">
                        <Tooltip title={fav ? 'Remove from Favorites' : 'Add to Favorites'}>
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    window.dispatchEvent(new CustomEvent('favToggled', { detail: cardData.productid }));
                                    toggleFavorite(cardData.productid);
                                }}
                            >
                                <Favorite sx={{ color: fav ? '#e53935' : '#b0b0b0', fontSize: 26 }} />
                            </IconButton>
                        </Tooltip>
                        {/* <Tooltip title={inCart ? 'Remove from Cart' : 'Add to Cart'}> */}
                        <Tooltip title='Add to Cart'>

                            <IconButton onClick={handleCartClick}>
                                {/* {inCart ? (
                                    <Delete sx={{ color: '#f44336', fontSize: 26 }} />
                                ) : ( */}
                                <AddShoppingCart sx={{ color: '#1976d2', fontSize: 26 }} />
                                {/* )} */}
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </CardContent>
            </Card>

            {/* Product Details Modal */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogContent>
                    <ProductDetails product={cardData} handleClose={() => setOpen(false)} />
                </DialogContent>
            </Dialog>

            {/* Quantity Popup Modal */}
            <Dialog open={openQ} onClose={() => setOpenQ(false)} fullWidth maxWidth="sm">
                <DialogContent>
                    <QuantityPopup
                        product={cardData}
                        initialQuantity={cartQuantity}
                        handleClose={() => setOpenQ(false)}
                    />
                </DialogContent>
            </Dialog>
            {/* item Added Popup Modal */}
            <Dialog open={openI} onClose={() => setOpenI(false)} fullWidth maxWidth="sm">
                <DialogContent>
                    <ItemAdded
                        handleClose={() => setOpenI(false)}
                    />
                </DialogContent>
            </Dialog>


        </>
    );
};

export default ProductCard;
