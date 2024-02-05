import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SPOTIFY_LOGIN } from "./constants/routes";
import SpotifyLoginSuccess from "./spotify-login-success";
import Login from "./login";
import Playlists from "./home";
import Welcome from "./sign-up";
import { UserProvider } from "./user-context";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path={SPOTIFY_LOGIN} element={<SpotifyLoginSuccess />} />
          <Route path="sign-up" element={<Welcome />} />
          <Route path="/home" element={<Playlists />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
