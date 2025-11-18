import React, { useEffect, useRef, useState } from 'react';
import {
  AddShoppingCart,
  Favorite,
  Close,
  Delete,
  HeartBroken,
} from '@mui/icons-material';
import {
  Typography,
  Grid,
  IconButton,
  Box,
  CardMedia,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
} from '@mui/material';
import useProductActions from '../../Hooks/useProductActions';

const ProductDetails = ({ product, handleClose,showButton=true }) => {
  const { addProductToCart, removeProductFromCart, isInCart, isFavorite, addProductToFavorite, removeProductFromFavorite } = useProductActions();
  const [loading, setLoading] = useState(false);
  const [inCart, setInCart] = useState(isInCart(product?.productid));
  const [fav, setFav] = useState(isFavorite(product?.productid));
  const toggleCart = async () => {
    if (!product?.productid) return;

    try {
      setLoading(true);
      if (!inCart) {
        await addProductToCart(product);
        setInCart(true);
      } else {
        await removeProductFromCart(product);
        setInCart(false);
      }

    } catch (error) {
      console.error("Error updating cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!product?.productid) return;

    try {
      setLoading(true);
      if (!fav) {
        await addProductToFavorite(product);
        setFav(true);
      } else {
        await removeProductFromFavorite(product);
        setFav(false);
      }

    } catch (error) {
      console.error("Error updating favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!product)
    return (
      <Typography variant="h6" textAlign="center">
        No product selected.
      </Typography>
    );

  const discountedPrice = Math.ceil(
    product.price - (product.discount / 100) * product.price
  );

  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Close Button */}
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          color: 'grey.600',
          zIndex: 5,
          '&:hover': { color: 'error.main', transform: 'rotate(90deg)' },
          transition: '0.3s ease',
        }}
      >
        <Close />
      </IconButton>

      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
          color: '#fff',
          textAlign: 'center',
          py: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {product.category}
        </Typography>
      </Box>

      {/* Product Image */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2, // ✅ no overlap
          mb: 2,
        }}
      >
        <CardMedia
          component="img"
          image={product.img}
          alt={product.name}
          sx={{
            borderRadius: 3,
            objectFit: 'cover',
            width: '90%',
            height: 280,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        />
      </Box>

      <Container sx={{ pb: 4 }}>
        {/* Info Section */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          {product.discount > 0 && (
            <Chip
              label={`${product.discount}% OFF`}
              color="error"
              sx={{
                mb: 1.5,
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #ff7043, #f06292)',
                color: '#fff',
              }}
            />
          )}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 1 }}
          >
            {product.des}
          </Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            color={product.availableStock > 5 ? "text.secondary" : "error.main"}
            sx={{
              border: product.availableStock > 5 ? 'none' : '1.5px solid red',
              width: 200,
              justifySelf: 'center',
            }}
          >
            Available Stock: {product.availableStock}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Pricing */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'baseline',
            gap: 2,
            mb: 3,
          }}
        >
          {product.discount > 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ textDecoration: 'line-through' }}
            >
              ₹{product.price}
            </Typography>
          )}
          <Typography
            variant="h5"
            color="primary"
            fontWeight="bold"
          >
            ₹{discountedPrice}
          </Typography>

        </Box>

        {/* Action Buttons */}
        {showButton&&<Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant={fav ? 'contained' : 'outlined'}
              color="error"
              startIcon={fav ? <HeartBroken /> : <Favorite />}
              onClick={toggleFavorite}
              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                py: 1.4,
                borderRadius: 3,
                boxShadow: fav ? '0 4px 10px rgba(244,67,54,0.3)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 14px rgba(244,67,54,0.4)',
                },
              }}
            >
              {fav ? 'Remove Favorite' : 'Add to Favorite'}
            </Button>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant={inCart ? 'outlined' : 'contained'}
              color={inCart ? 'error' : 'primary'}
              startIcon={inCart ? <Delete /> : <AddShoppingCart />}
              onClick={toggleCart}
              disabled={loading}   // ← THIS IS THE IMPORTANT PART

              sx={{
                textTransform: 'none',
                fontWeight: 'bold',
                py: 1.4,
                borderRadius: 3,
                boxShadow: inCart
                  ? 'none'
                  : '0 4px 10px rgba(25,118,210,0.3)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: inCart
                    ? '0 4px 12px rgba(244,67,54,0.3)'
                    : '0 6px 14px rgba(25,118,210,0.4)',
                },
              }}
            >
              {loading ? "Processing..." : inCart ? 'Remove from Cart' : 'Add to Cart'}
            </Button>
          </Grid>
        </Grid>}
      </Container>
    </Paper>
  );
};

export default ProductDetails;
