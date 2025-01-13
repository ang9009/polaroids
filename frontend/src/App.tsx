import { Route, Routes } from "react-router";
import NavbarLayout from "./layouts/NavbarLayout/NavbarLayout.tsx";
import Home from "./pages/home/Home.tsx";
import Login from "./pages/login/Login.tsx";
import PrivateRoutes from "./routes/PrivateRoutes.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<NavbarLayout />}>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
