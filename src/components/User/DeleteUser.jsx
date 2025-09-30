import React from 'react';
import {
  Modal,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const DeleteUser = ({ open, setOpen, users, handleDeleteUser }) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 3,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" mb={2}>
          User List
        </Typography>

        {users?.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No users found.
          </Typography>
        ) : (
          <List>
            {users?.map((user, index) => (
              <React.Fragment key={user._id || index}>
                <ListItem>
                  <ListItemText
                    primary={user.username}
                    secondary={user.email}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < users.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        )}
      </Box>
    </Modal>
  );
};

export default DeleteUser;
