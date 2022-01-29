import {
  Box,
  Button,
  Container,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Stack
} from "@chakra-ui/react";
import { useContext } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import OrgCard from "../components/OrgCard";
import { navbarHeight } from "../config/constants";
import { userContext } from "../contexts/UserContext";
import { useAxios } from "../config/axios";
import NewOrgForm from "../components/forms/NewOrgForm";

const Organization = () => {
  const { user } = useContext(userContext);

  const { isOpen, onClose, onToggle } = useDisclosure();

  const axiosInstance = useAxios();

  const { data, isLoading } = useQuery("userOrgs", () => axiosInstance({ url: "/org/user" }));

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <Container maxW={"container.lg"}>
        <Box w={"full"} mb={8} height={navbarHeight} />
        <Stack direction={["column", "column", "row"]} align={["center", "center", "end"]} mb={8}>
          <Box>
            <Heading
              fontSize={"xl"}
              fontWeight={"normal"}
              textAlign={["center", "center", "start"]}
            >
              Welcome, {user.firstName}
            </Heading>
            <Heading fontWeight={"semibold"}>Here are your organizations</Heading>
          </Box>
          <Spacer />
          <Button onClick={onToggle}>Create new organization</Button>
        </Stack>
        {isLoading && <Text>Loading...</Text>}
        <SimpleGrid columns={[1, 1, 2]} spacing={5}>
          {data?.data?.organizations?.map(org => (
            <OrgCard
              name={org.name}
              description={org.description}
              key={org.id}
              onClick={() => navigate(`/organizations/${org.id}`)}
            />
          ))}
        </SimpleGrid>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={6} minW={"550px"}>
          <ModalCloseButton />
          <ModalBody>
            <NewOrgForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Organization;
