import axios from "axios";
import { useParams } from "react-router-dom";
import {
  RightIconButton as DeleteIconButton,
  LeftIconButton as VoteIconButton,
  StyledCardContent,
  StyledContainer,
  StyledImage,
  StyledList,
  StyledListItem,
  StyledTypography,
} from "./styles/components-styles";

import { useEffect, useState } from "react";
import { PlaylistDto } from "../dto/playlist-dto";
import SearchSong from "./search-song";
import DeleteDialog from "./delet-dialog";
import DeleteIcon from "@mui/icons-material/Delete";
//import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbUpIcon from "@mui/icons-material/ThumbUpAlt";

import { SpotifyTrackInfo } from "../constants/spotify";
import { IconButton } from "@mui/material";
import VoteButton from "./vote";

function Playlist() {
  const [playlist, setplaylist] = useState<PlaylistDto>();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [trackToDeleteSpotifyId, settrackToDeleteSpotifyId] =
    useState<string>("");
  const { playlistId } = useParams();
  const fetchData = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/${playlistId}`,
      );
      setplaylist(result.data);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/${playlistId}/${trackToDeleteSpotifyId}`,
      );
      console.log("Playlist deleted:", trackToDeleteSpotifyId);
      setDialogOpen(false);
      await fetchData();
    } catch (e) {
      console.error("Error removing playlist:", e);
    }
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  const handleDeleteSong = (spotifyId: string) => {
    setDialogOpen(true);
    settrackToDeleteSpotifyId(spotifyId);
  };

  const addTrack = async (track: SpotifyTrackInfo) => {
    if (!track) {
      return;
    }
    await axios.post(`${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/`, {
      spotifySongId: track.id,
      name: track.name,
      playlistId,
      albumCoverUrl: track.album.images[0].url,
    });
    fetchData();
  };

  return (
    <StyledContainer>
      <StyledCardContent>
        <StyledTypography variant="h2">{playlist?.name}</StyledTypography>

        <SearchSong onTrackSelected={addTrack} />
        <StyledList>
          {playlist?.songs.map((song) => (
            <StyledListItem key={song.spotifySongId}>
              <StyledImage src={song.albumCoverUrl} alt={song.name} />
              <StyledCardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <VoteButton />
                  <StyledTypography variant="subtitle1">
                    {song.name}
                  </StyledTypography>
                </div>
                <DeleteIconButton
                  onClick={() => handleDeleteSong(song.spotifySongId)}
                >
                  <DeleteIcon />
                </DeleteIconButton>
                <DeleteDialog
                  open={isDialogOpen}
                  onClose={handleCancelDelete}
                  onConfirm={handleConfirmDelete}
                  itemToDeleteId={playlist.playlistId}
                />
              </StyledCardContent>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledCardContent>
    </StyledContainer>
  );
}

export default Playlist;
