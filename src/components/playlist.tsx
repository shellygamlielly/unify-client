import axios from "axios";
import { useParams } from "react-router-dom";
import {
  StyledCardContent,
  StyledContainer,
  StyledList,
  StyledTypography,
} from "./styles/components-styles";

import { useContext, useEffect, useState } from "react";
import { PlaylistDto } from "../dto/playlist-dto";
import SearchSong from "./search-song";
//import FavoriteIcon from "@mui/icons-material/Favorite";

import { SpotifyTrackInfo } from "../constants/spotify";
import SongItem from "./song-item";
import { UserContext } from "../user-context";

function Playlist() {
  const [playlist, setplaylist] = useState<PlaylistDto>();
  const { playlistId } = useParams();
  const context = useContext(UserContext);
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

  const addTrack = async (track: SpotifyTrackInfo) => {
    if (!track) {
      return;
    }
    await axios.post(`${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/`, {
      spotifySongId: track.id,
      name: track.name,
      playlistId: playlistId,
      albumCoverUrl: track.album.images[0].url,
    });
    fetchData();
  };

  const onDelete = async (playlistId: string, spotifySongId: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/${playlistId}/${spotifySongId}`,
      );
      await fetchData();
    } catch (e) {
      console.error("Error removing playlist:", e);
    }
  };

  const onVote = async (playlistId: string, spotifySongId: string) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/vote/${context.user.userId}`,
        {
          playlistId,
          spotifySongId,
          userId: context.user.userId,
        },
      );
      await fetchData();
    } catch (e) {
      console.error("Error voting", e);
    }
  };

  const onUnvote = async (playlistId: string, spotifySongId: string) => {
    //   try {
    //     await axios.delete(
    //       `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/unvote/${context.user.userId}`,
    //       {
    //         playlistId,
    //         spotifySongId,
    //         userId: context.user.userId,
    //       },
    //     );
    //     await fetchData();
    //   } catch (e) {
    //     console.error("Error voting", e);
    //   }
  };

  return (
    <StyledContainer>
      <StyledCardContent>
        <StyledTypography variant="h2">{playlist?.name}</StyledTypography>

        <SearchSong onTrackSelected={addTrack} />
        <StyledList>
          {playlist?.songs.map((song) => (
            <SongItem
              song={song}
              playlistId={playlistId === undefined ? "" : playlistId}
              onDelete={onDelete}
              onVote={onVote}
              onUnvote={onUnvote}
            ></SongItem>
          ))}
        </StyledList>
      </StyledCardContent>
    </StyledContainer>
  );
}

export default Playlist;
