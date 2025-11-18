import React, { use, useState } from 'react';
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
import { setIsLoggedIn } from '../redux/loggedInSlice';
import { useDispatch } from 'react-redux';
import AuthService from '../Services/authService';

export const AppBarLayout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleNavigate = (item) => {
    const path = `/${item.split(' ').map((ele) => ele.toLowerCase()).join('-')}`;
    navigate(path);
    setDrawerOpen(false);
  };

  const handleLogout = async () => {
    const res = await AuthService.logout();
    if (res.status !== 200) {
      console.error('Logout failed:', res.data || res.message);
      return;
    }
    localStorage.removeItem('userData');
    sessionStorage.removeItem('userData');
    sessionStorage.removeItem('cartItems');
    sessionStorage.removeItem('favoriteItems');
    dispatch(setIsLoggedIn(false));
    navigate('/');
  };

  const isLoggedIn =
    // useSelector((state) => state.login.isLoggedIn)

    localStorage.getItem('userData') || sessionStorage.getItem('userData');

  const menu =   ['All Products', 'Offers', 'Profile'];

  // ['All Products', 'Offers', 'Profile', 'Mini Game'];

  const menuItems = isLoggedIn
    ? menu                      // logged in → show all
    : menu.filter(item => item !== 'Profile');  // not logged in → hide profile

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
          >
            <SportsSoccer
              onClick={() => setDrawerOpen(true)}
              sx={{
                fontSize: 28,
                color: 'white',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'rotate(-80deg)' },
              }}
            />
            <Typography
              variant="h6"
              onClick={() => navigate('/all-products')}

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
                  cursor="pointer"
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
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(180deg, #e3f2fd, #ffffff)',
            borderTopLeftRadius: 12,
            borderBottomLeftRadius: 12,
            p: 2,
          },
        }}
      >
        {/* Header */}
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <SportsSoccer sx={{ fontSize: 40, color: '#1565c0', mb: 1 }} />
          <Typography
            variant="h6"
            sx={{
              color: '#1565c0',
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Sports Store
          </Typography>
        </Box>

        <Divider sx={{ mb: 2 }} />

        {/* Menu Items */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item}
              button
              onClick={() => handleNavigate(item)}
              sx={{
                borderRadius: 2,
                mb: 1,
                cursor: 'pointer',
                px: 2,
                py: 1.2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(21,101,192,0.1)',
                  transform: 'translateX(5px)',
                },
              }}
            >
              <ListItemText
                primary={item}
                primaryTypographyProps={{
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: 'text.primary',
                }}
                sx={{ cursor: 'pointer' }}
              />
            </ListItem>
          ))}

          <Divider sx={{ my: 2 }} />

          {/* Login / Logout */}
          <ListItem
            button
            onClick={isLoggedIn ? handleLogout : () => handleNavigate('')}
            sx={{
              borderRadius: 2,
              cursor: 'pointer',
              px: 2,
              py: 1.2,
              fontWeight: 600,
              color: isLoggedIn ? 'error.main' : 'primary.main',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: isLoggedIn
                  ? 'rgba(244,67,54,0.1)'
                  : 'rgba(25,118,210,0.1)',
                transform: 'translateX(5px)',
              },
            }}
          >
            <ListItemText
              primary={isLoggedIn ? 'Logout' : 'Login'}
              primaryTypographyProps={{
                fontWeight: 600,
                fontSize: '1rem',
                textAlign: 'center',
              }}
              sx={{ cursor: 'pointer' }}
            />
          </ListItem>
        </List>
      </Drawer>

    </>
  );
};
