import React, { useEffect } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import UserAddressService from '../../Services/userAddressService'

const addressSchema = Yup.object().shape({
  tag: Yup.string().required('Tag is required'),
  addressLine1: Yup.string().required('Address Line 1 is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  pincode: Yup.string().required('Pincode is required'),
})

const EmailPopup = ({ openState, onClose, onSuccess }) => {
  const { open, mode, data } = openState

  const initialValues = {
    tag: data?.tag || '',
    addressLine1: data?.addressLine1 || '',
    addressLine2: data?.addressLine2 || '',
    addressLine3: data?.addressLine3 || '',
    city: data?.city || '',
    state: data?.state || '',
    pincode: data?.pincode || '',
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (mode === 'edit') {
        await UserAddressService.updateAddress(data.addressid, values)
      } else {
        await UserAddressService.createAddress(values)
      }
      onSuccess()
      onClose()
    } catch (error) {
      console.error('Error saving address:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{mode === 'edit' ? 'Edit Address' : 'Add New Address'}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={addressSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleSubmit, isSubmitting, errors, touched }) => (
          <Form>
            <DialogContent>
              {['tag', 'addressLine1', 'addressLine2', 'addressLine3', 'city', 'state', 'pincode'].map((field) => (
                <TextField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  name={field}
                  fullWidth
                  margin="dense"
                  value={values[field]}
                  onChange={handleChange}
                  error={touched[field] && Boolean(errors[field])}
                  helperText={touched[field] && errors[field]}
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} disabled={isSubmitting}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={18} /> : 'Save'}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  )
}

export default EmailPopup
