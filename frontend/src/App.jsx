import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppBarLayout } from "./Layouts/AppBarLayout";
import BodyLayout from "./Layouts/BodyLayout";
import FooterLayout from "./Layouts/FooterLayout";

import { useState } from "react";
import SecondaryBar from "./Layouts/SecondaryBar";
import { Container, useMediaQuery } from "@mui/material";
import AppInitializer from "./Utils/AppInitializer";

function App() {
  const [searchText, SetSearchText] = useState('');
  const isMobile = useMediaQuery('(max-width:768px)');

  return (
    <>
      <AppInitializer />
      <BrowserRouter>
        <AppBarLayout />
        <SecondaryBar />
        <Container sx={{ mt: isMobile ? 24 : 20 }}>
          <BodyLayout searchText={searchText} />
        </Container>
        <FooterLayout />
      </BrowserRouter>
    </>

  );
}

export default App;
