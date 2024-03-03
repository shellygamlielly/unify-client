import { Avatar, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../user-context";
import { addUser } from "../api/server";

function Welcome() {
  const userContext = useUser();
  const navigate = useNavigate();

  const createUser = async () => {
    try {
      const user = await addUser(
        userContext.user.spotifyId,
        userContext.user.email,
      );
      userContext.setUserId(user.userId);
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
      </Paper>
    </>
  );
}

export default Welcome;
