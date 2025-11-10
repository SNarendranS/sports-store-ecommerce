import { BrowserRouter, Routes } from "react-router-dom"
import { AppBarLayout } from "./Layouts/AppBarLayout"
import BodyLayout from "./Layouts/BodyLayout"
import FooterLayout from "./Layouts/FooterLayout"

import { useState } from "react"
import SecondaryBar from "./Pages/Products/SecondaryBar"

function App() {
  const [searchText, SetSearchText] = useState('')
  const isSmallScreen = window.innerWidth <= 600; // simple example

  return (
    <BrowserRouter>
      <AppBarLayout />

      <div style={{ margin: isSmallScreen ? '15%' : '12%' }}>
        <BodyLayout searchText={searchText} />
      </div>

      <FooterLayout />
    </BrowserRouter>

  )
}

export default App
