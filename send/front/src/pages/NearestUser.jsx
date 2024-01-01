import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import DashboardLayout from "../layouts/DashboardLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NearestUser() {
  const [nearestUsers, setNearestUsers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchNearbyUSers();
  }, []);

  const fetchNearbyUSers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/getNearest?latitude=48.8566&&longitude=2.3522"
      );
      if (response) {
        console.log(response);
        setNearestUsers(response?.data?.nearestUser);
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <DashboardLayout>
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Nearest User List
        </Typography>
        <List>
          {nearestUsers?.length
            ? nearestUsers?.map((user) => (
                <ListItem key={user?.id} alignItems="flex-start">
                  <Avatar
                    alt={user?.name}
                    src={`http://localhost:5000/uploads/${user.profilepic}`}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />

                  <ListItemText
                    primary={user?.name}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Email: {user?.email}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color="textPrimary"
                        >
                          Zipcode: {user?.zipcode}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))
            : null}
        </List>
      </Container>
    </DashboardLayout>
  );
}

export default NearestUser;
