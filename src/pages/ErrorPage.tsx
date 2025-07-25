import { useRouteError, useNavigate } from "react-router";
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  Stack,
} from "@mui/material";
import { Error, Home, Refresh } from "@mui/icons-material";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            width: "100%",
          }}
        >
          <Stack spacing={3} alignItems="center">
            <Error
              sx={{
                fontSize: 80,
                color: "error.main",
              }}
            />

            <Typography variant="h3" component="h1" gutterBottom>
              Oops! Something went wrong
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
              {error?.status === 404
                ? "The page you're looking for doesn't exist."
                : "An unexpected error occurred. Please try again."}
            </Typography>

            {error?.statusText || error?.message ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "monospace" }}
              >
                {error.statusText || error.message}
              </Typography>
            ) : null}

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                startIcon={<Home />}
                onClick={handleGoHome}
                size="large"
              >
                Go Home
              </Button>

              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={handleRefresh}
                size="large"
              >
                Refresh Page
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
}
