import axios from "axios";
import { SpotifyTrackInfo } from "../constants/spotify";

export async function addUser(
  spotifyId: string | undefined,
  email: string | undefined,
) {
  const user = await axios.post(
    `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/user/`,
    {
      spotifyId,
      email,
    },
  );

  return user.data;
}

export async function getUser(spotifyId: string) {
  const user = (
    await axios.get(
      `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/user/spotify/${spotifyId}`,
    )
  ).data;
  return user;
}
export async function fetchPlaylists(userId: string | undefined) {
  const playlists = await axios.get(
    `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/ownerId/${userId}`,
  );

  return playlists.data;
}

export async function fetchPlaylist(playlistId: string | undefined) {
  const playlist = await axios.get(
    `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/${playlistId}`,
  );

  return playlist.data;
}

export async function createPlaylist(name: string, ownerId: string) {
  const playlistId = await axios.post(
    `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/`,
    {
      ownerId,
      name,
    },
  );
  return playlistId;
}

export async function removePlaylist(selectedPlaylistId: string) {
  await axios.delete(
    `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/playlist/${selectedPlaylistId}`,
  );
}

export async function addSong(
  track: SpotifyTrackInfo,
  playlistId: string | undefined,
) {
  await axios.post(`${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/`, {
    spotifySongId: track.id,
    name: track.name,
    playlistId: playlistId,
    albumCoverUrl: track.album.images[0].url,
  });
}

export async function removeSong(
  playlistId: string | undefined,
  spotifySongId: string,
) {
  await axios.delete(
    `${import.meta.env.VITE_TUNITY_SERVER_BASE_URL}/song/${playlistId}/${spotifySongId}`,
  );
}
