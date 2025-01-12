import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "./components/chakra/provider.tsx";
import "./index.css";
import NavbarLayout from "./layouts/NavbarLayout/NavbarLayout.tsx";
import Login from "./pages/Login/Login.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route element={<NavbarLayout />}>
            <Route path="/" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
