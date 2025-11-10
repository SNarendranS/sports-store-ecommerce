import React, { useEffect, useState } from 'react'
import UserService from '../../Services/userService'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Divider,
  Avatar,
  Skeleton,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material'
import {Edit,Add} from '@mui/icons-material'
import EmailCard from './EmailCard'
import EmailPopup from './EmailPopup'

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openEdit, setOpenEdit] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
  })
  const [saving, setSaving] = useState(false)

const [openAddressPopup, setOpenAddressPopup] = useState({ open: false, mode: '', data: null })

  // Fetch profile info
  const fetchProfileData = async () => {
    try {
      const res = await UserService.getUserProfile()
      if (res) {
        setUserData(res)
        setFormData({
          name: res.name || '',
          phoneNumber: res.phoneNumber || '',
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfileData()
  }, [saving])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle user update
  const handleUpdate = async () => {
    try {
      setSaving(true)
      const res = await UserService.updateUserData(formData)
      if (res) {
        setUserData(res)
        setOpenEdit(false)
      }
    } catch (error) {
      console.error('Error updating user data:', error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(145deg, #1e1e1e, #2c2c2c)'
              : 'linear-gradient(145deg, #ffffff, #f3f4f6)',
          boxShadow: 6,
          position: 'relative',
        }}
      >
        {/* Header Section */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 3,
            mb: 4,
          }}
        >
          {loading ? (
            <Skeleton variant="circular" width={80} height={80} />
          ) : (
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'primary.main',
                fontSize: 36,
              }}
            >
              {userData?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          )}

          <Box sx={{ flexGrow: 1 }}>
            {loading ? (
              <>
                <Skeleton width="60%" height={32} />
                <Skeleton width="40%" height={24} />
                <Skeleton width="30%" height={24} />
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight={600}>
                  {userData.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userData.email}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {userData.phoneNumber}
                </Typography>
              </>
            )}
          </Box>

          {!loading && (
            <Tooltip title="Edit Profile">
              <IconButton
                color="primary"
                sx={{ alignSelf: 'flex-start' }}
                onClick={() => setOpenEdit(true)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Address Section */}
        <Typography variant="h6" gutterBottom fontWeight={600}>
          Addresses
        </Typography>

        <Grid container spacing={3}>
          {loading
            ? Array.from(new Array(2)).map((_, i) => (
                <Grid item xs={12} sm={6} key={i}>
                  <Skeleton
                    variant="rectangular"
                    height={120}
                    sx={{ borderRadius: 2 }}
                  />
                </Grid>
              ))
            : userData?.UserAddresses?.map((address, index) => (
                <EmailCard key={index} address={address} />
              ))}
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
  <Tooltip title="Add New Address">
    <IconButton
      color="primary"
      size="large"
      onClick={() => setOpenAddressPopup({ open: true, mode: 'add', data: null })}
    >
      <Add />
    </IconButton>
  </Tooltip>
</Box>

      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Phone Number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)} disabled={saving}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            disabled={saving}
            startIcon={saving ? <CircularProgress size={18} /> : null}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Profile
