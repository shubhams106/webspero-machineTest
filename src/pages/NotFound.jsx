import React from "react";
import { Typography, Container, Box } from "@mui/material";
function NotFound() {
  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h1" color="error">
          404
        </Typography>
        <Typography variant="h5" color="textSecondary">
          Not Found
        </Typography>
      </Box>
    </Container>
  );
}

export default NotFound;
