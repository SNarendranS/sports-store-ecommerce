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
import { AddShoppingCart, Favorite } from '@mui/icons-material';
import ProductDetails from './ProductDetails';
import useProductActions from '../../Hooks/useProductActions';
import cartService from '../../Services/cartService';
import QuantityPopup from './QuantityPopup';
import ItemAdded from './ItemAdded';

const ProductCard = ({ cardData }) => {
  const [open, setOpen] = useState(false);
  const [openQ, setOpenQ] = useState(false);
  const [openI, setOpenI] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);

  const { isInCart, isFavorite, toggleCart, toggleFavorite } =
    useProductActions();

  const inCart = isInCart(cardData.productid);
  const fav = isFavorite(cardData.productid);

  const discountedPrice = Math.ceil(
    cardData.price - (cardData.discount / 100) * cardData.price
  );

  const handleCartClick = async (e) => {
    e.stopPropagation();
    try {
      const res = await cartService.FindItemInCart(cardData.productid);
      if (res && res !== 404) {
        setCartQuantity(res.quantity || 1);
        setOpenQ(true);
      } else {
        setOpenI(true);
        toggleCart(cardData.productid);
        window.dispatchEvent(
          new CustomEvent('cartToggled', { detail: cardData.productid })
        );
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setOpenI(true);
        toggleCart(cardData.productid);
        window.dispatchEvent(
          new CustomEvent('cartToggled', { detail: cardData.productid })
        );
      } else {
        console.error('Error fetching cart item:', error);
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
          overflow: 'hidden',
          boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
          transition: 'transform 0.25s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
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
                background:
                  'linear-gradient(135deg, #ff7043, #f06292)',
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
            <Tooltip
              title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  window.dispatchEvent(
                    new CustomEvent('favToggled', {
                      detail: cardData.productid,
                    })
                  );
                  toggleFavorite(cardData.productid);
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
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <ProductDetails product={cardData} handleClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Quantity Popup */}
      <Dialog open={openQ} onClose={() => setOpenQ(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <QuantityPopup
            product={cardData}
            initialQuantity={cartQuantity}
            handleClose={() => setOpenQ(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Item Added Popup */}
      <Dialog open={openI} onClose={() => setOpenI(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <ItemAdded handleClose={() => setOpenI(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
