import Signup from '../Pages/Signup'
import { Route, Routes, useLocation } from 'react-router-dom'
import Login from '../Pages/Login'
import Products from '../Pages/Products/Products'
import ProductDetails from '../Pages/Products/ProductDetails'
import Cart from '../Pages/Cart'
import Profile from '../Pages/Profile/Profile'
import Favorite from '../Pages/Favorite'
import { useEffect } from 'react'

const BodyLayout = ({ searchText }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/all-products' element={<Products searchText={searchText} offers={false} />} />
      <Route path='/offers' element={<Products searchText={searchText} offers={true} />} />
      <Route path='/product-detail' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  )
}

export default BodyLayout