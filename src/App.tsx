import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { SPOTIFY_LOGIN } from "./constants/routes";
import SpotifyLoginSuccess from "./spotify-login-success";
import Login from "./login";
import Playlists from "./playlists";
import { UserIdProvider } from "./user-id-context";

function App() {
  return (
    <BrowserRouter>
      <UserIdProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path={SPOTIFY_LOGIN} element={<SpotifyLoginSuccess />} />
          <Route path="/playlist" element={<Playlists />} />
        </Routes>
      </UserIdProvider>
    </BrowserRouter>
  );
}

export default App;
