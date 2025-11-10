import React, { useEffect, useState } from 'react';
import { Grid, Typography, CircularProgress, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import ProductCard from './ProductCard';
import SecondaryBar from './SecondaryBar';
import ProductService from '../../Services/productService';
import { useRedux } from '../../Hooks/useRedux';
import { setSearchText } from '../../redux/searchSlice';

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
        item.price.toString().toLowerCase().includes(searchText.toLowerCase())) &&
      (!categoryValue ||
        categoryValue.toLowerCase() === 'all' ||
        item.category.toLowerCase() === categoryValue.toLowerCase())
  );

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <SecondaryBar />
      <Typography variant="h4" sx={{ textAlign: 'center', mb: 2 }}>
        Products
      </Typography>

      <Grid container gap={2} sx={{ margin: 2, justifyContent: 'center' }}>
        {filteredData.length > 0 ? (
          filteredData.map((element, index) => (
            <Grid key={index}>
              <ProductCard cardData={element} />
            </Grid>
          ))
        ) : (
          <Typography>No Match Found</Typography>
        )}
      </Grid>
    </>
  );
};

export default Products;
