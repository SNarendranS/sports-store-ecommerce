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
import { AddShoppingCart, Favorite, RemoveShoppingCart } from '@mui/icons-material';
import ProductDetails from './ProductDetails';
import useProductActions from '../../Hooks/useProductActions';
import cartService from '../../Services/cartService';
import { calcDiscountedPrice } from '../../Utils/discountCalc';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ cardData }) => {
  const { isInCart, isFavorite, addProductToCart, removeProductFromCart, addProductToFavorite, removeProductFromFavorite } = useProductActions();

  const [openDetails, setOpenDetails] = useState(false);

  const inCart = isInCart(cardData.productid);
  const fav = isFavorite(cardData.productid);

  const discountedPrice = calcDiscountedPrice(cardData.price, cardData.discount);



  return (
    <>
      <Card
        onClick={() => setOpenDetails(true)}
        sx={{
          width: 270,
          borderRadius: 4,
          background: cardData.discount>0?'#fff':'#ffffff',
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
                  fav ? removeProductFromFavorite(cardData) : addProductToFavorite(cardData);
                }}
              >
                <Favorite
                  sx={{
                    color: fav ? '#e53935' : '#b0b0b0',
                    fontSize: 26,
                    transition: '0.3s',
                    // '&:hover': { color: fav?'#bababaff':'#f44bd5ff' },
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title={inCart ? "Remove from Cart" : "Add to Cart"}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();

                  inCart ? removeProductFromCart(cardData) : addProductToCart(cardData);
                }}
                sx={{
                  color: '#1976d2',
                  transition: '0.3s',
                  '&:hover': { color: '#0d47a1', transform: 'scale(1.1)' },
                }}
              >
                {inCart ? <RemoveShoppingCart sx={{ fontSize: 26 }} /> :
                  <AddShoppingCart sx={{ fontSize: 26 }} />}
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

    </>
  );
};

export default ProductCard;
