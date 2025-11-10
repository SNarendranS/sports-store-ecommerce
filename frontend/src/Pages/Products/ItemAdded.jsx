import { Close, OpenInNew } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ItemAdded = ({ handleClose }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                position: 'relative',
                p: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
            }}
        >
            {/* Close Button */}
            <IconButton
                onClick={handleClose}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'grey.500',
                }}
            >
                <Close />
            </IconButton>

            {/* Message */}
            <Typography variant="h6" gutterBottom>
                Item Added to Your Cart
            </Typography>
            <Typography variant="body2" color="text.secondary">
                You can view your cart or continue shopping.
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    endIcon={<OpenInNew />}
                    onClick={() => navigate('/cart')}
                >
                    Go to Cart
                </Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>
                    Continue Shopping
                </Button>
            </Box>
        </Box>
    );
};

export default ItemAdded;
