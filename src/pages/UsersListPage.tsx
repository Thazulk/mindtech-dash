import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_GlobalFilterTextField,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useUsersList } from "../hooks/useUsers";
import { type User } from "../api/users/services";

export default function UsersListPage() {
  const { data, isLoading, error } = useUsersList();
  const [globalFilter, setGlobalFilter] =
    useState<typeof MRT_GlobalFilterTextField>("");

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
    if (!data || !globalFilter) return data || [];

    const searchTerm = globalFilter.toLowerCase();
    return data.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
  }, [data, globalFilter]);

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    enableGlobalFilter: false, // We'll use our custom search
    enableColumnFilters: false,
    enableSorting: true,
    enablePagination: true,
    initialState: {
      pagination: { pageSize: 10, pageIndex: 0 },
      sorting: [{ id: "name", desc: false }],
    },
    muiTableBodyRowProps: {
      hover: true,
    },
    muiTableProps: {
      sx: {
        tableLayout: "fixed",
      },
    },
  });

  // Loading state
  if (isLoading) {
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
  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Error Loading Users
          </Typography>
          <Typography variant="body2">
            {error.message ||
              "An unexpected error occurred while fetching users."}
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" component="h1" gutterBottom>
        Users
      </Typography>

      {/* Custom Search Input */}
      <Box mb={3}>
        <TextField
          placeholder="Search users by name or email..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ maxWidth: 400 }}
        />
      </Box>

      {/* Material React Table */}
      <MaterialReactTable table={table} />

      {/* No results message */}
      {globalFilter && filteredData.length === 0 && (
        <Box mt={2}>
          <Alert severity="info">
            No users found matching "{globalFilter}". Try adjusting your search
            terms.
          </Alert>
        </Box>
      )}
    </Box>
  );
}
