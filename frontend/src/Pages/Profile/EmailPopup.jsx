import React from 'react'
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Button, CircularProgress
} from '@mui/material'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import UserAddressService from '../../Services/userAddressService'

const schema = Yup.object({
  tag: Yup.string().required(),
  addressLine1: Yup.string().required(),
  city: Yup.string().required(),
  state: Yup.string().required(),
  pincode: Yup.string().required(),
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

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {mode === 'edit' ? 'Edit Address' : 'Add Address'}
      </DialogTitle>

      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            if (mode === 'edit') {
              await UserAddressService.updateAddress(data.addressid, values)
            } else {
              await UserAddressService.createAddress(values)
            }
            onSuccess()
            onClose()
          } finally {
            setSubmitting(false)
          }
        }}
        enableReinitialize
      >
        {({ values, handleChange, errors, touched, isSubmitting }) => (
          <Form>
            <DialogContent dividers>
              {Object.keys(values).map((field) => (
                <TextField
                  key={field}
                  label={field.replace(/([A-Z])/g, ' $1')}
                  name={field}
                  margin="dense"
                  fullWidth
                  value={values[field]}
                  onChange={handleChange}
                  error={touched[field] && Boolean(errors[field])}
                  helperText={touched[field] && errors[field]}
                />
              ))}
            </DialogContent>

            <DialogActions sx={{ p: 2 }}>
              <Button onClick={onClose}>Cancel</Button>
              <Button variant="contained" type="submit" disabled={isSubmitting}>
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
