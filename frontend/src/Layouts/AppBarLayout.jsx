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
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SportsSoccer, Menu } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const AppBarLayout = () => {
  const menuItems = ['All Products', 'Offers', 'Profile'];
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

  const isLoggedIn =
    localStorage.getItem('userData') || sessionStorage.getItem('userData');

  return (
    <>
      <AppBar
        position="fixed"
        elevation={6}
        sx={{
          background: 'linear-gradient(90deg, #1565c0 0%, #00b0ff 100%)',
          boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
        }}
      >
        <Toolbar
  sx={{
    py: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }}
>
  {/* Left: Logo + Title */}
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 1,
      cursor: 'pointer',
    }}
    onClick={() => navigate('/')}
  >
    <SportsSoccer
      sx={{
        fontSize: 28,
        color: 'white',
        transition: 'transform 0.3s ease',
        '&:hover': { transform: 'rotate(20deg)' },
      }}
    />
    <Typography
      variant="h6"
      sx={{
        fontWeight: 700,
        letterSpacing: 0.5,
        color: 'white',
        textShadow: '0 2px 6px rgba(0,0,0,0.2)',
        fontSize: { xs: '1rem', sm: '1.1rem' },
      }}
    >
      Sports Store
    </Typography>
  </Box>

  {/* Right: Desktop Menu or Hamburger */}
  {!isMobile ? (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {menuItems.map((item) => (
        <Button
          key={item}
          color="inherit"
          onClick={() => handleNavigate(item)}
          sx={{
            mx: 1.2,
            textTransform: 'none',
            fontWeight: 500,
            fontSize: '1rem',
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              width: 0,
              height: 2,
              bottom: -4,
              left: 0,
              backgroundColor: '#ffeb3b',
              transition: 'width 0.3s ease',
            },
            '&:hover:after': {
              width: '100%',
            },
            '&:hover': { color: '#ffeb3b' },
          }}
        >
          {item}
        </Button>
      ))}

      <Button
        color="inherit"
        onClick={isLoggedIn ? handleLogout : () => handleNavigate('')}
        sx={{
          mx: 1.2,
          textTransform: 'none',
          fontWeight: 600,
          border: '1px solid rgba(255,255,255,0.4)',
          px: 2.5,
          borderRadius: '20px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#ffeb3b',
            color: '#0d47a1',
            borderColor: '#ffeb3b',
          },
        }}
      >
        {isLoggedIn ? 'Logout' : 'Login'}
      </Button>
    </Box>
  ) : (
    <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
      <Menu sx={{ fontSize: 28 }} />
    </IconButton>
  )}
</Toolbar>

      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: 'linear-gradient(180deg, #e3f2fd, #ffffff)',
          },
        }}
      >
        <Box sx={{ p: 2, mt: 2 }}>
          <Typography
            variant="h6"
            sx={{
              color: '#1565c0',
              fontWeight: 700,
              mb: 1,
              textAlign: 'center',
            }}
          >
            Sports Store
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item}
                onClick={() => handleNavigate(item)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  transition: '0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(21,101,192,0.1)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemText
                  primary={item}
                  primaryTypographyProps={{
                    fontWeight: 500,
                    color: 'text.primary',
                  }}
                />
              </ListItem>
            ))}

            <Divider sx={{ my: 1.5 }} />

            <ListItem
              button
              onClick={isLoggedIn ? handleLogout : () => handleNavigate('')}
              sx={{
                borderRadius: 2,
                color: isLoggedIn ? 'error.main' : 'primary.main',
                '&:hover': {
                  backgroundColor: isLoggedIn
                    ? 'rgba(244,67,54,0.1)'
                    : 'rgba(25,118,210,0.1)',
                },
              }}
            >
              <ListItemText
                primary={isLoggedIn ? 'Logout' : 'Login'}
                primaryTypographyProps={{
                  fontWeight: 600,
                }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};
