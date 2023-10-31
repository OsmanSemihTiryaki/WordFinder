import React, { useState, useEffect } from "react";
import { Timer } from "@mui/icons-material";
import { Container, Icon, Box } from "@mui/material";

function CountdownTimer({ initialTime, onTimeUpdate, timerRunning }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const timer = setInterval(() => {
      if (timerRunning) {
        if (time > 0) {
          setTime(time - 1);
          onTimeUpdate(time - 1); // Notify the parent component of the time update
        } else {
          clearInterval(timer);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [time, onTimeUpdate]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  return (
    <Container
      disableGutters
      sx={{
        borderRadius: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "darkblue",
        fontSize: "auto",
      }}
    >
      {formattedTime}
      <Box>
        <Icon>
          <Timer />
        </Icon>
      </Box>
    </Container>
  );
}

export default CountdownTimer;
