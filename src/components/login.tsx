import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { clientId, redirectUri } from "../constants/spotify";
import image from "/Chuchu.jpeg";
import {
  StyledButton,
  StyledCard,
  StyledCardContent,
  StyledTypography,
} from "./styles/components-styles";

function Login() {
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <img src={image} style={{ width: "400px", height: "300px" }} alt="logo" />
      <StyledCard variant="outlined" style={{ marginTop: "20px" }}>
        <StyledCardContent>
          <StyledTypography variant="h5">Get Started</StyledTypography>
          <StyledButton
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
            onClick={spotifyAuthentication}
          >
            Log in with Spotify
          </StyledButton>
        </StyledCardContent>
      </StyledCard>
    </Container>
  );
}

function generateCodeVerifier(length: number) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export async function generateCodeChallenge(codeVerifier: string) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const spotifyAuthentication = async () => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirectUri);
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);
  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export default Login;
