import * as React from "react";
import WordGrid from "../Components/WordGrid";
import VerticalWordList from "../Components/VerticalWordList";
import { Box, Container, Icon, Slide, Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import "../Styles/GameRoomPage.css";
import CountdownTimer from "../Components/CountDownTimer";
import { useState, useEffect } from "react";
import Star from "../Images/star.jpg";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import IconButton from "@mui/material/IconButton";
import Slideshow from "@mui/icons-material/Slideshow";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useFetcher, useNavigate } from "react-router-dom";
import gameOverSound from "../Audio/gameOver.mp3";
import levelSuccessFulSound from "../Audio/levelSuccessful.mp3";
import { useRef } from "react";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const GameRoomPage = () => {
  let navigate = useNavigate();
  const letters = [
    ["G", "O", "L", "F", "K", "Q", "I", "Y", "U", "B", "E", "J"],
    ["P", "O", "O", "L", "E", "A", "T", "U", "Z", "Z", "U", "B"],
    ["J", "U", "N", "E", "D", "H", "J", "I", "Y", "A", "R", "W"],
    ["S", "W", "I", "M", "Y", "F", "Z", "N", "E", "M", "L", "T"],
    ["D", "E", "C", "K", "O", "K", "L", "D", "E", "C", "K", "A"],
    ["E", "A", "S", "E", "S", "L", "X", "O", "S", "N", "V", "E"],
    ["L", "A", "Z", "Y", "M", "E", "I", "G", "G", "W", "Y", "H"],
  ];

  const wordHints = [
    {
      word: "GOLF",
      startRow: 0,
      startCol: 0,
    },
    {
      word: "POOL",
      startRow: 1,
      startCol: 0,
    },
    {
      word: "JUNE",
      startRow: 2,
      startCol: 0,
    },
    {
      word: "SWIM",
      startRow: 3,
      startCol: 0,
    },
    {
      word: "DECK",
      startRow: 4,
      startCol: 0,
    },
    {
      word: "HEAT",
      startRow: 6,
      startCol: 11,
    },
    {
      word: "EASE",
      startRow: 5,
      startCol: 0,
    },
    {
      word: "LAZY",
      startRow: 6,
      startCol: 0,
    },
  ];

  const words = [
    "GOLF",
    "POOL",
    "JUNE",
    "SWIM",
    "DECK",
    "HEAT",
    "EASE",
    "LAZY",
  ];

  const gameOverAudioRef = useRef(null);
  const levelSuccessfulRef = useRef(null);

  const initialTime = 300;
  const timeLostInterval = 10; // 10 seconds interval for point deduction
  const pointLossAmount = 100; // Amount to deduct for each 10 seconds

  const [remainingTime, setRemainingTime] = useState(initialTime);
  const [score, setScore] = useState(
    (initialTime * pointLossAmount) / timeLostInterval
  );
  const [foundWords, setFoundWords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [gameOverModal, setGameOverModal] = useState(false);
  const [pauseModal, setPauseModal] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [hint, setHint] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playGameOverEffect = () => {
    gameOverAudioRef.current.play();
  };

  const playLevelSuccessfulEffect = () => {
    levelSuccessfulRef.current.play();
  };

  const handleTimeUpdate = (newTime) => {
    setRemainingTime(newTime);
    const lostPoints =
      Math.floor((initialTime - newTime) / timeLostInterval) * pointLossAmount;
    const newScore = initialTime * 10 - lostPoints;
    setScore(newScore);
  };

  const handleWordFound = (word) => {
    setFoundWords([...foundWords, word]);
  };

  const handleMainPage = () => {
    navigate("/");
  };

  const handleLeaderboard = () => {
    navigate("/leaderboard");
  };

  useEffect(() => {
    const allWordsFound =
      foundWords.length === words.length &&
      words.every((word) => foundWords.includes(word));
    if (allWordsFound) {
      setShowModal(true);
      setTimerRunning(false);
      playLevelSuccessfulEffect();
    }
  }, [foundWords, words]);

  useEffect(() => {
    const timeUp = remainingTime === 0;
    if (timeUp) {
      setGameOverModal(true);
      playGameOverEffect();
    }
  });

  const handlePauseClick = () => {
    setPauseModal(true);
    setTimerRunning(false);
  };

  const handleContinueClick = () => {
    setPauseModal(false);
    setTimerRunning(true);
  };

  const handleHint = () => {
    const notFoundHints = wordHints.filter(
      (hint) => !foundWords.includes(hint.word)
    );
    const randomIndex = Math.floor(Math.random() * notFoundHints.length);
    const selectedHint = notFoundHints[randomIndex];
    setHint(selectedHint);
  };

  const toggleSound = () => {
    if (soundEnabled) {
      // If sound is enabled, mute it
      gameOverAudioRef.current.muted = true;
      levelSuccessfulRef.current.muted = true;
    } else {
      // If sound is disabled, unmute it
      gameOverAudioRef.current.muted = false;
      levelSuccessfulRef.current.muted = false;
    }
    // Toggle the soundEnabled state
    setSoundEnabled(!soundEnabled);
  };

  const isDesktop = useMediaQuery("(min-height:600px)");
  const rootContainerClass = isDesktop
    ? "root-container-wide"
    : "root-container";

  return (
    <div>
      {isDesktop && <Navbar />}
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        sx={{ borderRadius: "100px" }}
      >
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #000",
          }}
        >
          <Container
            sx={{
              display: "flex",
              width: "100%",
              height: "50%",
              background: "rgb(246, 246, 122)",
              flexDirection: "column",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <Typography variant="h2">Congratulations</Typography>
            <Typography variant="body1">You found all the words!</Typography>
          </Container>
          <Container
            sx={{
              display: "flex",
              width: "100%",
              height: "50%",
              background: "rgb(246, 246, 122)",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "50px",
            }}
          >
            <Typography variant="body1">
              Remaining Time: {remainingTime}
            </Typography>
            <Typography variant="body1">Score: {score}</Typography>
          </Container>
          <Container
            sx={{
              background: "rgb(246, 246, 122)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ width: "100%", display: "flex" }}>
              Found Words in Order
            </Typography>
            <div>
              {foundWords.map((word, index) => (
                <Typography
                  key={index}
                  variant="body1"
                  sx={{ color: "darkgreen", fontWeight: "bold" }}
                >
                  {word}
                </Typography>
              ))}
            </div>
          </Container>

          <Button
            variant="primary"
            onClick={handleMainPage}
            sx={{ background: "darkblue", width: "50%", color: "whitesmoke" }}
          >
            Main Page
          </Button>
          <Button
            variant="primary"
            onClick={handleLeaderboard}
            sx={{ background: "darkblue", width: "50%", color: "whitesmoke" }}
          >
            Leaderboard
          </Button>
        </Paper>
      </Modal>
      <audio ref={gameOverAudioRef}>
        <source src={gameOverSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={levelSuccessfulRef}>
        <source src={levelSuccessFulSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Modal
        open={gameOverModal}
        onClose={() => setGameOverModal(false)}
        sx={{ borderRadius: "100px" }}
      >
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #000",
          }}
        >
          <Container
            sx={{
              display: "flex",
              width: "100%",
              height: "50%",
              background: "rgb(246, 246, 122)",
              flexDirection: "column",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <Typography variant="h2">Game Over</Typography>
            <Typography variant="body1">Time is up!</Typography>
          </Container>
          <Container
            sx={{
              background: "rgb(246, 246, 122)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <Typography variant="h6" sx={{ width: "100%", display: "flex" }}>
              Found Words in Order
            </Typography>
            <div>
              {foundWords.length === 0 ? (
                <Typography variant="body1" sx={{ color: "darkblue" }}>
                  You could not find any words.
                </Typography>
              ) : (
                foundWords.map((word, index) => (
                  <Typography
                    key={index}
                    variant="body1"
                    sx={{ color: "darkgreen", fontWeight: "bold" }}
                  >
                    {word}
                  </Typography>
                ))
              )}
            </div>
          </Container>

          <Button
            variant="primary"
            onClick={handleMainPage}
            sx={{ background: "darkblue", width: "50%", color: "whitesmoke" }}
          >
            Main Page
          </Button>
          <Button
            variant="primary"
            onClick={handleLeaderboard}
            sx={{ background: "darkblue", width: "50%", color: "whitesmoke" }}
          >
            Leaderboard
          </Button>
        </Paper>
      </Modal>
      <Modal
        open={pauseModal}
        onClose={() => setPauseModal(false)}
        sx={{ borderRadius: "100px" }}
      >
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #000",
          }}
        >
          <Container
            sx={{
              display: "flex",
              width: "100%",
              height: "50%",
              background: "rgb(246, 246, 122)",
              flexDirection: "column",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <Typography variant="h2">Game Paused</Typography>
            <Typography variant="h4" sx={{ margin: "20px" }}>
              Rules
            </Typography>
            <Container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="body">
                - All words you see on the right are hidden in the puzzle
                somewhere
              </Typography>
              <Typography variant="body">
                - You must find them before the timer runs out.
              </Typography>
              <Typography variant="body">
                - When you found one, click and hover over the word
              </Typography>
              <Typography variant="body">
                - Remember, letters must live side by side, so there are no
                diagonal words here
              </Typography>
            </Container>
          </Container>

          <Button
            variant="primary"
            onClick={handleMainPage}
            sx={{ background: "darkblue", width: "50%", color: "whitesmoke" }}
          >
            Main Page
          </Button>
          <Button
            variant="primary"
            onClick={handleContinueClick}
            sx={{ background: "darkblue", width: "50%", color: "whitesmoke" }}
          >
            Continue
          </Button>
        </Paper>
      </Modal>

      <Box className={rootContainerClass}>
        <Container
          sx={{
            textAlign: "center",
            width: "100%",
            height: "10%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "2px solid #000",
            borderRadius: "10px",
            marginBottom: "2vh",
            marginTop: "2vh",
            color: "rgba(35,177,150,255)",
          }}
        >
          <h1>Word Search Summer</h1>
        </Container>
        <Container
          class="game-room-container"
          sx={{
            backgroundImage: `url('../Images/background.jpg')`,
            backgroundSize: "cover",
          }}
        >
          <Container disableGutters class="word-grid-and-list-container">
            <Container class="word-grid-container">
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  border: "2px solid #000",
                  borderRadius: "10px",
                  background: "rgba(0,0,0, 0.7)",
                }}
              >
                <WordGrid
                  letters={letters}
                  words={words}
                  onWordFound={handleWordFound}
                  hint={hint}
                  soundEnabled={soundEnabled}
                />
              </Box>
            </Container>
            <Container class="vertical-word-list-container">
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: "100%",
                  width: "100%",
                  background: "rgba(0,0,0, 0.7)",
                  border: "2px solid #000",
                  borderRadius: "10px",
                }}
              >
                <VerticalWordList allWords={words} foundWords={foundWords} />
              </Box>
            </Container>
          </Container>
          <Container class="score-container">
            <Container
              sx={{
                width: "35%",
                height: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Container
                sx={{
                  width: "100%",
                  height: "50%",
                  backgroundColor: "inherit",
                  display: "flex",
                }}
              >
                <Container
                  sx={{
                    width: "40%",
                    height: "100%",
                    backgroundColor: "orange",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "10px",
                  }}
                >
                  <CountdownTimer
                    initialTime={initialTime}
                    onTimeUpdate={handleTimeUpdate}
                    timerRunning={timerRunning}
                  />
                </Container>
                <Container
                  sx={{
                    width: "40%",
                    height: "100%",
                    backgroundColor: "orange",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "10px",
                  }}
                >
                  <Container
                    disableGutters
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      color: "darkblue",
                      fontSize: "auto",
                      width: "100%",
                    }}
                  >
                    {score}
                    <Box>
                      <Icon>
                        <EmojiEventsIcon />
                      </Icon>
                    </Box>
                  </Container>
                </Container>
              </Container>
            </Container>
            <Box
              sx={{
                width: "0.5%",
                borderRight: "2px solid #000",
                borderLeft: "2px solid #000",
                height: "100%",
                borderRadius: "10px",
                background: "orange",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            ></Box>
            <Container
              sx={{ width: "7%", height: "100%", borderRadius: "10px" }}
            >
              <Container disableGutters sx={{ width: "30%" }}></Container>
            </Container>
            <Box
              sx={{
                width: "0.5%",
                borderRight: "2px solid #000",
                borderLeft: "2px solid #000",
                height: "100%",
                borderRadius: "10px",
                background: "orange",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            ></Box>
            <Container
              sx={{
                width: "9%",
                height: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Container
                disableGutters
                sx={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <img
                  src={Star}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                ></img>
              </Container>
            </Container>
            <Box
              sx={{
                width: "0.5%",
                borderRight: "2px solid #000",
                borderLeft: "2px solid #000",
                height: "100%",
                borderRadius: "10px",
                background: "orange",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            ></Box>
            <Container
              sx={{ width: "7%", height: "100%", borderRadius: "10px" }}
            ></Container>
            <Box
              sx={{
                width: "0.5%",
                borderRight: "2px solid #000",
                borderLeft: "2px solid #000",
                height: "100%",
                borderRadius: "10px",
                background: "orange",
                boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              }}
            ></Box>
            <Container
              sx={{
                width: "40%",
                height: "100%",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Container
                sx={{
                  width: "40%",
                  height: "50%",
                  backgroundColor: "inherit",
                  display: "flex",
                }}
              >
                <Container
                  disableGutters
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "orange",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton sx={{ color: "darkblue" }} onClick={handleHint}>
                    <Slideshow />

                    <Typography
                      variant="body1"
                      sx={{ color: "darkblue", alignSelf: "center" }}
                    >
                      HINT
                    </Typography>
                  </IconButton>
                </Container>
              </Container>
              <Container
                sx={{
                  width: "30%",
                  height: "50%",
                  backgroundColor: "inherit",
                  display: "flex",
                }}
              >
                <Container
                  disableGutters
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "orange",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton onClick={toggleSound} sx={{ color: "darkblue" }}>
                    <MusicNoteIcon />
                  </IconButton>
                </Container>
              </Container>
              <Container
                sx={{
                  width: "30%",
                  height: "50%",
                  backgroundColor: "inherit",
                  display: "flex",
                }}
              >
                <Container
                  disableGutters
                  sx={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "orange",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <IconButton
                    onClick={handlePauseClick}
                    sx={{ color: "darkblue" }}
                  >
                    <PauseCircleOutlineIcon />
                  </IconButton>
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Box>
    </div>
  );
};

export default GameRoomPage;
