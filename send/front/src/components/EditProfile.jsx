import React, { useState } from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    role: "",
    country: "",
    timezone: "",
    lastName: "",
    email: "",
  });
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileData({ ...profileData, profilepic: e.target.files[0] });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Profile
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
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
      </Grid>
      <Button
        type="submit"
        // onClick={handleUpdateProfile}
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Save from edit proooo
      </Button>
    </Box>
  );
};

export default EditProfile;
