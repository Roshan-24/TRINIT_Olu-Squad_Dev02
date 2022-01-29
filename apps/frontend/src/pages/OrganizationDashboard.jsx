import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { navbarHeight } from "../config/constants";
import { useAxios } from "../config/axios";
import MemberList from "../components/MemberList";
import NewProjectForm from "../components/forms/NewProjectForm";

const OrganizationDashboard = () => {
  const { orgId } = useParams();

  const { isOpen, onToggle, onClose } = useDisclosure();
  const { isOpen: isModalOpen, onToggle: onModalToggle, onClose: onModalClose } = useDisclosure();

  const [orgData, setOrgData] = useState(null);
  const [isOrgLoading, setOrgLoading] = useState(true);
  const [projectsData, setProjectsData] = useState(null);
  const [isProjectsLoading, setProjectsLoading] = useState(true);

  const axiosInstance = useAxios();

  useEffect(async () => {
    setOrgLoading(true);
    setProjectsLoading(true);
    setOrgData(await axiosInstance.get(`/org/${orgId}`));
    setProjectsData(await axiosInstance.get(`/project/getByOrgId?orgId=${orgId}`));
    setProjectsLoading(false);
    setOrgLoading(false);
  }, []);

  const projects = projectsData?.data?.projects;
  const org = orgData?.data?.organization;

  return (
    <>
      <Navbar />
      <Container maxW={"container.lg"} h={"100vh"}>
        <Box w={"full"} height={navbarHeight} mb={8} />
        {isProjectsLoading || isOrgLoading ? (
          <Spinner
            size={"xl"}
            position={"absolute"}
            left={0}
            right={0}
            top={0}
            bottom={0}
            mx={"auto"}
            my={"auto"}
          />
        ) : (
          <>
            <Stack
              direction={["column", "column", "row"]}
              align={["center", "center", "end"]}
              mb={8}
            >
              <Heading fontWeight={"semibold"}>{org?.name}</Heading>
              <Spacer />
              <HStack spacing={4}>
                <Button onClick={onModalToggle}>Create new project</Button>
                <Button colorScheme={"brand"} onClick={onToggle}>
                  Members
                </Button>
              </HStack>
            </Stack>
            <SimpleGrid columns={[1, 1, 2]} spacing={5}>
              {projects.map(project => (
                <ProjectCard
                  key={project.id}
                  name={project.name}
                  description={project.description}
                />
              ))}
            </SimpleGrid>
          </>
        )}
      </Container>
      <Modal isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent p={6} minW={"550px"}>
          <ModalCloseButton />
          <ModalBody>
            <NewProjectForm orgId={orgId} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <MemberList admins={org?.owners ?? []} members={org?.members ?? []} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default OrganizationDashboard;
