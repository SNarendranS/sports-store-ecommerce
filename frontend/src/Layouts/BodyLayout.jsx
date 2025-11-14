import Signup from '../Pages/Signup'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Login from '../Pages/Login'
import Products from '../Pages/Products/Products'
import ProductDetails from '../Pages/Products/ProductDetails'
import Cart from '../Pages/Cart/Cart'
import Profile from '../Pages/Profile/Profile'
import Favorite from '../Pages/Favorite'
import { useEffect } from 'react'
import { useState } from 'react'
import SnakeGame from '../Games/SnakeGame'
import BasicLineChart from '../Pages/Charts/BasicLineChart'
import ChartsPage from '../Pages/Charts/ChartsPage'

const BodyLayout = ({ searchText }) => {
  const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  
    const userData = localStorage.getItem('userData') || sessionStorage.getItem('userData');
    setIsLoggedIn(!!userData);
  }, [location]);
  return (
    <Routes>
      <Route path='/' element={isLoggedIn ? <Navigate to="/all-products" /> : <Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/all-products' element={<Products searchText={searchText} offers={false} />} />
      <Route path='/offers' element={<Products searchText={searchText} offers={true} />} />
      <Route path='/product-detail' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/game' element={<SnakeGame/>} />
      <Route path='/chart' element={<ChartsPage />} />
    </Routes>
  )
}

export default BodyLayout