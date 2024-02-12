import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { siteUrl } from "../constants/spotify";

interface InviteDialogProps {
  open: boolean;
  onClose: () => void;
  playlistId: string;
}

const InviteDialog: React.FC<InviteDialogProps> = ({
  open,
  onClose,
  playlistId,
}) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [sharedUrl, setSharedUrl] = useState("");
  const [isCreateLink, setIsCreateLink] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(sharedUrl);
      console.log("URL copied to clipboard:", sharedUrl);
    } catch (error) {
      console.error("Error copying URL to clipboard:", error);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onCancle = () => {
    onClose();
    setIsCreateLink(false);
  };

  const handleSendInvitation = async () => {
    if (validateEmail(emailAddress)) {
      //sendEmail(emailAddress);
    } else {
      setIsEmailValid(false);
    }
  };
  useEffect(() => {
    const url = `${siteUrl}/playlist/${playlistId}`;
    setSharedUrl(url);

    // Cleanup function
    return () => {
      setSharedUrl("");
      setIsCreateLink(false);
    };
  }, [playlistId]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Share Playlist"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {"Share the playlist using a link or invite by email address"}
        </DialogContentText>
        <TextField
          label="Enter Email Address"
          variant="outlined"
          fullWidth
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
          error={!isEmailValid}
          helperText={!isEmailValid ? "Enter a valid email address" : ""}
        />
        <DialogActions>
          <Button onClick={handleSendInvitation} color="primary">
            Send Invitation
          </Button>
          <Button onClick={() => setIsCreateLink(true)} color="primary">
            Create link
          </Button>
          <Button onClick={onCancle} color="primary">
            Cancel
          </Button>
        </DialogActions>
        {isCreateLink && (
          <>
            <DialogContentText style={{ marginTop: "10px" }}>
              {"Shared Playlist URL:"}
            </DialogContentText>
            <TextField
              variant="outlined"
              fullWidth
              value={sharedUrl}
              InputProps={{
                readOnly: true,
              }}
            />
            <Button onClick={handleCopyLink} color="primary">
              Copy Link
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InviteDialog;
