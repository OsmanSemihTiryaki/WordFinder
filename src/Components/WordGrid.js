import React, { useEffect, useRef } from "react";
import { Grid } from "@mui/material";
import { Box, Container } from "@mui/material";
import { useState } from "react";
import successSound from "../Audio/correctAnswer.mp3";
import failureSound from "../Audio/wrongAnswer.mp3";
import "../Styles/WordGrid.css";

const WordGrid = ({ letters, words, onWordFound, hint, soundEnabled }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const failureAudioRef = useRef(null);
  const successAudioRef = useRef(null);

  const playFailureEffect = () => {
    failureAudioRef.current.play();
  };

  const playSuccessEffect = () => {
    successAudioRef.current.play();
  };

  const gridItemStyle = (numCols) => {
    const widthPercent = `${100 / numCols}%`;
    return {
      width: widthPercent,
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  };

  const rowStyle = (numRows) => {
    const heightPercent = `${100 / numRows}%`;
    return {
      width: "100%",
      height: heightPercent,
      justifyContent: "center",
    };
  };

  const boxStyle = () => {
    return {
      height: "90%",
      width: "90%",
      background: "#ffffff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      border: "2px solid rgba(35,177,150,255)",
      borderRadius: "10px",
      color: "#000000",
      fontSize: "2vw",
      fontWeight: "bold",
      boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    };
  };

  const handleGridItemClick = (event, letter, rowIndex, colIndex) => {
    event.preventDefault();
    setSelectedLetters([{ letter, rowIndex, colIndex }]);
    event.target.style.background = "yellow";
  };

  const handleGridItemMouseEnter = (event, letter, rowIndex, colIndex) => {
    event.preventDefault();
    if (selectedLetters.length > 0) {
      const { rowIndex: prevRowIndex, colIndex: prevColIndex } =
        selectedLetters[selectedLetters.length - 1];
      if (rowIndex === prevRowIndex || colIndex === prevColIndex) {
        event.target.style.background = "yellow";
        setSelectedLetters([
          ...selectedLetters,
          { letter, rowIndex, colIndex },
        ]);
      }
    }
  };

  const handleMouseUp = (event) => {
    if (selectedLetters.length <= 1) {
      event.target.style.background = "white";
    } else {
      const selectedWord = selectedLetters.map(({ letter }) => letter).join("");
      if (words.includes(selectedWord)) {
        onWordFound(selectedWord);
        playSuccessEffect();
        selectedLetters.forEach(({ rowIndex, colIndex }) => {
          const gridItem = document.querySelector(
            `.grid-item-${rowIndex}-${colIndex}`
          );
          if (gridItem) {
            gridItem.style.background = "green";
            gridItem.classList.add("pulse"); // pulse animation
            setTimeout(() => {
              gridItem.classList.remove("pulse");
            }, 500);
          }
        });
      } else {
        playFailureEffect();
        selectedLetters.forEach(({ rowIndex, colIndex }) => {
          const gridItem = document.querySelector(
            `.grid-item-${rowIndex}-${colIndex}`
          );
          if (gridItem) {
            gridItem.style.background = "white";
            gridItem.classList.add("shake"); // shake animation
            setTimeout(() => {
              gridItem.classList.remove("shake");
            }, 500);
          }
        });
      }
    }
    setSelectedLetters([]);
  };

  useEffect(() => {
    if (hint) {
      const rowIndex = hint.startRow;
      const colIndex = hint.startCol;
      const gridItem = document.querySelector(
        `.grid-item-${rowIndex}-${colIndex}`
      );
      if (gridItem) {
        gridItem.style.background = "yellow";
      }
    }
  }, [hint]);

  useEffect(() => {
    if (!soundEnabled) {
      successAudioRef.current.muted = true;
      failureAudioRef.current.muted = true;
    } else {
      successAudioRef.current.muted = false;
      failureAudioRef.current.muted = false;
    }
  });

  return (
    <Grid
      container
      sx={{
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
      }}
    >
      <audio ref={failureAudioRef}>
        <source src={failureSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={successAudioRef}>
        <source src={successSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      {letters.map((row, rowIndex) => (
        <Grid container item key={rowIndex} sx={rowStyle(letters.length)}>
          {row.map((letter, colIndex) => (
            <Grid item key={colIndex} sx={gridItemStyle(row.length)}>
              <Box
                sx={boxStyle}
                onMouseDown={(event) =>
                  handleGridItemClick(event, letter, rowIndex, colIndex)
                }
                onMouseEnter={(event) =>
                  handleGridItemMouseEnter(event, letter, rowIndex, colIndex)
                }
                onMouseUp={(event) => handleMouseUp(event)}
                className={`grid-item-${rowIndex}-${colIndex}`} // Add a class with row and col index to dymaically reach this component
              >
                {letter}
              </Box>
            </Grid>
          ))}
        </Grid>
      ))}
    </Grid>
  );
};

export default WordGrid;
