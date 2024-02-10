import axios from "axios";
import { SpotifyTrackInfo } from "./constants/spotify";

export async function search(
  query: string,
  accessToken: string,
): Promise<SpotifyTrackInfo[]> {
  const url = `https://api.spotify.com/v1/search?q=${query}&type=track`;
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(url, { headers });
    return response.data.tracks.items.map((item: any) => ({
      album: {
        name: item.album.name,
        images: item.album.images,
      },
      name: item.name,
      duration_ms: item.duration_ms,
      artists: item.artists.map((artist: any) => ({ name: artist.name })),
      external_urls: {
        spotify: item.external_urls.spotify,
      },
      id: item.id,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
