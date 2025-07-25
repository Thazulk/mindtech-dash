import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import { useUserContext } from "../hooks/useUserContext";
import type { User } from "../api/users/services";

interface AddUserDialogProps {
  open: boolean;
  onClose: () => void;
}

const initialFormData = {
  name: "",
  username: "",
  email: "",
  phone: "",
  website: "",
  street: "",
  suite: "",
  city: "",
  zipcode: "",
  lat: "",
  lng: "",
  companyName: "",
  catchPhrase: "",
  bs: "",
};

export default function AddUserDialog({ open, onClose }: AddUserDialogProps) {
  const { addUser } = useUserContext();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.zipcode.trim()) newErrors.zipcode = "Zipcode is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newUser: Omit<User, "id"> = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      website: formData.website,
      address: {
        street: formData.street,
        suite: formData.suite,
        city: formData.city,
        zipcode: formData.zipcode,
        geo: {
          lat: formData.lat,
          lng: formData.lng,
        },
      },
      company: {
        name: formData.companyName,
        catchPhrase: formData.catchPhrase,
        bs: formData.bs,
      },
    };

    addUser(newUser);
    handleClose();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" component="div">
          Add New User
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Fill in the information below to add a new user
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Personal Information */}
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://example.com"
              />
            </Grid>
          </Grid>

          {/* Address Information */}
          <Typography variant="h6" gutterBottom>
            Address Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Street"
                value={formData.street}
                onChange={(e) => handleInputChange("street", e.target.value)}
                error={!!errors.street}
                helperText={errors.street}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Suite"
                value={formData.suite}
                onChange={(e) => handleInputChange("suite", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                error={!!errors.city}
                helperText={errors.city}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Zipcode"
                value={formData.zipcode}
                onChange={(e) => handleInputChange("zipcode", e.target.value)}
                error={!!errors.zipcode}
                helperText={errors.zipcode}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                value={formData.lat}
                onChange={(e) => handleInputChange("lat", e.target.value)}
                placeholder="e.g., 40.7128"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                value={formData.lng}
                onChange={(e) => handleInputChange("lng", e.target.value)}
                placeholder="e.g., -74.0060"
              />
            </Grid>
          </Grid>

          {/* Company Information */}
          <Typography variant="h6" gutterBottom>
            Company Information
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.companyName}
                onChange={(e) =>
                  handleInputChange("companyName", e.target.value)
                }
                error={!!errors.companyName}
                helperText={errors.companyName}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Catch Phrase"
                value={formData.catchPhrase}
                onChange={(e) =>
                  handleInputChange("catchPhrase", e.target.value)
                }
                placeholder="A catchy company slogan"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business"
                value={formData.bs}
                onChange={(e) => handleInputChange("bs", e.target.value)}
                placeholder="Business description"
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Add User
        </Button>
      </DialogActions>
    </Dialog>
  );
}
