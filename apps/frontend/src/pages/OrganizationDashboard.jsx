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
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import { navbarHeight } from "../config/constants";
import { useAxios } from "../config/axios";
import MemberList from "../components/MemberList";
import NewProjectForm from "../components/forms/NewProjectForm";
import { userContext } from "../contexts/UserContext";

const OrganizationDashboard = () => {
  const { orgId } = useParams();
  const { user } = useContext(userContext);

  const { isOpen, onToggle, onClose } = useDisclosure();
  const { isOpen: isModalOpen, onToggle: onModalToggle, onClose: onModalClose } = useDisclosure();

  const [orgData, setOrgData] = useState(null);
  const [isOrgLoading, setOrgLoading] = useState(true);
  const [projectsData, setProjectsData] = useState(null);
  const [isProjectsLoading, setProjectsLoading] = useState(true);

  const axiosInstance = useAxios();
  const navigate = useNavigate();

  useEffect(async () => {
    setOrgLoading(true);
    setProjectsLoading(true);
    setOrgData(await axiosInstance.get(`/org/${orgId}`));
    setProjectsData(await axiosInstance.get(`/project/getByOrgId/${orgId}`));
    setProjectsLoading(false);
    setOrgLoading(false);
  }, []);

  const refetchProjects = async () => {
    setProjectsLoading(true);
    setProjectsData(await axiosInstance.get(`/project/getByOrgId/${orgId}`));
    setProjectsLoading(false);
  };

  const refetchOrgs = async () => {
    setOrgLoading(true);
    setOrgData(await axiosInstance.get(`/org/${orgId}`));
    setOrgLoading(false);
  };

  const addToOrg = async email => {
    await axiosInstance.post(`/org/${orgId}/add`, { email });
    await refetchOrgs();
  };

  const makeOrgOwner = async userId => {
    await axiosInstance.post(`/org/${orgId}/makeOwner`, { userId });
    await refetchOrgs();
  };

  const removeFromOrg = async userId => {
    await axiosInstance.post(`/org/${orgId}/remove`, { userId });
    await refetchOrgs();
  };

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
                  onClick={() => navigate(`/project/${project.id}`)}
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
            <NewProjectForm orgId={orgId} refetchProjects={refetchProjects} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <MemberList
              isUserAdmin={org?.owners.some(owner => owner.id === user.id)}
              promoteFn={makeOrgOwner}
              kickFn={removeFromOrg}
              addMembersFn={addToOrg}
              admins={org?.owners ?? []}
              members={org?.members ?? []}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default OrganizationDashboard;
