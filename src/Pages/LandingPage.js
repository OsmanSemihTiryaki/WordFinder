import * as React from "react";
import { Box } from "@mui/material";
import { Container } from "@mui/material";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import logo from "../Images/logo.jpg";

const LandingPage = () => {
  let navigate = useNavigate();
  var text1 = "Word Search";

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          width: "90%",
          display: "flex",
          flexDirection: "column-reverse",
          justifyContent: "center",
          margin: "0 auto",
          marginTop: "2.5rem",
        }}
      >
        <Container disableGutters sx={{ height: "80%", width: "50%" }}>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            ></img>
          </Box>
        </Container>
        <Container sx={{ height: "80%", width: "50%" }}>
          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" component="div" mb="15px">
              {text1}
            </Typography>
            <br />

            <Container
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#3DB4FC",
                  color: "#F2F3F4",
                  width: "160px",
                  height: "64px",
                }}
                onClick={() => navigate("/gameRoom")}
              >
                Play the Game
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  backgroundColor: "#3DB4FC",
                  color: "#F2F3F4",
                  width: "160px",
                  height: "64px",
                }}
                onClick={() => navigate("/leaderboard")}
              >
                LeaderBoard
              </Button>
            </Container>
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default LandingPage;
