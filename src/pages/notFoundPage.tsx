import { Box, Typography, Button, Container } from "@mui/material";
import { Home, ErrorOutline } from "@mui/icons-material";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/users");
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="80vh"
        textAlign="center"
        gap={3}
      >
        <ErrorOutline
          sx={{
            fontSize: 120,
            color: "primary.main",
            opacity: 0.7,
          }}
        />

        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: "bold",
            color: "primary.main",
            lineHeight: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            fontWeight: "medium",
            color: "text.primary",
            mb: 1,
          }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            color: "text.secondary",
            maxWidth: "500px",
            mb: 2,
          }}
        >
          Sorry, the page you're looking for doesn't exist or has been moved.
          Let's get you back to exploring the users dashboard.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<Home />}
          onClick={handleGoHome}
          sx={{
            mt: 2,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Go to Users Dashboard
        </Button>
      </Box>
    </Container>
  );
}
