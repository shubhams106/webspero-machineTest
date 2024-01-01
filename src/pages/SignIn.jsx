import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid } from "@mui/material";
import { setUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";

const defaultTheme = createTheme();

export default function SignIn() {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/nearest-users");
    }
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSubmitting(true);

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        userInfo
      );
      if (response) {
        toast.success("login sucessfully");
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("userId", response?.data?._doc?._id);
        dispatch(setUser(response?.data?._doc));
        navigate("/nearest-users");
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid username or password");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e?.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing In... Please wait" : "Sign In"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  sx={{
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/register")}
                >
                  Don't have an account? Register now
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
