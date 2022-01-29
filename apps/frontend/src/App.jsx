import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import Router from "./config/Router";
import theme from "./config/theme";
import UserProvider from "./contexts/UserContext";

const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <UserProvider>
            <Router />
            <CSSReset />
          </UserProvider>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default App;
