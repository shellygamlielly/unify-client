import { Avatar, Button, Paper, Typography } from "@mui/material";
import { SpotifyUserProfile } from "./constants/spotify";
import axios from "axios";
import { useUserId } from "./user-id-context";
import { useNavigate } from "react-router-dom";

interface WelcomeProps {
  profile: SpotifyUserProfile;
}

function Welcome({ profile }: WelcomeProps) {
  const context = useUserId();
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/user/`, {
        spotifyId: profile.id,
        email: profile.email,
      });

      const userId = response.data;

      context.setUserId(userId);
      navigate("/playlist");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{
          padding: "20px",
          margin: "20px",
          textAlign: "center",
          backgroundColor: "#e6e6e6",
        }}
      >
        <Avatar
          alt={profile.display_name}
          src={profile.images[1]?.url}
          style={{ width: "250px", height: "250px", margin: "auto" }}
        />
        <Typography variant="h5">Welcome, {profile.display_name}!</Typography>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{
          backgroundColor: "##add8e6", // Vibrant color
          color: "#fff", // Text color
        }}
        onClick={() => createUser()}
      >
        Sign Up
      </Button>
    </>
  );
}

export default Welcome;
