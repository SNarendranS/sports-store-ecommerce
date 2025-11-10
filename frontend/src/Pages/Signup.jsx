import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  LockOutlined as LockOutlinedIcon,
  Email as EmailIcon,
  Visibility,
  VisibilityOff,
  Person as PersonIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/authService"; // adjust path

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "", // backend expects this key
      password: "",
      cPassword: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) errors.name = "Name is required";
      if (!values.email) errors.email = "Email is required";
      else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
        errors.email = "Invalid email address";
      if (!values.phoneNumber) errors.phoneNumber = "Phone number is required";
      else if (!/^\d{10}$/.test(values.phoneNumber))
        errors.phoneNumber = "Phone number must be 10 digits";
      if (!values.password) errors.password = "Password is required";
      else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
          values.password
        )
      )
        errors.password =
          "Password must be 8+ chars with upper, lower & special char";
      if (!values.cPassword) errors.cPassword = "Confirm your password";
      else if (values.password !== values.cPassword)
        errors.cPassword = "Passwords do not match";

      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          password: values.password,
        };

        const response = await AuthService.register(payload);
        const responseLogin = await AuthService.login({
          email: values.email,
          password: values.password,
          remember: values.remember
        });

        const token = responseLogin.data.token; // adjust if your backend returns { token, user }

        // Store in sessionStorage (deleted on browser close)
        sessionStorage.setItem("userData", token);
        navigate("/all-products");
        alert("Registration successful");

        // Optionally navigate to login or home page
        // navigate("/login");

        resetForm();
      } catch (error) {
        console.error("Registration failed:", error);
        alert(error?.response?.data || "Registration failed");
      } finally {
        setSubmitting(false);
      }
    },
  });


  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          mt: 8,
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

        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2, fontWeight: 600, textTransform: "uppercase" }}
        >
          Create Account
        </Typography>

        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{ width: "100%", mt: 1 }}
        >
          {/* Name */}
          <TextField
            margin="normal"
            fullWidth
            label="Full Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          {/* Email */}
          <TextField
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            type="email"
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

          {/* Phone */}
          <TextField
            margin="normal"
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            type="number"
            value={formik.values.phoneNumber}
            onChange={(e) => {
              // Prevent >10 digits
              if (e.target.value.length <= 10) formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Confirm Password */}
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            name="cPassword"
            type={showCPassword ? "text" : "password"}
            value={formik.values.cPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.cPassword && Boolean(formik.errors.cPassword)}
            helperText={formik.touched.cPassword && formik.errors.cPassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowCPassword(!showCPassword)}
                    edge="end"
                  >
                    {showCPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Sign Up Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "1rem",
            }}
          >
            Sign Up
          </Button>

          {/* Link to Login */}
          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/")}
            >
              Sign In
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
