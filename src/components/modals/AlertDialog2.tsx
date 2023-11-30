import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface AlertDialog2Props {
  title: string;
  message: string;
  yesClick?: any;
  noClick?: any;
  confirmModal: boolean;
  okClick?: any;
  open: boolean;
}

export default function AlertDialog({
  title,
  message,
  yesClick,
  noClick,
  okClick,
  confirmModal,
  open,
}: AlertDialog2Props) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {confirmModal ? (
            <Button onClick={okClick} autoFocus>
              Ok
            </Button>
          ) : (
            <>
              <Button onClick={noClick}>No</Button>
              <Button onClick={yesClick} autoFocus>
                Yes
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
