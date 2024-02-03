import { useEffect, useState } from "react";
import { SpotifyUserProfile, clientId, redirectUri } from "./constants/spotify";
import Welcome from "./Welcome";
import { TunintyProfile } from "./constants/tunity-profile";
import { CircularProgress } from "@mui/material";
import Playlists from "./playlists";
import axios from "axios";

function SpotifyLoginSuccess() {
  const [spotifypProfile, setSpotifyProfile] =
    useState<SpotifyUserProfile | null>(null);
  const [tunityProfile, setTunityProfile] = useState<TunintyProfile | null>(
    null,
  );
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    async function startFetching() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (code) {
        const accessToken = await getAccessToken(clientId, code);
        const result = await fetchProfile(accessToken);
        if (!result.error) {
          setSpotifyProfile(result);
          // todo: use access token instead of user id
          const user = await getUser(result.id);
          if (user) {
            setTunityProfile(user);
          }
          setDone(true);
        }
      } else {
        //todo: show user the error
        console.log("code is null");
      }
    }
    startFetching();
  }, []);

  if (!done) {
    return <CircularProgress />;
  }
  if (!spotifypProfile) {
    return <>Login to spotify failed - please try again</>;
  }
  if (!tunityProfile) {
    return <Welcome profile={spotifypProfile} />;
  }
  return <Playlists spotifyId={spotifypProfile.id} />;
}

async function getAccessToken(clientId: string, code: string): Promise<string> {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier!);
  // Use the code returned from the callback and the verifier to perform a POST to the Spotify token API.
  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });
  // The API uses code and verifier to verify our request and it returns an access token.
  const { access_token } = await result.json();
  return access_token;
}

// Call the Web API and get the profile data
async function fetchProfile(token: string): Promise<any> {
  const result = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  const json = await result.json();
  console.log(json);
  return json;
}

async function getUser(spotifyId: string) {
  try {
    return (await axios.get(`http://localhost:3000/user/spotify/${spotifyId}`))
      .data;
  } catch (e) {
    return null;
  }
}

export default SpotifyLoginSuccess;
