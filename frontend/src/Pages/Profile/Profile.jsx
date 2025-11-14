import React, { useEffect, useState } from 'react'
import UserService from '../../Services/userService'
import EmailCard from './EmailCard'
import EmailPopup from './EmailPopup'
import {
  Container, Grid, Paper, Typography, Box, Divider, Avatar,
  Skeleton, IconButton, Tooltip, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField, CircularProgress, Stack
} from '@mui/material'
import { Edit, Add } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openEdit, setOpenEdit] = useState(false)
  const [formData, setFormData] = useState({ name: '', phoneNumber: '' })
  const [saving, setSaving] = useState(false)
  const [openAddressPopup, setOpenAddressPopup] = useState({ open: false, mode: '', data: null })
  const navigate = useNavigate()

  const fetchProfileData = async () => {
    try {
      setLoading(true)
      const res = await UserService.getUserProfile()
      if (res) {
        setUserData(res)
        setFormData({
          name: res.name || '',
          phoneNumber: res.phoneNumber || '',
        })
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProfileData() }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async () => {
    try {
      setSaving(true)
      const res = await UserService.updateUserData(formData)
      if (res) {
        setUserData(res)
        setOpenEdit(false)
      }
    } finally {
      setSaving(false)
    }
  }

  if (!userData && !loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
          <Typography variant="h6">Please login to view your profile</Typography>
          <Button variant="contained" sx={{ mt: 2 }} onClick={() => navigate("/")}>
            Login
          </Button>
        </Paper>
      </Box>
    )
  }

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
      <Paper
        elevation={10}
        sx={{
          p: { xs: 3, sm: 5 },
          borderRadius: 4,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #222, #333)'
              : 'linear-gradient(135deg, #ffffff, #f0f3ff)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
        }}
      >
        {/* Profile Header */}
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          spacing={3}
          sx={{
            p: 3,
            borderRadius: 3,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(255,255,255,0.6)',
            boxShadow: 3,
            mb: 4,
          }}
        >
          {loading ? (
            <Skeleton variant="circular" width={90} height={90} />
          ) : (
            <Avatar
              sx={{
                width: 90,
                height: 90,
                bgcolor: 'primary.main',
                fontSize: 36,
                boxShadow: 5
              }}
            >
              {userData?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          )}

          <Box flexGrow={1}>
            {loading ? (
              <>
                <Skeleton width="60%" height={32} />
                <Skeleton width="40%" height={25} />
              </>
            ) : (
              <>
                <Typography variant="h5" fontWeight={700}>
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
                sx={{
                  bgcolor: 'primary.light',
                  color: '#fff',
                  '&:hover': { bgcolor: 'primary.main' }
                }}
                onClick={() => setOpenEdit(true)}
              >
                <Edit />
              </IconButton>
            </Tooltip>
          )}
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Address Section */}
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          Saved Addresses
        </Typography>

        <Grid container spacing={3}>
          {loading
            ? Array.from({ length: 2 }).map((_, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 3 }} />
              </Grid>
            ))
            : userData?.UserAddresses?.map((address, i) => (
              <EmailCard
                key={i}
                address={address}
                onEdit={(addr) =>
                  setOpenAddressPopup({ open: true, mode: 'edit', data: addr })
                }
                onDelete={fetchProfileData}
              />
            ))
          }
        </Grid>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Tooltip title="Add New Address">
            <IconButton
              size="large"
              sx={{
                bgcolor: 'primary.main',
                color: '#fff',
                '&:hover': { bgcolor: 'primary.dark' }
              }}
              onClick={() => setOpenAddressPopup({ open: true, mode: 'add', data: null })}
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Edit Profile Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="sm">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth label="Name" margin="dense"
            name="name" value={formData.name} onChange={handleChange}
          />
          <TextField
            fullWidth label="Phone Number" margin="dense"
            name="phoneNumber" value={formData.phoneNumber} onChange={handleChange}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button
            variant="contained" color="primary"
            onClick={handleUpdate}
            disabled={saving}
            startIcon={saving && <CircularProgress size={18} />}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      <EmailPopup
        openState={openAddressPopup}
        onClose={() => setOpenAddressPopup({ open: false, mode: '', data: null })}
        onSuccess={fetchProfileData}
      />
    </Container>
  )
}

export default Profile
