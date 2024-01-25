import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import { SPOTIFY_LOGIN } from "./constants/routes";
import SpotifyLoginSuccess from "./SpotifyLoginSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path={SPOTIFY_LOGIN} element={<SpotifyLoginSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
