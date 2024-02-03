import axios from "axios";
import { useEffect, useState } from "react";
import { Playlist } from "./constants/playlist";
import { useUserId } from "./user-id-context";

interface PlaylistsProps {
  spotifyId: string;
}

function Playlists({ spotifyId }: PlaylistsProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const context = useUserId();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/user/spotify/${spotifyId}`,
        );
        context.setUserId(response.data);
      } catch (error) {
        console.error("Error fetching userId:", error);
      }
    };

    if (!context.userId) {
      fetchUserId();
    }
  }, [context, spotifyId]);

  const ownerId = context.userId;

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/playlist/${ownerId}`,
        );
        const playlistsData = response.data.map((playlist: any) => ({
          ownerId: playlist.ownerId,
          playlistId: playlist.id,
          name: playlist.name,
          maxTimeSeconds: playlist.maxTimeSeconds,
          songsCount: playlist.songsCountMap,
        }));
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    // Fetch playlists only if ownerId is available
    if (ownerId) {
      fetchPlaylists();
    }
  }, [ownerId]);

  const handleCreatePlaylist = async () => {
    const playlistName = prompt("Enter playlist name:");
    if (playlistName && ownerId) {
      await createPlaylist(playlistName, ownerId);
    }
  };

  async function createPlaylist(name: string, ownerId: string) {
    try {
      const playlistId = await axios.post(`http://localhost:3000/playlist/`, {
        ownerId,
        name,
      });
      console.log("Playlist created:", playlistId);
    } catch (e) {
      console.error("Error creating playlist:", e);
    }
  }

  return (
    <>
      <h2>My Playlists</h2>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist.playlistId}>
            {playlist.name} with {playlist.songsCount} songs, and length of:{" "}
            {playlist.maxTime}
          </li>
        ))}
      </ul>
      <button onClick={handleCreatePlaylist}>Create New Playlist</button>
    </>
  );
}

export default Playlists;
