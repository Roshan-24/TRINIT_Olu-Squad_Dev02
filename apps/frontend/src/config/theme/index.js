import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import colors from "./colors";
import fonts from "./fonts";

const config = {
  initialColorMode: "system"
};

const overrides = {
  config,
  styles,
  colors,
  fonts
};

export default extendTheme(overrides);
