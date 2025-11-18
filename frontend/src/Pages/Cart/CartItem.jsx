import { useEffect, useState } from "react";
import ProductService from "../../Services/productService";
import { Box, Button, CardMedia, IconButton, Paper, Stack, Typography, Chip, Dialog, DialogContent } from "@mui/material";
import { Add, ArrowCircleLeft, Delete, Remove, Star } from "@mui/icons-material";
import useProductActions from "../../Hooks/useProductActions";
import cartService from "../../Services/cartService";
import ProductDetailsPage from "../Products/ProductDetails";
const CartItem = ({ product, onRemoveFromList, reportTotal }) => {
    const [ProductDetails, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(product.quantity || 1);
    const { removeProductFromCart, addProductToFavorite } = useProductActions();
  const [openDetails, setOpenDetails] = useState(false);

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
    }, [product, quantity]);

    const handleQuantityChange = async (e,delta) => {
        e.stopPropagation();
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

    const handleRemove = async (e) => {
        e.stopPropagation();
        try {
            await removeProductFromCart(product);
        } catch (err) {
            console.error('Remove failed:', err);
        }
        reportTotal(product.productid, 0);
        onRemoveFromList(product.productid);
    };

    const handleMoveToFav = async (e) => {
        e.stopPropagation();
        try {
            await addProductToFavorite(product);
            handleRemove(e);
        } catch (err) {
            console.error('Move to favorites failed:', err);
        }
    };

    if (!ProductDetails) return null;

    return (
        <>
        <Paper
                    onClick={(e) =>{e.stopPropagation(); setOpenDetails(true)}}

            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2.5,
                borderRadius: 4,
                gap: 2,
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.12)',
                },
            }}
        >
            {/* Product Info */}
            <Box sx={{ display: 'flex', gap: 2, flex: '1 1 auto', alignItems: 'center', width: { xs: '100%', sm: '50%' } }}>
                <CardMedia
                    component="img"
                    image={ProductDetails.img}
                    alt={ProductDetails.name}
                    sx={{
                        width: { xs: 70, sm: 90 },
                        height: { xs: 70, sm: 90 },
                        borderRadius: 3,
                        objectFit: 'cover',
                        boxShadow: 1,
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                />
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ maxWidth: { xs: '65vw', sm: 200 } }}>
                        {ProductDetails.name}
                    </Typography>
                    <Chip
                        icon={<Star />}
                        label={`₹${ProductDetails.price?.toFixed(2)}`}
                        size="small"
                        sx={{ backgroundColor: '#f3e5f5', color: '#7e57c2', mt: 0.5 }}
                    />
                </Box>
            </Box>

            {/* Quantity Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: { xs: 1, sm: 0 } }}>
                <IconButton size="small" onClick={(e) => handleQuantityChange(e,-1)} sx={{ border: '1px solid #ccc' }}>
                    <Remove />
                </IconButton>
                <Typography fontWeight="bold" sx={{ minWidth: 20, textAlign: 'center' }}>{quantity}</Typography>
                <IconButton size="small" onClick={(e) => handleQuantityChange(e,1)} sx={{ border: '1px solid #ccc' }}>
                    <Add />
                </IconButton>
            </Box>

            {/* Price + Actions */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center" mt={{ xs: 2, sm: 0 }}>
                <Typography fontWeight="bold" color="primary" sx={{ minWidth: 60, textAlign: 'center' }}>
                    ₹{(quantity * ProductDetails.price).toFixed(2)}
                </Typography>

                <Button
                    variant="text"
                    size="small"
                    startIcon={<ArrowCircleLeft />}
                    onClick={handleMoveToFav}
                    sx={{
                        textTransform: 'none',
                        color: '#7e57c2',
                        '&:hover': { color: '#5e35b1' },
                    }}
                >
                    Move to Favorite
                </Button>

                <IconButton sx={{ color: '#e57373', "&:hover": { color: '#c62828' } }} onClick={handleRemove}>
                    <Delete />
                </IconButton>
            </Stack>
        </Paper>
         <Dialog open={openDetails} onClose={() => setOpenDetails(false)} fullWidth maxWidth="sm">
            <DialogContent>
                <ProductDetailsPage product={ProductDetails} handleClose={() => setOpenDetails(false)} showButton={false} />
            </DialogContent>
        </Dialog>
        </>
    );
};

export default CartItem;
