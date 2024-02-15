import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { FC, useState } from "react";
import { SongDto } from "../dto/song-dto";
import StyledVoteIconButton, {
  RightIconButton,
  StyledCardContent,
  StyledImage,
  StyledListItem,
  StyledTypography,
} from "./styles/components-styles";
import DeleteDialog from "./delet-dialog";
import { ListItem, Typography } from "@mui/material";

interface SongItemProps {
  song: SongDto;
  playlistId: string;
  onDelete: (playlistId: string, spotifyId: string) => void;
}
const SongItem: FC<SongItemProps> = ({ song, playlistId, onDelete }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVoteClick = () => {
    setHasVoted((prev) => !prev);
  };

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(playlistId, song.spotifySongId);
    setDialogOpen(false);
  };

  return (
    <StyledListItem key={song.spotifySongId}>
      <StyledImage src={song.albumCoverUrl} alt={song.name} />
      <StyledTypography variant="subtitle1">{song.name}</StyledTypography>

      <StyledVoteIconButton
        hasvote={hasVoted.toString()}
        onClick={handleVoteClick}
      >
        <ThumbUpIcon />
      </StyledVoteIconButton>
      <RightIconButton onClick={() => handleDeleteClick()}>
        <DeleteIcon />
      </RightIconButton>
      <DeleteDialog
        open={isDialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemToDeleteId={playlistId}
      />
    </StyledListItem>
  );
};

export default SongItem;