import { useEffect, useState } from "react";
import ProductService from "../../Services/productService";
import { Box, Button, CardMedia, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Add, ArrowCircleLeft, Delete, Remove } from "@mui/icons-material";
import cartService from "../../Services/cartService";
import favService from "../../Services/favService";
import useProductActions from "../../Hooks/useProductActions";

const CartItem = ({ product, onRemoveFromList, reportTotal }) => {
     const [ProductDetails, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(product.quantity || 1);
    const { removeProductFromCart,addProductToFavorite } = useProductActions();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductById(product.productid);
                setProduct(res.data);
                reportTotal(product.productid, res.data.price * quantity);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };
        fetchProduct();
    }, [product]);
    
    const handleQuantityChange = async (delta) => {
        const newQty = quantity + delta;
        if (newQty <= 0) return handleRemove();

        try {
            const res = await cartService.updateCartItem(product.productid, newQty);
            if (res.response?.status === 400) {
                alert('Requested quantity not available in stock');
                return;
            }
            setQuantity(newQty);
            reportTotal(product.productid, newQty * ProductDetails.price);
        } catch (err) {
            console.error('Quantity update failed:', err);
        }
    };

    const handleRemove = async () => {
        try {
            //await cartService.removeFromCart(productId);
            await removeProductFromCart(product);
        } catch (err) {
            console.error('Remove failed:', err);
        }
        reportTotal(product.productid, 0);
        onRemoveFromList(product.productid);
    };

    const handleMoveToFav = async () => {
        try {
            await addProductToFavorite(product);
            handleRemove();
        } catch (err) {
            console.error('Move to favorites failed:', err);
        }
    };

    if (!ProductDetails) return null;

    return (
        <Paper
            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2.5,
                borderRadius: 3,
                gap: 2,
            }}
        >
            {/* Product Info */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    flex: '1 1 auto',
                    width: { xs: '100%', sm: '50%' },
                    alignItems: 'center',
                }}
            >
                <CardMedia
                    component="img"
                    image={product.img}
                    alt={product.name}
                    sx={{
                        width: { xs: 60, sm: 80 },
                        height: { xs: 60, sm: 80 },
                        borderRadius: 3,
                        objectFit: 'cover',
                        boxShadow: 1,
                    }}
                />
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        noWrap
                        sx={{ maxWidth: { xs: '70vw', sm: 180 } }}
                    >
                        {ProductDetails.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        ₹{ProductDetails.price?.toFixed(2)}
                    </Typography>
                </Box>
            </Box>

            {/* Quantity Controls */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mt: { xs: 1, sm: 0 },
                }}
            >
                <IconButton size="small" onClick={() => handleQuantityChange(-1)}>
                    <Remove />
                </IconButton>
                <Typography fontWeight="bold">{quantity}</Typography>
                <IconButton size="small" onClick={() => handleQuantityChange(1)}>
                    <Add />
                </IconButton>
            </Box>

            {/* Price + Actions */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                alignItems="center"
                mt={{ xs: 2, sm: 0 }}
                width={{ xs: '100%', sm: 'auto' }}
            >
                <Typography fontWeight="bold" color="primary" sx={{ p: '0 4px' }}>
                    ₹{(quantity * ProductDetails.price).toFixed(2)}
                </Typography>

                <Button
                    variant="text"
                    size="small"
                    startIcon={<ArrowCircleLeft />}
                    onClick={handleMoveToFav}
                    sx={{ textTransform: 'none', color: '#7e57c2' }}
                >
                    Move to Favorite
                </Button>

                <IconButton
                    sx={{ color: '#e57373', "&:hover": { color: '#c62828' } }}
                    onClick={handleRemove}
                >
                    <Delete />
                </IconButton>
            </Stack>
        </Paper>
    );
};

export default CartItem;
