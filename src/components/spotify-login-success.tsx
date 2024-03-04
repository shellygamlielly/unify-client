import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IUser } from "../@types/user";
import { useUser } from "../user-context";
import { getUser } from "../api/server";
import {
  SpotifyUserProfile,
  clientId,
  redirectUri,
} from "../constants/spotify";
import { fetchProfile, getToken } from "../api/spotify";

function SpotifyLoginSuccess() {
  const [spotifypProfile, setSpotifyProfile] =
    useState<SpotifyUserProfile | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const userContext = useUser();

  const navigate = useNavigate();
  useEffect(() => {
    async function startFetching() {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (code) {
        const accessToken = await getAccessToken(clientId, code);
        const spotifyProfile = await fetchProfile(accessToken);
        if (!spotifyProfile.error) {
          setSpotifyProfile(spotifyProfile);
          const userFromApi: IUser = {
            spotifyId: spotifyProfile?.id,
            spotifyAccessToken: accessToken,
            email: spotifyProfile?.email,
            profileImage: spotifyProfile?.images?.[1]?.url,
            displayName: spotifyProfile?.display_name,
          };

          userContext.setUser(userFromApi);

          // todo: use access token instead of user id
          try {
            const user = await getUser(spotifyProfile.id);
            userContext.setUserId(user.userId);
            navigate("/home");
          } catch (error) {
            navigate("/sign-up", {
              state: { spotifyProfile: spotifypProfile },
            });
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
  const result = await getToken(params);
  // The API uses code and verifier to verify our request and it returns an access token.
  const { access_token } = await result.json();
  return access_token;
}

export default SpotifyLoginSuccess;
