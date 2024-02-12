import { SPOTIFY_LOGIN } from "./routes";
export const siteUrl = "http://localhost:5173";
export const redirectUri = `${siteUrl}/${SPOTIFY_LOGIN}`;
export const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID || "";

export interface SpotifyUserProfile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

export interface SpotifyTrackInfo {
  album: {
    name: string;
    images: Image[];
  };
  name: string;
  duration_ms: number;
  artists: {
    name: string;
  }[];
  external_urls: {
    spotify: string;
  };
  id: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}
