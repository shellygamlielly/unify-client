import DeleteIcon from "@mui/icons-material/Delete";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { FC, useContext, useState } from "react";
import { SongDto } from "../dto/song-dto";
import StyledVoteIconButton, {
  RightIconButton,
  StyledImage,
  StyledListItem,
  StyledTypography,
} from "./styles/components-styles";
import DeleteDialog from "./delete-dialog";

interface SongItemProps {
  song: SongDto;
  playlistId: string;
  onDelete: (playlistId: string, spotifyId: string) => void;
  onVote: (playlistId: string, spotifyId: string) => void;
  onUnvote: (playlistId: string, spotifyId: string) => void;
}
const SongItem: FC<SongItemProps> = ({
  song,
  playlistId,
  onDelete,
  onVote,
  onUnvote,
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVoteClick = () => {
    setHasVoted((prev) => !prev);
    if (hasVoted) {
      onVote(playlistId, song.spotifySongId);
    } else {
      onUnvote(playlistId, song.spotifySongId);
    }
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
      <StyledTypography variant="subtitle2">
        {" "}
        Number of voters: {song.voters.length}
      </StyledTypography>
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
