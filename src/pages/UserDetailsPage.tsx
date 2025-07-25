import { useState, useEffect } from "react";
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
import { Refresh } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router";
import { useUserContext } from "../hooks/useUserContext";

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const {
    userDetails,
    userDetailsLoading,
    userDetailsError,
    userDetailsErrorMessage,
    userDetailsFetching,
    fetchUserDetails,
    refetchUserDetails,
    clearUserDetails,
  } = useUserContext();

  // Fetch user details when component mounts or id changes
  useEffect(() => {
    if (id) {
      const userId = parseInt(id, 10);
      if (!isNaN(userId)) {
        fetchUserDetails(userId);
      }
    }

    // Cleanup when component unmounts
    return () => {
      clearUserDetails();
    };
  }, [id, fetchUserDetails, clearUserDetails]);

  const handleClose = () => {
    setOpen(false);
    clearUserDetails();
    // Navigate back to users list
    navigate("/users");
  };

  const handleRefetch = () => {
    refetchUserDetails();
  };

  if (userDetailsLoading) {
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

  // Error state with retry functionality
  if (userDetailsError) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Error Loading User</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            {userDetailsErrorMessage?.message ||
              "Failed to load user data. Please check your connection and try again."}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button
            onClick={handleRefetch}
            color="primary"
            variant="contained"
            disabled={userDetailsFetching}
            startIcon={
              userDetailsFetching ? <CircularProgress size={16} /> : <Refresh />
            }
          >
            {userDetailsFetching ? "Retrying..." : "Retry"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  if (!userDetails) {
    return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>User Not Found</DialogTitle>
        <DialogContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            User with ID "{id}" was not found.
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button
            onClick={handleRefetch}
            color="primary"
            variant="outlined"
            disabled={userDetailsFetching}
            startIcon={
              userDetailsFetching ? <CircularProgress size={16} /> : <Refresh />
            }
          >
            {userDetailsFetching ? "Refreshing..." : "Refresh Data"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Box>
            <Typography variant="h4" component="div">
              {userDetails.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              @{userDetails.username}
            </Typography>
          </Box>
          <Button
            onClick={handleRefetch}
            color="primary"
            variant="outlined"
            size="small"
            disabled={userDetailsFetching}
            startIcon={
              userDetailsFetching ? <CircularProgress size={16} /> : <Refresh />
            }
            sx={{ ml: 2, flexShrink: 0 }}
          >
            {userDetailsFetching ? "Refreshing..." : "Refresh"}
          </Button>
        </Box>
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
                <strong>Email:</strong> {userDetails.email}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {userDetails.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Website:</strong> {userDetails.website}
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
                  {userDetails.address.street}, {userDetails.address.suite}
                </Typography>
                <Typography variant="body2">
                  {userDetails.address.city}, {userDetails.address.zipcode}
                </Typography>
                <Typography variant="body2">
                  <strong>Coordinates:</strong> {userDetails.address.geo.lat},{" "}
                  {userDetails.address.geo.lng}
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
                  <strong>Name:</strong> {userDetails.company.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Catchphrase:</strong>{" "}
                  {userDetails.company.catchPhrase}
                </Typography>
                <Typography variant="body2">
                  <strong>Business:</strong> {userDetails.company.bs}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* User ID */}
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body2" color="text.secondary">
              User ID:
            </Typography>
            <Chip label={userDetails.id} size="small" variant="outlined" />
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
