import { Outlet } from "react-router";

function App() {
  return (
    <div className="app">
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
