import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import UserProvider from "./context/user/UserProvider.tsx";
import system from "./data/chakraConfig.ts";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <ChakraProvider value={system}>
          <UserProvider>
            <App />
          </UserProvider>
          <Toaster />
        </ChakraProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
