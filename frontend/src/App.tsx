import { Route, Routes } from "react-router";
import NavbarLayout from "./layouts/NavbarLayout/NavbarLayout.tsx";
import Login from "./pages/Login/Login.tsx";

const App = () => {
  return (
    <Routes>
      <Route element={<NavbarLayout />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
