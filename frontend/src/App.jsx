import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBarLayout } from "./Layouts/AppBarLayout";
import BodyLayout from "./Layouts/BodyLayout";
import FooterLayout from "./Layouts/FooterLayout";

import { useState } from "react";
import SecondaryBar from "./Layouts/SecondaryBar";
import { Container, useMediaQuery } from "@mui/material";

function App() {
  const [searchText, SetSearchText] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <BrowserRouter>
      {/* Top App Bar */}
      <AppBarLayout />

      {/* Secondary Bar (Products search / categories / icons) */}
      <SecondaryBar />

      {/* Main content */}
      <Container sx={{ mt: isMobile ? 24 : 20 }}> 
        {/* Adjust margin top so content isn't hidden under AppBars */}
        <BodyLayout searchText={searchText} />
      </Container>

      {/* Footer */}
      <FooterLayout />

    </BrowserRouter>
  );
}

export default App;
