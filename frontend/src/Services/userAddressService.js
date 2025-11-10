import axios from 'axios'
import { getAuthHeaders } from '../Utils/headerToken'

const API_BASE_URL = import.meta.env.VITE_API_URI
const API_USER_ADDRESS_URL = `${API_BASE_URL}/address`

// ✅ Create a new address
const createAddress = async (addressDetail) => {
    try {
        console.log("addressDetail", addressDetail)
        const res = await axios.post(
            `${API_USER_ADDRESS_URL}`,
            { addressDetail },
            { headers: getAuthHeaders() }
        )
        return res.data.address
    } catch (error) {
        console.error('Error creating address:', error.response?.data || error.message)
        throw error.response?.data || { message: 'Failed to create address' }
    }
}

// ✅ Update an existing address
const updateAddress = async (addressId, updateDetail) => {
    try {
        console.log(`${API_USER_ADDRESS_URL}/update/${addressId}`)
        const res = await axios.put(
            `${API_USER_ADDRESS_URL}/update/${addressId}`,
            { updateDetail },
            { headers: getAuthHeaders() }
        )
        return res.data.address // Assuming backend returns `{ address: ... }`
    } catch (error) {
        console.error('Error updating address:', error.response?.data || error.message)
        throw error.response?.data || { message: 'Failed to update address' }
    }
}

// ✅ Get all addresses for the logged-in user
const getAddresses = async () => {
    try {
        const res = await axios.get(`${API_USER_ADDRESS_URL}/list`, {
            headers: getAuthHeaders(),
        })
        return res.data.addresses // Assuming backend returns `{ addresses: [...] }`
    } catch (error) {
        console.error('Error fetching addresses:', error.response?.data || error.message)
        throw error.response?.data || { message: 'Failed to fetch addresses' }
    }
}

// ✅ Delete an address
const deleteAddress = async (addressId) => {
    try {
        console.log(addressId)
        const res = await axios.delete(`${API_USER_ADDRESS_URL}/${addressId}`, {
            headers: getAuthHeaders(),
        })
        return res.data
    } catch (error) {
        console.error('Error deleting address:', error.response?.data || error.message)
        throw error.response?.data || { message: 'Failed to delete address' }
    }
}

const UserAddressService = {
    createAddress,
    updateAddress,
    getAddresses,
    deleteAddress,
}

export default UserAddressService
