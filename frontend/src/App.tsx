/* eslint-disable jsdoc/require-returns */
import { Route, Routes } from "react-router";
import NavbarLayout from "./layouts/NavbarLayout/NavbarLayout.tsx";
import SidebarLayout from "./layouts/SidebarLayout/SidebarLayout.tsx";
import AlbumContent from "./pages/AlbumContent/AlbumContent.tsx";
import Albums from "./pages/Albums/Albums.tsx";
import Home from "./pages/Home/Home.tsx";
import Login from "./pages/Login/Login.tsx";
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
            <Route path="" element={<Home />} />
            <Route path="/albums" element={<Albums />} />
            <Route path="/albums/:albumName" element={<AlbumContent />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
