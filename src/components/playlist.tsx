import axios from "axios";
import { useParams } from "react-router-dom";
import {
  StyledCard,
  StyledCardContent,
  StyledImage,
  StyledList,
  StyledListItem,
  StyledTypography,
} from "./styles/components-styles";

import { useEffect, useState } from "react";
import { PlaylistDto } from "../dto/playlist-dto";
import SearchSong from "./search-song";
import { CardContent, Typography } from "@mui/material";

function Playlist() {
  const [playlist, setplaylist] = useState<PlaylistDto>();
  const { playlistId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/playlistId/${playlistId}`,
        );
        setplaylist(result.data);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchData();
  });

  return (
    <StyledCard>
      <StyledCardContent>
        <StyledTypography variant="h2">{playlist?.name}</StyledTypography>

        <SearchSong></SearchSong>
        <StyledList>
          {playlist?.songs.map((song) => (
            <StyledListItem key={song.spotifySongId}>
              <StyledImage src={song.albumCoverUrl} alt={song.name} />
              <StyledTypography variant="subtitle1">
                {song.name}
              </StyledTypography>
            </StyledListItem>
          ))}
        </StyledList>
      </StyledCardContent>
    </StyledCard>
  );
}

export default Playlist;
