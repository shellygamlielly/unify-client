import { Avatar, Button, Paper, Typography } from "@mui/material";
import { UserProfile } from "./constants/Spotify";

interface WelcomeProps {
  profile: UserProfile;
}

function Welcome({ profile }: WelcomeProps) {
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
      >
        Create Account
      </Button>
    </>
  );
}

export default Welcome;
