import { Outlet } from "react-router";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { UserProvider } from "./context/UserContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <UserProvider>
        <main>
          <Outlet />
        </main>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
