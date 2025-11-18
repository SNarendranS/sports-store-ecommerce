import { useEffect, useState } from "react";
import ProductService from "../../Services/productService";
import { Box, Button, CardMedia, IconButton, Paper, Stack, Typography, Chip, Dialog, DialogContent } from "@mui/material";
import { Delete, ArrowCircleRight, Star } from "@mui/icons-material";
import useProductActions from "../../Hooks/useProductActions";
import ProductDetailsPage from "../Products/ProductDetails";
const FavoriteItem = ({ product, onRemoveFromList }) => {
    const [ProductDetails, setProduct] = useState(null);
    const { removeProductFromFavorite, addProductToCart } = useProductActions();
    const [openDetails, setOpenDetails] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductById(product.productid);
                setProduct(res.data);
            } catch (err) {
                console.error('Error fetching product:', err);
            }
        };
        fetchProduct();
    }, [product]);

    const handleRemove = async () => {
        try {
            await removeProductFromFavorite(product);
        } catch (err) {
            console.error('Remove failed:', err);
        }
        onRemoveFromList(product.productid);
    };

    const handleMoveToCart = async () => {
        try {
            await addProductToCart(product);
            handleRemove();
        } catch (err) {
            console.error('Move to cart failed:', err);
        }
    };

    if (!ProductDetails) return null;

    return (<>
        <Paper
            onClick={() => setOpenDetails(true)}

            elevation={3}
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2.5,
                borderRadius: 4,
                gap: 2,
                backgroundColor: '#fff',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
                },
            }}
        >
            {/* Product Info */}
            <Box sx={{ display: 'flex', gap: 2, flex: 1, alignItems: 'center', width: '100%' }}>
                <CardMedia
                    component="img"
                    image={ProductDetails.img}
                    alt={ProductDetails.name}
                    sx={{
                        width: { xs: 80, sm: 100 },
                        height: { xs: 80, sm: 100 },
                        borderRadius: 3,
                        objectFit: 'cover',
                        border: '2px solid #e0e0e0',
                        boxShadow: 1,
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.05)' },
                    }}
                />
                <Box sx={{ minWidth: 0 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        noWrap
                        sx={{ maxWidth: { xs: '60vw', sm: 220 }, mb: 0.5 }}
                    >
                        {ProductDetails.name}
                    </Typography>
                    <Chip
                        icon={<Star />}
                        label={`₹${ProductDetails.price?.toFixed(2)}`}
                        size="small"
                        sx={{
                            backgroundColor: '#f3e5f5',
                            color: '#7e57c2',
                            fontWeight: 'bold',
                        }}
                    />
                    {ProductDetails.rating && (
                        <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                            {ProductDetails.rating} ⭐
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Actions */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 2, sm: 5 }}
                alignItems="center"
                mt={{ xs: 2, sm: 0 }}
            >
                <Button
                    variant="contained"
                    size="small"
                    startIcon={<ArrowCircleRight />}
                    onClick={handleMoveToCart}
                    sx={{
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #42a5f5, #7e57c2)',
                        '&:hover': { background: 'linear-gradient(135deg, #1e88e5, #5e35b1)' },
                        color: '#fff',
                        borderRadius: 2,
                        px: 2.5,
                        py: 1,
                        boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
                    }}
                >
                    Move to Cart
                </Button>

                <IconButton
                    onClick={handleRemove}
                    sx={{
                        color: '#e57373',
                        '&:hover': { color: '#c62828' },
                        backgroundColor: 'rgba(255,0,0,0.05)',
                        '&:hover': { backgroundColor: 'rgba(255,0,0,0.15)' },
                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    }}
                >
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

export default FavoriteItem;
