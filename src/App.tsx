import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SPOTIFY_LOGIN } from "./constants/routes";
import SpotifyLoginSuccess from "./components/spotify-login-success";
import Login from "./components/login";
import Home from "./components/home";
import Welcome from "./components/sign-up";
import { UserProvider } from "./user-context";
import Playlist from "./components/playlist";
import SearchSong from "./components/search-song";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={SPOTIFY_LOGIN} element={<SpotifyLoginSuccess />} />
          <Route path="sign-up" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
