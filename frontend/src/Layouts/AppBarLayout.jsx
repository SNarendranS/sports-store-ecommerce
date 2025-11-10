import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { SportsSoccer, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const AppBarLayout = () => {
  const menuItems = ['All Products', 'Offers', 'profile'];
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = (item) => {
    const path = `/${item.split(' ').map((ele) => ele.toLowerCase()).join('-')}`;
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    navigate('/');
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: 'linear-gradient(90deg, #0d47a1, #0b7becff)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        }}
      >
        <Toolbar>
          {/* Logo and Title */}
          <SportsSoccer sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              letterSpacing: 0.5,
              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            Sports Store
          </Typography>

          {/* Desktop Menu */}
          {!isMobile && (
            <Box>
              {
                menuItems.map((item) => (
                  <Button
                    key={item}
                    color="inherit"
                    onClick={() => handleNavigate(item)}
                    sx={{
                      mx: 1,
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': { color: '#ffeb3b' },
                    }}
                  >
                    {item}
                  </Button>
                ))}
              {(localStorage.getItem('userData') || sessionStorage.getItem('userData')) ?

                <Button
                  color="inherit"
                  onClick={() => handleLogout()}
                  sx={{
                    mx: 1,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': { color: '#ffeb3b' },
                  }}
                >
                  Logout
                </Button>
                :
                <Button
                  color="inherit"
                  onClick={() => handleNavigate('')}
                  sx={{
                    mx: 1,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': { color: '#ffeb3b' },
                  }}
                >
                  Login
                </Button>

              }
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box
          sx={{ width: 240, p: 2, backgroundColor: '#f5f5f5', height: '100%' }}
          role="presentation"
        >
          <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 600 }}>
            Menu
          </Typography>
          <List>
            {
              menuItems.map((item) => (
                <ListItem button key={item} onClick={() => handleNavigate(item.toString())}>
                  <ListItemText primary={item} />
                </ListItem>
              ))}
            {(localStorage.getItem('userData') || sessionStorage.getItem('userData')) ?
              <ListItem button onClick={() => handleLogout()}>
                <ListItemText primary="Logout" />
              </ListItem>
              :
              <ListItem button onClick={() => handleNavigate('')}>
                <ListItemText primary="Login" />
              </ListItem>

            }
          </List>
        </Box>
      </Drawer>
    </>
  );
};
