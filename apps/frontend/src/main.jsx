import { ColorModeScript } from "@chakra-ui/react";
import { StrictMode } from "react";
import { render } from "react-dom";
import App from "./App";
import theme from "./config/theme";

render(
  <StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </StrictMode>,
  document.getElementById("root")
);
