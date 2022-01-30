import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  VStack
} from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import BugFixSVG from "../../assets/bug-fixing.svg";
import { Link } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import { useContext } from "react";

const Home = () => {
  const { isLoggedIn } = useContext(userContext);

  return (
    <>
      <Navbar />
      <Box h={"100px"} w={"full"} />
      <Container maxW={"container.xl"} px={75}>
        <HStack>
          <VStack align={"start"} spacing={8}>
            <VStack spacing={2} align={"start"}>
              <Heading>Fix bugs together</Heading>
              <Text fontSize={"lg"}>
                Collaborate with team members easier, faster and more professional
              </Text>
            </VStack>
            <Link to={!isLoggedIn ? "/signIn" : "/organizations"}>
              <Button colorScheme={"brand"}>Get started</Button>
            </Link>
          </VStack>
          <Spacer />
          <Image src={BugFixSVG} alt="Bug fixing" w={500} h={500} />
        </HStack>
      </Container>
    </>
  );
};

export default Home;
