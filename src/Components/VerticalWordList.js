import React from "react";
import "../Styles/VerticalWordList.css";
import { Box, Container } from "@mui/material";
import { Icon } from "@mui/material";
import { Check } from "@mui/icons-material";

const VerticalWordList = ({ allWords, foundWords }) => {
  return (
    <Container class="vertical-word-list" maxWidth="md">
      {allWords.map((word, index) => (
        <Box key={index} class="vertical-word-list-item">
          <Box sx={{ width: "50%", alignItems: "center" }}>
            <label
              style={{
                fontSize: "1vw",
                fontFamily: "serif",
                fontWeight: "bold",
              }}
            >
              {word}
            </label>
          </Box>
          <Container
            sx={{
              height: "100%",
              width: "50%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                visibility: foundWords.includes(word) ? "visible" : "hidden",
                width: "20%",
                height: "80%",
                background: "inherit",
                display: "flex",
                alignSelf: "center",
                justifyContent: "center",
              }}
            >
              <Icon sx={{ height: "100%" }}>
                <Check fontSize="medium" />
              </Icon>
            </Box>
          </Container>
        </Box>
      ))}
    </Container>
  );
};

export default VerticalWordList;
