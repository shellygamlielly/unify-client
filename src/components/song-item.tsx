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
      <StyledCardContent>
        <StyledVoteIconButton
          hasvote={hasVoted.toString()}
          onClick={handleVoteClick}
        >
          <ThumbUpIcon />
        </StyledVoteIconButton>
        <div style={{ marginLeft: "8px" }}>
          {" "}
          {/* Adjust margin as needed */}
          <StyledImage src={song.albumCoverUrl} alt={song.name} />
          <StyledTypography variant="subtitle1">{song.name}</StyledTypography>
        </div>
        <RightIconButton onClick={() => handleDeleteClick()}>
          <DeleteIcon />
        </RightIconButton>
        <DeleteDialog
          open={isDialogOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          itemToDeleteId={playlistId}
        />
      </StyledCardContent>
    </StyledListItem>
  );
};

export default SongItem;
