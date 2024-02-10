import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CreatePlaylistDto } from "../dto/create-playlist-dto";
import { UserContext } from "../user-context";
import { CardContent } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import {
  StyledButton,
  AddGroupIconButton,
  DeleteIconButton,
  StyledCard,
  StyledCardContent,
  StyledImage,
  StyledList,
  StyledListItem,
  StyledTypography,
} from "./styles/components-styles";
import { useNavigate } from "react-router-dom";

function Home() {
  const [playlists, setPlaylists] = useState<CreatePlaylistDto[]>([]);
  const context = useContext(UserContext);
  const navigate = useNavigate();

  const fetchPlaylists = async () => {
    try {
      const playlistsData = await axios.get(
        `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/${context.user.userId}`,
      );
      setPlaylists(playlistsData.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };
  useEffect(() => {
    // Fetch playlists only if ownerId is available
    if (context.user.userId) {
      fetchPlaylists();
    }
  }, [context.user.userId]);

  const handleCreatePlaylist = async () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && context.user.userId) {
      await createPlaylist(playlistName, context.user.userId);
    }
  };

  const handleDisplayPlaylistInfo = (playlistId: string) => {
    navigate(`/playlist/${playlistId}`);
  };

  async function createPlaylist(name: string, ownerId: string) {
    try {
      const playlistId = await axios.post(
        `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/`,
        {
          ownerId,
          name,
        },
      );
      console.log("Playlist created:", playlistId);

      await fetchPlaylists();
    } catch (e) {
      console.error("Error creating playlist:", e);
    }
  }

  return (
    <StyledCard>
      <CardContent>
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
              />
              <StyledCardContent
                onClick={() => handleDisplayPlaylistInfo(playlist.playlistId)}
              >
                <StyledTypography className="h6">
                  {playlist.name}
                </StyledTypography>
                <StyledTypography className="body2">
                  {playlist.songsCount} songs
                </StyledTypography>
                <AddGroupIconButton>
                  <GroupAddIcon />
                </AddGroupIconButton>
                <DeleteIconButton>
                  <DeleteIcon />
                </DeleteIconButton>
              </StyledCardContent>
            </StyledListItem>
          ))}
        </StyledList>
      </CardContent>
    </StyledCard>
  );
}

export default Home;
