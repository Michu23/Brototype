import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LeadContext from "../../../Context/LeadContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  title,
  value,
  message,
  onConfirm,
  form,
  name,
}) {
  const [open, setOpen] = React.useState(false);
  const [copen, setCopen] = React.useState(false);
  const { deleteDomain, deleteBatch, deleteGroup,blockAdvisor } =
    React.useContext(LeadContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpens = () => {
    setCopen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setCopen(false);
    setOpen(false);
    if (value === "deleteDomain") {
      deleteDomain(form);
    } else if (value === "deleteBatch") {
      deleteBatch(form);
    } else if (value === "deleteGroup") {
        deleteGroup(form);
    }

  };

  const handleCloses = () => {
    setCopen(false);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          Confirm {title} {name} ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="bgdark textlight px-3" onClick={handleClose}>
            Disagree
          </Button>
          <Button
            variant="contained"
            className="px-4"
            onClick={handleClickOpens}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={copen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloses}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Needed double confirmation on {name}!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {onConfirm}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className="bgdark textlight px-3" onClick={handleCloses}>
            Disagree
          </Button>
          <Button variant="contained" className="px-4" onClick={handleSubmit}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
