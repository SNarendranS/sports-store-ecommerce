import React, { use, useRef } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Link,
  Paper,
  TextField,
  Typography,
  InputAdornment,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailIcon from "@mui/icons-material/Email";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/authService"; // make sure path is correct
import { useDispatch } from "react-redux";
import { setIsLoggedIn } from "../redux/loggedInSlice";

export default function LoginFormik() {
  const navigate = useNavigate();
  const loginButton = useRef(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) errors.email = "Email is required";
      else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      )
        errors.email = "Invalid email address";

      if (!values.password) errors.password = "Password is required";
      return errors;
    },
    onSubmit: async (values) => {
      try {
        // Call backend login
        loginButton.current.disabled = true; // Disable button to prevent multiple clicks
        loginButton.current.innerText = "Logging in...";

        const response = await AuthService.login({
          email: values.email,
          password: values.password,
          remember: values.remember
        });

        const token = response.data.token; // adjust if your backend returns { token, user }

        if (values.remember) {
          // Store in localStorage (persistent)
          localStorage.setItem("userData", token);
        } else {
          // Store in sessionStorage (deleted on browser close)
          sessionStorage.setItem("userData", token);
        }
        dispatch(setIsLoggedIn(true));

        navigate("/all-products");
      } catch (err) {
        loginButton.current.disabled = false; // Re-enable button on error
        loginButton.current.innerText = "Login";

        console.error("Login failed:", err);
        alert(
          err.response?.data?.message || "Login failed. Please check credentials."
        );
      }
    },
  });


  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
          mb: 2,
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 3,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Welcome Back
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1, width: "100%" }}
        >
          <TextField
            fullWidth
            margin="normal"
            label="Email Address"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                color="primary"
                checked={formik.values.remember}
                onChange={formik.handleChange}
              />
            }
            label="Remember me"
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            ref={loginButton}
            sx={{
              mt: 2,
              mb: 2,
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center">
            Don’t have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}