import React from 'react'
import { Grid, IconButton, Paper, Typography, Tooltip } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import UserAddressService from '../../Services/userAddressService'

const EmailCard = ({ address, onEdit, onDelete }) => {
  if (!address) return null

  const handleDelete = async () => {
    if (window.confirm('Delete this address?')) {
      await UserAddressService.deleteAddress(address.addressid)
      onDelete()
    }
  }

  return (
    <Grid item xs={12} sm={6}>
      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: 3,
          position: 'relative',
          backdropFilter: 'blur(8px)',
          transition: '0.3s',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(50,50,50,0.45)'
              : 'rgba(255,255,255,0.7)',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
          }
        }}
      >
        {/* Edit button */}
        <Tooltip title="Edit">
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 10, right: 45, bgcolor: 'primary.light', color: '#fff' }}
            onClick={() => onEdit(address)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        {/* Delete button */}
        <Tooltip title="Delete">
          <IconButton
            size="small"
            sx={{ position: 'absolute', top: 10, right: 10, bgcolor: 'error.light', color: '#fff' }}
            onClick={handleDelete}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          {address.tag || 'Address'}
        </Typography>

        <Typography>{address.addressLine1}</Typography>
        {address.addressLine2 && <Typography>{address.addressLine2}</Typography>}
        {address.addressLine3 && <Typography>{address.addressLine3}</Typography>}
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          {address.city}, {address.state} - {address.pincode}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default EmailCard
