import { Avatar, Button, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../user-context";

function Welcome() {
  const userContext = useUser();
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/user/`, {
        spotifyId: userContext.user.spotifyId,
        email: userContext.user.email,
      });

      const userId = response.data;

      userContext.setUserId(userId);
      navigate("/home");
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
          alt={userContext.user.displayName || ""}
          src={userContext?.user?.profileImage || ""}
          style={{ width: "250px", height: "250px", margin: "auto" }}
        />
        <Typography variant="h5">
          Welcome, {userContext?.user?.displayName}!
        </Typography>
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
