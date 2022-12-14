import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LOGOUT, PRIVATE } from "./config/routes/paths";
import { AuthContextProvider } from "./contexts/authContext";
import PublicRoute from "./components/router/PublicRoute";
import PrivateRoute from "./components/router/PrivateRoute";
import Private from "./views/Private";
import Home from "./views/Home";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
