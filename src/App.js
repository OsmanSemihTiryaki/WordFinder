import logo from './logo.svg';
import './App.css';
import LandingPage from './Pages/LandingPage';
import GameRoomPage from './Pages/GameRoomPage';
import LeaderBoardPage from './Pages/LeaderboardPage';
import {Routes, Route, BrowserRouter} from 'react-router-dom';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<LandingPage/>}/>
        <Route path = "/gameRoom" element={<GameRoomPage/>}/>
        <Route path = "/leaderboard" element={<LeaderBoardPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
