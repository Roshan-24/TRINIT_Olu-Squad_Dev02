import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: props => ({
    "::-webkit-scrollbar": {
      width: 3
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: mode("gray.300", "gray.900")(props)
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: mode("gray.500", "gray.600")(props)
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: mode("gray.400", "gray.700")(props)
    },
    body: {
      margin: 0,
      bg: mode("gray.200", "gray.800")(props)
    }
  })
};

export default styles;
