import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, TextField, Button, Box, Stack, Typography } from '@mui/material';

const AddNewUser = ({ open, setOpen, handleAddUser }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    handleAddUser(data);
    reset(); // optional: reset form after submission
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add New User
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Name"
            {...register("username", { required: "Name is required" })}
            error={!!errors.username}
            helperText={errors.username?.message}
            fullWidth
          />

          <TextField
            label="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={() => setOpen(false)} sx={{ mr: 1 }} type='button'>
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddNewUser;
