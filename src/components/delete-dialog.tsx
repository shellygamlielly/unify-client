import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { FC } from "react";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  title?: string;
  contentText?: string;
  itemToDeleteId: string;
}

const DeleteDialog: FC<DeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  contentText = "Are you sure you want to delete this item?",
  itemToDeleteId,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onConfirm(itemToDeleteId)} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
