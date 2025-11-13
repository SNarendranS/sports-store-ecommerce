import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Button,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import ProductService from '../../Services/productService';
import { useRedux } from '../../Hooks/useRedux';
import { setSearchText } from '../../redux/searchSlice';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const Products = ({ offers }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { searchText, categoryValue } = useRedux();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        dispatch(setSearchText(''));
        const res = offers
          ? await ProductService.getAllOfferProducts()
          : await ProductService.getAllProducts();
        if (res.data) setData(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getProducts();
  }, [offers, dispatch]);

  const filteredData = data.filter(
    (item) =>
      (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.price.toString().includes(searchText)) &&
      (!categoryValue ||
        categoryValue.toLowerCase() === 'all' ||
        categoryValue === '' ||
        item.category.toLowerCase() === categoryValue.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <>
      {/* Header Section */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 4,
          mb: 4,
          background: offers
            ? 'linear-gradient(135deg, #ff8a65, #f06292)'
            : 'linear-gradient(135deg, #42a5f5, #7e57c2)',
          color: '#fff',
          textAlign: 'center',
          boxShadow: 3,
        }}
      >
        <LocalOfferIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h5" fontWeight="bold">
          {offers ? 'Exclusive Offers' : 'All Products'}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          {offers
            ? 'Grab amazing discounts before they’re gone!'
            : 'Browse through our latest products and collections'}
        </Typography>
      </Paper>

      {/* Product Grid */}
      {filteredData.length > 0 ? (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ px: { xs: 2, sm: 3 } }}
        >
          {filteredData.map((element, index) => (
            <Grid item key={index}>
              <ProductCard cardData={element} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box textAlign="center" mt={10}>
          <Typography variant="h6" color="text.secondary">
            No matching products found
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }} color="text.secondary">
            Try adjusting your filters or search keywords
          </Typography>
          <Button
            variant="contained"
            sx={{
              mt: 3,
              borderRadius: 3,
              textTransform: 'none',
              background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
            }}
            onClick={() => dispatch(setSearchText(''))}
          >
            Reset Filters
          </Button>
        </Box>
      )}
    </>
  );
};

export default Products;
