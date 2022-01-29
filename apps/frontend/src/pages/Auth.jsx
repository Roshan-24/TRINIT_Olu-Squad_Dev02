import {
  Box,
  Button,
  Container,
  HStack,
  Spacer,
  useBoolean,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";
import { userContext } from "../contexts/UserContext";

const Auth = () => {
  const [isLogin, setLogin] = useBoolean(true);
  const { isLoggedIn } = useContext(userContext);
  const navigate = useNavigate();

  const boxColor = useColorModeValue("white", "gray.900");

  useEffect(() => {
    if (isLoggedIn) navigate("/", { replace: true });
  }, []);

  return (
    <Container maxW={"container.sm"} minH={"100vh"} display={"flex"} flexDir={"column"}>
      <Box my={"auto"} p={6} bg={boxColor} rounded={"2xl"} shadow={"xl"}>
        <VStack align={"stretch"} spacing={3} p={[0, 4, 6]}>
          {isLogin ? <LoginForm /> : <RegisterForm setLogin={setLogin.on} />}
          {isLogin ? (
            <HStack>
              <Button fontWeight={"normal"} fontSize={"sm"} variant={"link"} colorScheme={"brand"}>
                Forgot Password?
              </Button>
              <Spacer />
              <Button
                onClick={setLogin.off}
                fontWeight={"normal"}
                fontSize={"sm"}
                variant={"link"}
                colorScheme={"brand"}
              >
                Don&apos;t have an account?
              </Button>
            </HStack>
          ) : (
            <Button
              onClick={setLogin.on}
              fontWeight={"normal"}
              fontSize={"sm"}
              variant={"link"}
              colorScheme={"brand"}
            >
              Already have an account?
            </Button>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default Auth;
