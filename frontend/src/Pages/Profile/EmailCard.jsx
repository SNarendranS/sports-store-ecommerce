import React from 'react'
import { Grid, IconButton, Paper, Typography } from '@mui/material'

const EmailCard = ({ address }) => {
    if (!address) return null

    return (
        <Grid item xs={12} sm={6}>
            <IconButton
                size="small"
                color="primary"
                onClick={() => setOpenAddressPopup({ open: true, mode: 'edit', data: address })}
            >
                <Edit fontSize="small" />
            </IconButton>

            <Paper
                elevation={2}
                sx={{
                    p: 2.5,
                    borderRadius: 2,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#2b2b2b' : '#ffffff',
                    transition: '0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6,
                    },
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="primary"
                    gutterBottom
                >
                    {address.tag || 'Address'}
                </Typography>

                <Typography variant="body2" color="text.primary">
                    {address.addressLine1}
                </Typography>
                {address.addressLine2 && (
                    <Typography variant="body2" color="text.primary">
                        {address.addressLine2}
                    </Typography>
                )}
                {address.addressLine3 && (
                    <Typography variant="body2" color="text.primary">
                        {address.addressLine3}
                    </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                    {address.city}, {address.state} - {address.pincode}
                </Typography>
            </Paper>
        </Grid>
    )
}

export default EmailCard
