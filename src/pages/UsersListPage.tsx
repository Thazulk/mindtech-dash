import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import { Search, Refresh, Add } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router";
import { useUserContext } from "../hooks/useUserContext";
import { type User } from "../api/users/services";
import UserDetailsPage from "./UserDetailsPage";
import AddUserDialog from "../components/AddUserDialog";

export default function UsersListPage() {
  const {
    users,
    usersLoading,
    usersError,
    usersErrorMessage,
    refetchUsers,
    usersFetching,
  } = useUserContext();
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [addUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleRefetch = () => {
    refetchUsers();
  };

  const handleOpenAddDialog = () => {
    setAddUserDialogOpen(true);
  };

  const handleCloseAddDialog = () => {
    setAddUserDialogOpen(false);
  };

  // Define table columns
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        size: 200,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 250,
      },
      {
        accessorKey: "username",
        header: "Username",
        size: 150,
      },
      {
        accessorKey: "company.name",
        header: "Company Name",
        size: 200,
      },
    ],
    []
  );

  // Filter function for search (case-insensitive search by name or email)
  const filteredData = useMemo(() => {
    if (!users || !globalFilter) return users || [];

    const searchTerm = globalFilter.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }, [users, globalFilter]);

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    enableGlobalFilter: false, // We'll use our custom search
    enableColumnFilters: false,
    enableColumnActions: false,
    enableFullScreenToggle: false, // Hide full screen toggle button
    enableHiding: false, // Hide column hiding button
    enableDensityToggle: false, // Hide density toggle button
    enableSorting: true,
    enablePagination: true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      sorting: [{ id: "name", desc: false }],
    },
    muiTableBodyRowProps: ({ row }) => ({
      hover: true,
      sx: {
        cursor: "pointer",
      },
      onClick: () => {
        navigate(`/users/${row.original.id}`);
      },
    }),
    muiTableProps: {
      sx: {
        tableLayout: "fixed",
      },
    },
  });

  // Loading state
  if (usersLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="400px"
        gap={2}
      >
        <CircularProgress size={40} />
        <Typography variant="h6" color="text.secondary">
          Loading users...
        </Typography>
      </Box>
    );
  }

  // Error state
  if (usersError) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Error Loading Users
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {usersErrorMessage?.message ||
              "An unexpected error occurred while fetching users."}
          </Typography>
          <Button
            onClick={handleRefetch}
            color="primary"
            variant="contained"
            disabled={usersFetching}
            startIcon={
              usersFetching ? <CircularProgress size={16} /> : <Refresh />
            }
          >
            {usersFetching ? "Retrying..." : "Retry"}
          </Button>
        </Alert>
      </Box>
    );
  }

  return (
    <>
      <Box p={3}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" component="h1">
            Users
          </Typography>
          <Button
            onClick={handleRefetch}
            color="primary"
            variant="outlined"
            disabled={usersFetching}
            startIcon={
              usersFetching ? <CircularProgress size={16} /> : <Refresh />
            }
          >
            {usersFetching ? "Refreshing..." : "Refresh"}
          </Button>
        </Box>

        {/* Search Input and Add User Button */}
        <Box mb={3} display="flex" gap={2} alignItems="center">
          <TextField
            placeholder="Search users by name or email..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            variant="outlined"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ maxWidth: 400, flexGrow: 1 }}
          />
          <Button
            onClick={handleOpenAddDialog}
            color="primary"
            variant="contained"
            startIcon={<Add />}
            sx={{ flexShrink: 0 }}
          >
            Create New User
          </Button>
        </Box>

        {/* Material React Table */}
        <MaterialReactTable table={table} />

        {/* No results message */}
        {globalFilter && filteredData.length === 0 && (
          <Box mt={2}>
            <Alert severity="info">
              No users found matching "{globalFilter}". Try adjusting your
              search terms.
            </Alert>
          </Box>
        )}
      </Box>

      {/* Show user details dialog if id parameter exists */}
      {id && <UserDetailsPage />}

      {/* Add User Dialog */}
      <AddUserDialog open={addUserDialogOpen} onClose={handleCloseAddDialog} />
    </>
  );
}
