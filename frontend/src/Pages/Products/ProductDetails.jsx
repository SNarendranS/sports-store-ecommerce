import React from 'react';
import { AddShoppingCart, Delete, Favorite, Close } from '@mui/icons-material';
import { Typography, Grid, IconButton, Box, CardMedia } from '@mui/material';
import useProductActions from '../../Hooks/useProductActions';

const ProductDetails = ({ product, handleClose }) => {
  const { isInCart, isFavorite, toggleCart, toggleFavorite } = useProductActions();

  if (!product) return <p>No product selected.</p>;

  const inCart = isInCart(product.productid);
  const fav = isFavorite(product.productid);
  const discountedPrice = Math.ceil(product.price - (product.discount / 100) * product.price);

  return (
    <Box sx={{ position: 'relative', p: 2 }}>
      <IconButton
        onClick={handleClose}
        sx={{
          position: 'absolute',
          top: -15,
          right: -15,
          color: 'grey.600',
          '&:hover': { color: 'error.main' },
        }}
      >
        <Close />
      </IconButton>

      <CardMedia
        component="img"
        image={product.img}
        alt={product.name}
        height="200"
        sx={{ borderRadius: 2, objectFit: 'cover', mb: 2 }}
      />

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {product.name}
      </Typography>
      <Typography variant="body2" fontWeight="bold" gutterBottom>
        Available Stock: {product.availableStock}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {product.category}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {product.des}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
        {product.discount > 0 && (
          <Typography variant="body1" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            ₹{product.price}
          </Typography>
        )}
        <Typography variant="h6" color="primary" fontWeight="bold">
          ₹{discountedPrice}
        </Typography>
      </Box>

      <Grid container justifyContent="space-between" alignItems="center">
        <IconButton onClick={() => toggleFavorite(product.productid)}>
          <Favorite sx={{ color: fav ? 'red' : 'gray', fontSize: 28 }} />
        </IconButton>
        <IconButton onClick={() => toggleCart(product.productid)}>
          {inCart ? <Delete color="error" sx={{ fontSize: 28 }} /> : <AddShoppingCart color="primary" sx={{ fontSize: 28 }} />}
        </IconButton>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
