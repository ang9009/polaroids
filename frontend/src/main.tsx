import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { Provider } from "./components/ui/provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import system from "./data/chakraConfig.ts";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <BrowserRouter>
          <ChakraProvider value={system}>
            <App />
            <Toaster />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>,
);
