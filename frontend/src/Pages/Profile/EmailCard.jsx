import React from 'react'
import { Grid, IconButton, Paper, Typography, Tooltip } from '@mui/material'
import { Edit, Delete } from '@mui/icons-material'
import UserAddressService from '../../Services/userAddressService'

const EmailCard = ({ address, onEdit, onDelete }) => {
  if (!address) return null

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      try {
        await UserAddressService.deleteAddress(address.addressid)
        onDelete() // refresh parent data
      } catch (error) {
        console.error('Error deleting address:', error)
      }
    }
  }

  return (
    <Grid item xs={12} sm={6}>
      <Paper
        elevation={2}
        sx={{
          p: 2.5,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#2b2b2b' : '#ffffff',
          transition: '0.3s ease',
          position: 'relative',
          '&:hover': { transform: 'translateY(-4px)', boxShadow: 6 },
        }}
      >
        <Tooltip title="Edit Address">
          <IconButton
            size="small"
            color="primary"
            sx={{ position: 'absolute', top: 8, right: 36 }}
            onClick={() => onEdit(address)}
          >
            <Edit fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Address">
          <IconButton
            size="small"
            color="error"
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={handleDelete}
          >
            <Delete fontSize="small" />
          </IconButton>
        </Tooltip>

        <Typography variant="subtitle1" fontWeight={600} color="primary" gutterBottom>
          {address.tag || 'Address'}
        </Typography>
        <Typography variant="body2">{address.addressLine1}</Typography>
        {address.addressLine2 && <Typography variant="body2">{address.addressLine2}</Typography>}
        {address.addressLine3 && <Typography variant="body2">{address.addressLine3}</Typography>}
        <Typography variant="body2" color="text.secondary">
          {address.city}, {address.state} - {address.pincode}
        </Typography>
      </Paper>
    </Grid>
  )
}

export default EmailCard
