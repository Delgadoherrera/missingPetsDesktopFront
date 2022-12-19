import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useAuth0 } from "@auth0/auth0-react";

export default function AlertDialog({ handleCloseView }) {
  const [open, setOpen] = React.useState(true);
  const { loginWithRedirect } = useAuth0();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCloseView();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Ingresa a tu cuenta"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Para poder acceder a esta sección debes acceder a tu cuenta. ¿Deseas
            ingresar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={() => loginWithRedirect()} autoFocus>
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
