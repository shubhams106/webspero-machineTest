import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const defaultTheme = createTheme();

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({});
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/nearest-users");
    }
  }, [token]);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserInfo((prev) => ({
              ...prev,
              location: {
                type: "Point",
                coordinates: [latitude, longitude],
              },
            }));
          },
          (error) => {
            setLocation({
              latitude: null,
              longitude: null,
              error: error.message,
            });
          }
        );
      } else {
        setLocation({
          latitude: null,
          longitude: null,
          error: "Geolocation is not supported by this browser.",
        });
      }
    };

    fetchLocation();
  }, []);
  const registerUser = async () => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      Object.entries(userInfo).forEach(([key, value]) => {
        if (key == "location") {
          formData.append("location", JSON.stringify(userInfo.location));
        } else formData.append(key, value);
      });

      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response?.status === 201) {
        toast.success("Registered sucessfully");
        console.log(response, "resssss");
        localStorage.setItem("token", response?.data?.userInfo?.token);
        localStorage.setItem("userId", response?.data?.userInfo?._doc?._id);
        dispatch(setUser(response?.data?.userInfo?._doc));
        setTimeout(() => {
          navigate("/nearest-users");
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with a non-2xx status code
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made, but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      toast.error("Something went wrong");
      console.log(error.config);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setUserInfo((prev) => ({
        ...prev,
        profilepic: e.target.files[0],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e?.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="phone"
                  label="Phone"
                  name="phone"
                  autoComplete="tel"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  name="mobile"
                  autoComplete="tel"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  name="zipcode"
                  autoComplete="postal-code"
                />
              </Grid>

              <Grid item xs={12}>
                <input
                  accept="image/*"
                  id="profile-pic"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="profile-pic">
                  <Button
                    variant="contained"
                    component="span"
                    disabled={isSubmitting}
                  >
                    Upload Profile Pic
                  </Button>
                </label>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up... Please wait" : "Sign Up"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography
                  sx={{
                    cursor: "pointer",
                    marginBottom: "20rem",
                  }}
                  onClick={() => navigate("/login")}
                >
                  Already have an account? Sign in
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
