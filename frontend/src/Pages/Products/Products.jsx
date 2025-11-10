import ProductCard from './ProductCard';
import { Grid, Typography } from '@mui/material';
import { useRedux } from '../../Hooks/useRedux';
import SecondaryBar from './SecondaryBar';
import { useEffect, useState } from 'react';
import ProductService from '../../Services/productService';
import { useDispatch } from 'react-redux';
import { setSearchText } from '../../redux/searchSlice';

const Products = ({ offers }) => {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setSearchText(''))
        const getProducts = async () => {
            const res = offers ? await ProductService.getAllOfferProducts() : await ProductService.getAllProducts()
            if (res.data) {

                setData(res.data)
            }
        }
        getProducts()
    }, [offers])

    const { searchText, categoryValue } = useRedux();

    const filteredData = data.filter(
        item =>
            (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.price.toString().toLowerCase().includes(searchText.toLowerCase())) &&
            (!categoryValue || item.category.toLowerCase() === categoryValue.toLowerCase())
    );





    return (
        <>
            {/* {getIsLoggedIn() ? <SecondaryBar />:''} */}
            <SecondaryBar />
            <Typography variant='h4' sx={{ textAlign: 'center', mb: 2 }}>
                Products
            </Typography>

            <Grid container gap={2} sx={{ margin: 2, justifyContent: 'center' }}>
                {console.log(categoryValue)}
                {filteredData.map((element, index) => (
                    <Grid key={index}>
                        <ProductCard cardData={element} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default Products;