import React, { useEffect, useState } from 'react';
import { AddShoppingCart, Favorite, Close, Delete, HeartBroken } from '@mui/icons-material';
import { Typography, Grid, IconButton, Box, CardMedia, Button, Chip, Paper, Container } from '@mui/material';
import cartService from '../../Services/cartService';
import favService from '../../Services/favService';

const ProductDetails = ({ product, handleClose }) => {
  const [inCart, setInCart] = useState(false);
  const [fav, setFav] = useState(false);
  const toggleCart = async () => {
    if (!product.productid) return
    const productId = product.productid
    try {
      if (inCart) {
        await cartService.removeFromCart(productId);
      } else {
        await cartService.addToCart(productId, 1);
      }
      setInCart(prev => !prev)

    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  const toggleFavorite = async () => {
    if (!product.productid) return
    const productId = product.productid
    try {
      if (fav) {
        //await favService.remove(productId);
      } else {
        // await favService.add(productId);
      }
      setFav(prev => !prev)

    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  useEffect(() => {
    const fetchCartItem = async () => {
      try {
        const res = await cartService.FindItemInCart(product.productid);
        if (res) setInCart(true);
      } catch {
        setInCart(false);
      }
    };
    if (product) fetchCartItem();
  }, [product]);

  if (!product) return <Typography>No product selected.</Typography>;

  const discountedPrice = Math.ceil(product.price - (product.discount / 100) * product.price);

  return (
    <Container
      sx={{
        p: 3,
        borderRadius: 3,
        maxHeight: '100vh',
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
          '&:hover': { color: 'error.main' },
        }}
      >
        <Close />
      </IconButton>

      {/* Product Image */}
      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        sx={{
          borderRadius: 2,
          objectFit: 'cover',
          mb: 3,
          height: 300,
          width: '100%',
          boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
        }}
      />

      {/* Product Info */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {product.name}
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Category: {product.category}
      </Typography>

      <Typography variant="body2" fontWeight="medium" gutterBottom>
        Stock: {product.availableStock}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {product.des}
      </Typography>

      {/* Price & Discount */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, my: 2 }}>
        {product.discount > 0 && (
          <Chip
            label={`-${product.discount}%`}
            color="secondary"
            size="small"
            sx={{ fontWeight: 'bold' }}
          />
        )}
        {product.discount > 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textDecoration: 'line-through' }}
          >
            ₹{product.price}
          </Typography>
        )}
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{discountedPrice}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'space-between' }}>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant={fav ? 'contained' : 'outlined'}
            color="error"
            startIcon={fav?<HeartBroken/>:<Favorite />}
            onClick={() => {
              toggleFavorite(product.productid);
            }}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
              minWidth: '210px'

            }}
          >
            {fav ? 'Remove from Favorite' : 'Add to Favorite'}
          </Button>
        </Grid>

        <Grid item xs={6} >
          <Button
            fullWidth
            variant={inCart ? 'outlined' : "contained"}
            color={inCart ? 'error' : "primary"}
            startIcon={inCart ? <Delete /> : <AddShoppingCart />}
            onClick={() => {
              toggleCart();
            }}
            sx={{
              textTransform: 'none',
              fontWeight: 'bold',
              py: 1.5,
              minWidth: '180px'
            }}
          >
            {inCart ? 'Remove from Cart' : 'Add to Cart'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
