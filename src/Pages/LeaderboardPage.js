import * as React from "react";
import Navbar from "../Components/Navbar";
import Box from "@mui/material/Box";
import { Container, Typography } from "@mui/material";
import LeaderboardItem from "../Components/LeaderboardItem";
import GilgameshIcon from "../Images/gilgamesh.jpg";
import AlexanderIcon from "../Images/alexander.jpg";
import HammurabiIcon from "../Images/hammurabi.jpg";
import TomyrisIcon from "../Images/tomyris.jpg";

const LeaderBoardPage = () => {
  const leaders = [
    {
      name: "Hammurabi",
      score: 4800,
      imageUrl: HammurabiIcon,
    },
    {
      name: "GilgaBro",
      score: 3600,
      imageUrl: GilgameshIcon,
    },
    {
      name: "Alexander",
      score: 2500,
      imageUrl: AlexanderIcon,
    },
    {
      name: "Tomyris",
      score: 2000,
      imageUrl: TomyrisIcon,
    },
  ];
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "column" },
          justifyContent: "center",
          margin: "0 auto",
          marginTop: "2.5rem",
        }}
      >
        <Container
          maxWidth="lg"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h1">LeaderBoard</Typography>
        </Container>

        {leaders.map((leader, index) => (
          <LeaderboardItem
            key={index}
            imageUrl={leader.imageUrl}
            name={leader.name}
            score={leader.score}
          />
        ))}
      </Box>
    </div>
  );
};

export default LeaderBoardPage;
