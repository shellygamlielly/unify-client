export interface CreatePlaylistDto {
  ownerId: string;
  name: string;
  playlistId: string;
  maxTime: number;
  songsCount: number;
}
