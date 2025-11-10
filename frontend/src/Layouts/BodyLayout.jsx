import Signup from '../Pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Login'
import Products from '../Pages/Products/Products'
import ProductDetails from '../Pages/Products/ProductDetails'
import Cart from '../Pages/Cart'
import Profile from '../Pages/Profile'

const BodyLayout = ({ searchText }) => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/all-products' element={<Products searchText={searchText} offers={false} />} />
      <Route path='/offers' element={<Products searchText={searchText} offers={true} />} />
      <Route path='/product-detail' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default BodyLayout