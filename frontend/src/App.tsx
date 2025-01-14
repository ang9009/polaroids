import { Route, Routes } from "react-router";
import NavbarLayout from "./layouts/NavbarLayout/NavbarLayout.tsx";
import SidebarLayout from "./layouts/SidebarLayout/SidebarLayout.tsx";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import PrivateRoutes from "./routes/PrivateRoutes.tsx";

/**
 * The main app component. All routes are listed here.
 */
const App = () => {
  return (
    <Routes>
      <Route element={<NavbarLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route element={<SidebarLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
