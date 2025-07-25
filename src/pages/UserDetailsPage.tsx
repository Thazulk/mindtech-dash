import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router";
import { useUserContext } from "../hooks/useUserContext";
import { type User } from "../api/users/services";

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { users, isLoading } = useUserContext();
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (id && users) {
      const foundUser = users.find((u) => u.id.toString() === id);
      setUser(foundUser || null);
    }
  }, [id, users]);

  const handleClose = () => {
    setOpen(false);
    // Navigate back to users list
    navigate("/users");
  };

  if (isLoading) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py={4}
          >
            <CircularProgress size={40} />
            <Typography variant="h6" color="text.secondary" mt={2}>
              Loading user details...
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  if (!user) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>User Not Found</DialogTitle>
        <DialogContent>
          <Alert severity="error">User with ID "{id}" was not found.</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" component="div">
          {user.name}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          @{user.username}
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Basic Information */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body1">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {user.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Website:</strong> {user.website}
              </Typography>
            </Box>
          </Box>

          {/* Address and Company Information */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            gap={3}
          >
            {/* Address Information */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Address
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2">
                  {user.address.street}, {user.address.suite}
                </Typography>
                <Typography variant="body2">
                  {user.address.city}, {user.address.zipcode}
                </Typography>
                <Typography variant="body2">
                  <strong>Coordinates:</strong> {user.address.geo.lat},{" "}
                  {user.address.geo.lng}
                </Typography>
              </Box>
            </Box>

            {/* Company Information */}
            <Box flex={1}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box display="flex" flexDirection="column" gap={1}>
                <Typography variant="body2">
                  <strong>Name:</strong> {user.company.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Catchphrase:</strong> {user.company.catchPhrase}
                </Typography>
                <Typography variant="body2">
                  <strong>Business:</strong> {user.company.bs}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* User ID */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              User ID:
            </Typography>
            <Chip label={user.id} size="small" variant="outlined" />
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
