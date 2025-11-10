import React, { useState } from 'react';
import { Button, Container, Paper, Typography } from '@mui/material';
import useProductActions from '../../Hooks/useProductActions';

const QuantityPopup = ({ product, initialQuantity, handleClose }) => {
    const { toggleCart } = useProductActions();
    const [quantity, setQuantity] = useState(initialQuantity || 1);

    const handleClick = () => {
        setQuantity(prev => prev + 1); // increment quantity
        window.dispatchEvent(new CustomEvent('cartToggled', { detail: product.productid }));
        toggleCart(product.productid);
        handleClose(); // auto close
    };

    return (
        <Container sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    {product.name} is already in your cart
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Quantity in Cart: {quantity}
                </Typography>
                <Button onClick={handleClick} variant="contained" color="primary">
                    Add More
                </Button>
        </Container>
    );
};

export default QuantityPopup;
