import axios from "axios";

function Song() {}
async function addSongToPlaylist(spotifySongId: string, playlistId: string) {
  try {
    const songId = await axios.post(`http://localhost:3000/song/`, {
      spotifySongId,
      playlistId,
    });
    return songId;
  } catch (e) {
    console.log(e);
  }
}

export default Song;
