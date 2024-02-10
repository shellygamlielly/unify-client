import { SongDto } from "./song-dto";

export interface PlaylistDto {
  name: string;
  playlistId: string;
  maxTime: number;
  songs: SongDto[];
}
