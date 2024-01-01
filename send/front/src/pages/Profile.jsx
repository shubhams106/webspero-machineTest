import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const { userId } = useParams();
  const token = localStorage.getItem("token");
  const user = useSelector((state) => state?.user);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileData({ ...profileData, profilepic: e.target.files[0] });
    }
  };

  useEffect(() => {
    setProfileData({
      ...profileData,
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
      phone: user?.phone,
      zipcode: user?.zipcode,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(profileData);
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.put(
        `/api/users/update/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };
  console.log(profileData);

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={12}>
          <Avatar
            sx={{ width: 150, height: 150 }}
            src={image || "https://via.placeholder.com/150"}
          />
          <Button component="label" variant="contained" sx={{ mt: 2 }}>
            Upload picture
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            value={profileData.password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="mobile"
            label="Mobile"
            name="mobile"
            value={profileData.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={profileData.phone}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="zipcode"
            label="Zipcode"
            name="zipcode"
            value={profileData.zipcode}
            onChange={handleChange}
          />
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography
              sx={{
                cursor: "pointer",
                marginTop: "3rem",
              }}
              onClick={() => navigate("/reset-password")}
            >
              Do you Want to change the password?
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Button
        type="submit"
        onClick={handleUpdateProfile}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save
      </Button>
    </DashboardLayout>
  );
};

export default Profile;
