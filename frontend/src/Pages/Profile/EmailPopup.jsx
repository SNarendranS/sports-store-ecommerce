import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import UserAddressService from '../../Services/userAddressService'

const EmailPopup = ({ openState, onClose, onSuccess }) => {
  const { open, mode, data } = openState
  const [formData, setFormData] = useState({
    tag: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    city: '',
    state: '',
    pincode: '',
  })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (mode === 'edit' && data) {
      setFormData(data)
    } else {
      setFormData({
        tag: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        city: '',
        state: '',
        pincode: '',
      })
    }
  }, [mode, data])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      if (mode === 'edit') {
        await UserAddressService.updateAddress(data.id, formData)
      } else {
        await UserAddressService.createAddress(formData)
      }
      onSuccess() // Refresh profile data in parent
      onClose()
    } catch (error) {
      console.error('Error saving address:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Edit Address' : 'Add New Address'}</DialogTitle>
      <DialogContent>
        <TextField label="Tag" name="tag" fullWidth margin="dense" value={formData.tag} onChange={handleChange} />
        <TextField label="Address Line 1" name="addressLine1" fullWidth margin="dense" value={formData.addressLine1} onChange={handleChange} />
        <TextField label="Address Line 2" name="addressLine2" fullWidth margin="dense" value={formData.addressLine2} onChange={handleChange} />
        <TextField label="Address Line 3" name="addressLine3" fullWidth margin="dense" value={formData.addressLine3} onChange={handleChange} />
        <TextField label="City" name="city" fullWidth margin="dense" value={formData.city} onChange={handleChange} />
        <TextField label="State" name="state" fullWidth margin="dense" value={formData.state} onChange={handleChange} />
        <TextField label="Pincode" name="pincode" fullWidth margin="dense" value={formData.pincode} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={saving}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary" disabled={saving}>
          {saving ? <CircularProgress size={18} /> : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EmailPopup
