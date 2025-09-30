import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function TransitionsModal({ open, setOpen, user }) {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            gutterBottom
          >
            User Details
          </Typography>
          <Stack spacing={2}>
            <TextField
              label="Name"
              value={user?.username || ""}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Email"
              value={user?.email || ""}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <TextField
              label="Role"
              value={user?.role || "User"}
              InputProps={{ readOnly: true }}
              fullWidth
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleClose}
              fullWidth
              label="Delete"
            >
              Close
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
}
