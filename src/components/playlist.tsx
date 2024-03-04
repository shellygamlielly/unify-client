import axios from "axios";
import { useParams } from "react-router-dom";
import {
  StyledCardContent,
  StyledContainer,
  StyledList,
  StyledTypography,
} from "./styles/components-styles";

import { useEffect, useState } from "react";
import { PlaylistDto } from "../dto/playlist-dto";
import SearchSong from "./search-song";
//import FavoriteIcon from "@mui/icons-material/Favorite";

import { SpotifyTrackInfo } from "../constants/spotify";
import SongItem from "./song-item";
import { addSong, fetchPlaylist, removeSong } from "../api/server";

function Playlist() {
  const [playlist, setplaylist] = useState<PlaylistDto>();
  const [search, setSearch] = useState<boolean>(false);

  const { playlistId } = useParams();

  const fetchSongs = async () => {
    try {
      const playlist = await fetchPlaylist(playlistId);
      setplaylist(playlist);
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const onSearch = async (isSearch: boolean) => {
    setSearch(isSearch);
  };
  const addTrack = async (track: SpotifyTrackInfo) => {
    if (!track) {
      return false;
    }
    if (playlist?.songs.find((song) => song.spotifySongId == track.id)) {
      return false;
    }
    await addSong(track, playlistId);
    fetchSongs();
    return true;
  };

  const onDelete = async (playlistId: string, spotifySongId: string) => {
    try {
      await removeSong(playlistId, spotifySongId);
      await fetchSongs();
    } catch (e) {
      console.error("Error removing playlist:", e);
    }
  };

  return (
    <StyledContainer>
      <StyledCardContent>
        <StyledTypography variant="h2">{playlist?.name}</StyledTypography>

        <SearchSong onSearch={onSearch} addTrack={addTrack} />
        <StyledList style={{ filter: search ? "blur(5px)" : "none" }}>
          {playlist?.songs.map((song) => (
            <SongItem
              key={song.spotifySongId}
              song={song}
              playlistId={playlistId === undefined ? "" : playlistId}
              onDelete={onDelete}
              disabled={search}
            ></SongItem>
          ))}
        </StyledList>
      </StyledCardContent>
    </StyledContainer>
  );
}

export default Playlist;
