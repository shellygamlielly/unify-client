import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { PlaylistDto } from "./dto/playlist-dto";
import { UserContext } from "./user-context";
function Playlists() {
  const [playlists, setPlaylists] = useState<PlaylistDto[]>([]);
  const context = useContext(UserContext);
  const fetchPlaylists = async () => {
    try {
      const playlistsData = await axios.get(
        `http://localhost:3000/playlist/${context.user.userId}`,
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

  async function createPlaylist(name: string, ownerId: string) {
    try {
      const playlistId = await axios.post(`http://localhost:3000/playlist/`, {
        ownerId,
        name,
      });
      console.log("Playlist created:", playlistId);

      await fetchPlaylists();
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
            {playlist.name} playlist has {playlist.songsCount} songs.
          </li>
        ))}
      </ul>
      <button onClick={handleCreatePlaylist}>Create New Playlist</button>
    </>
  );
}

export default Playlists;
