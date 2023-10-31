import { Container, Box, Typography } from "@mui/material";
import React from "react";

const LeaderboardItem = ({ name, score, imageUrl }) => {
  return (
    <Container
      sx={{
        width: "100%",
        height: "200px",
        border: "2px solid red",
        borderRadius: "50px",
        boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
        background: "orange",
        margin: "auto",
        marginTop: "4vh",
      }}
    >
      <Box sx={{ height: "100%", display: "flex" }}>
        <Container
          disableGutters
          sx={{
            width: "50%",
            height: "100%",
            borderRadius: "100px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "50px",
            paddingBlock: "20px",
          }}
        >
          <img
            src={imageUrl}
            alt="profile"
            style={{
              width: "auto",
              height: "100%",
              objectFit: "contain",
            }}
          />
          <Typography variant="h3" sx={{ color: "whitesmoke" }}>
            {name}
          </Typography>
        </Container>

        <Container
          disableGutters
          sx={{
            width: "30%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h3" sx={{ color: "whitesmoke" }}>
            {score}
          </Typography>
        </Container>
      </Box>
    </Container>
  );
};

export default LeaderboardItem;
