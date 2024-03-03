import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CreatePlaylistDto } from "../dto/create-playlist-dto";
import { UserContext } from "../user-context";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  StyledButton,
  LeftIconButton as AddGroupIconButton,
  RightIconButton as DeleteIconButton,
  StyledCardContent,
  StyledImage,
  StyledList,
  StyledListItem,
  StyledTypography,
  StyledContainer,
} from "./styles/components-styles";
import { useNavigate } from "react-router-dom";
import DeleteDialog from "./delet-dialog";
import InviteDialog from "./invite-colaborators";
import { createPlaylist, fetchPlaylists, removePlaylist } from "../api/server";

function Home() {
  const [playlists, setPlaylists] = useState<CreatePlaylistDto[]>([]);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>("");

  const [isInviteDialogOpen, setInviteDialogOpen] = useState(false);
  useState<string>("");

  const context = useContext(UserContext);
  const navigate = useNavigate();

  const handlePlaylists = async () => {
    try {
      const playlistsData = await fetchPlaylists(context.user.userId);
      setPlaylists(playlistsData);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };
  useEffect(() => {
    // Fetch playlists only if ownerId is available
    if (context.user.userId) {
      handlePlaylists();
    }
  }, [context.user.userId]);

  const handleCreatePlaylist = async () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && context.user.userId) {
      await handlePlaylistCreation(playlistName, context.user.userId);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await removePlaylist(selectedPlaylistId);
      console.log("Playlist deleted:", selectedPlaylistId);
      setDeleteDialogOpen(false);
      await handlePlaylists();
    } catch (e) {
      console.error("Error removing playlist:", e);
    }
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
  };

  const handleDeletePlaylist = (playlistId: string) => {
    setDeleteDialogOpen(true);
    setSelectedPlaylistId(playlistId);
  };

  const handleSharePlaylist = (playlistId: string) => {
    setInviteDialogOpen(true);
    setSelectedPlaylistId(playlistId);
  };

  const handleDisplayPlaylistInfo = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  async function handlePlaylistCreation(name: string, ownerId: string) {
    try {
      const playlistId = await createPlaylist(name, ownerId);
      console.log("Playlist created:", playlistId);

      await handlePlaylists();
    } catch (e) {
      console.error("Error creating playlist:", e);
    }
  }

  return (
    <StyledContainer>
      <StyledTypography variant="h3" fontWeight="700">
        TUnity
      </StyledTypography>

      <StyledTypography variant="subtitle1" fontWeight="700">
        Discover. Collaborate. Create.
      </StyledTypography>
      <StyledButton onClick={handleCreatePlaylist}>
        <i className="fas fa-plus-circle"></i>
        <AddIcon /> New Playlist
      </StyledButton>
      <StyledList>
        {playlists.map((playlist) => (
          <StyledListItem key={playlist.playlistId}>
            <StyledImage
              src={`https://source.unsplash.com/300x200/?${playlist.name}`} // Using Unsplash for demo images
              alt={playlist.name}
              onClick={() => handleDisplayPlaylistInfo(playlist.playlistId)}
            />
            <StyledCardContent>
              <StyledTypography className="h6">
                {playlist.name}
              </StyledTypography>
              <StyledTypography className="body2">
                {playlist.songsCount} songs
              </StyledTypography>
              <AddGroupIconButton
                onClick={() => handleSharePlaylist(playlist.playlistId)}
              >
                <GroupAddIcon />
              </AddGroupIconButton>
              <InviteDialog
                open={isInviteDialogOpen}
                onClose={() => setInviteDialogOpen(false)}
                playlistId={selectedPlaylistId}
              />
              <DeleteIconButton
                onClick={() => handleDeletePlaylist(playlist.playlistId)}
              >
                <DeleteIcon />
              </DeleteIconButton>
              <DeleteDialog
                open={isDeleteDialogOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                itemToDeleteId={selectedPlaylistId}
              />
            </StyledCardContent>
          </StyledListItem>
        ))}
      </StyledList>
    </StyledContainer>
  );
}

export default Home;
