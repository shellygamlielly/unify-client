import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { FC, useState } from "react";
import { SongDto } from "../dto/song-dto";
import StyledVoteIconButton, {
  RightIconButton,
  StyledImage,
  StyledListItem,
  StyledTypography,
} from "./styles/components-styles";
import DeleteDialog from "./delet-dialog";
import { Tooltip } from "@mui/material";

interface SongItemProps {
  song: SongDto;
  playlistId: string;
  onDelete: (playlistId: string, spotifyId: string) => void;
  disabled: boolean;
}
const SongItem: FC<SongItemProps> = ({
  song,
  playlistId,
  onDelete,
  disabled,
}) => {
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
      <Tooltip title={song.name} disableHoverListener={disabled}>
        <StyledTypography
          variant="subtitle1"
          style={{
            width: "160px",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limit to 2 lines
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {song.name}
        </StyledTypography>
      </Tooltip>
      <StyledVoteIconButton
        hasvote={hasVoted.toString()}
        onClick={handleVoteClick}
        disabled={disabled}
      >
        <ThumbUpIcon />
      </StyledVoteIconButton>
      <RightIconButton onClick={() => handleDeleteClick()} disabled={disabled}>
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
