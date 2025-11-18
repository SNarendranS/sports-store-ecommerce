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
  DialogActions,
  Button,
  Tooltip,
} from '@mui/material';
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import ProductDetails from './ProductDetails';
import useProductActions from '../../Hooks/useProductActions';
import cartService from '../../Services/cartService';
import { calcDiscountedPrice } from '../../Utils/discountCalc';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ cardData }) => {
  const { isInCart, isFavorite, addProductToCart, addProductToFavorite, removeProductFromFavorite } = useProductActions();

  const [openDetails, setOpenDetails] = useState(false);
  const [cartPopup, setCartPopup] = useState({ open: false, message: '' });

  const inCart = isInCart(cardData.productid);
  const fav = isFavorite(cardData.productid);

  const discountedPrice = calcDiscountedPrice(cardData.price, cardData.discount);
  const navigate = useNavigate();

  const handleCartClick = async (e) => {
    e.stopPropagation();
    try {
      const res = await cartService.FindItemInCart(cardData.productid);

      if (res && res !== 404) {
        // Item already in cart
        setCartPopup({ open: true, message: 'Item is already in your cart.' });
      } else {
        // Add to cart
        addProductToCart(cardData);
        window.dispatchEvent(
          new CustomEvent('cartToggled', { detail: cardData.productid })
        );
        setCartPopup({ open: true, message: 'Item added to cart successfully!' });
      }
    } catch (error) {
      if (error.response?.status === 404) {
        // Add to cart
        addProductToCart(cardData);
        window.dispatchEvent(
          new CustomEvent('cartToggled', { detail: cardData.productid })
        );
        setCartPopup({ open: true, message: 'Item added to cart successfully!' });
      } else {
        console.error('Error fetching cart item:', error);
      }
    }
  };

  const handleGoToCart = () => {
    setCartPopup({ ...cartPopup, open: false });
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    setCartPopup({ ...cartPopup, open: false });
  };

  return (
    <>
      <Card
        onClick={() => setOpenDetails(true)}
        sx={{
          width: 270,
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
          transition: 'transform 0.25s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(0, 33, 200, 0.15)',
          },
          cursor: 'pointer',
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={cardData.img}
            alt={cardData.name}
            height="180"
            sx={{ objectFit: 'cover' }}
          />
          {cardData.discount > 0 && (
            <Chip
              label={`${cardData.discount}% OFF`}
              sx={{
                position: 'absolute',
                top: 15,
                left: 15,
                background: 'linear-gradient(135deg, #ff7043, #f06292)',
                color: '#fff',
                fontWeight: 'bold',
              }}
            />
          )}
          {cardData.availableStock < 5 && (
            <Chip
              label={`Only ${cardData.availableStock} left`}
              sx={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                backgroundColor: '#fff3e0',
                color: '#ff9800',
                fontWeight: 600,
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 1, textTransform: 'capitalize' }}
          >
            {cardData.category}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
            {cardData.discount > 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textDecoration: 'line-through' }}
              >
                ₹{cardData.price}
              </Typography>
            )}
            <Typography
              variant="h6"
              color="primary"
              fontWeight="bold"
              sx={{ fontSize: '1.1rem' }}
            >
              ₹{discountedPrice}
            </Typography>
          </Box>

          <Grid container justifyContent="space-between" alignItems="center">
            <Tooltip title={fav ? 'Remove from Favorites' : 'Add to Favorites'}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(
                    new CustomEvent('favToggled', { detail: cardData.productid })
                  );
                  fav ? removeProductFromFavorite(cardData) : addProductToFavorite(cardData);
                }}
              >
                <Favorite
                  sx={{
                    color: fav ? '#e53935' : '#b0b0b0',
                    fontSize: 26,
                    transition: '0.3s',
                    '&:hover': { color: '#d32f2f' },
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add to Cart">
              <IconButton
                onClick={handleCartClick}
                sx={{
                  color: '#1976d2',
                  transition: '0.3s',
                  '&:hover': { color: '#0d47a1', transform: 'scale(1.1)' },
                }}
              >
                <AddShoppingCart sx={{ fontSize: 26 }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </CardContent>
      </Card>

      {/* Product Details Modal */}
      <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <ProductDetails product={cardData} handleClose={() => setOpenDetails(false)} />
        </DialogContent>
      </Dialog>

      {/* Unified Cart Action Popup */}
      <Dialog
        open={cartPopup.open}
        onClose={handleContinueShopping}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <Typography variant="h6" fontWeight="bold" textAlign="center">
            {cartPopup.message}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleGoToCart}>
            Go to Cart
          </Button>
          <Button variant="outlined" onClick={handleContinueShopping}>
            Continue Shopping
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductCard;
