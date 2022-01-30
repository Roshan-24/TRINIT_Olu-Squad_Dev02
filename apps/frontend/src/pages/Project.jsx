import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "../config/axios";
import {
  Box,
  Text,
  HStack,
  Stack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  VStack,
  Textarea,
  FormLabel,
  CloseButton,
  Spacer,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Heading,
  Divider,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody
} from "@chakra-ui/react";
import KanbanCategory from "../components/kanban/KanbanCategory";
import KanbanItem2 from "../components/kanban/KanbanItem2";
import { userContext } from "../contexts/UserContext";
import MemberList from "../components/MemberList";

function Project() {
  const toast = useToast();
  const queryClient = useQueryClient();
  // const [project, setProject] = useState(null);
  // const [categories, setCategories] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [shortDesc2, setShortDesc2] = useState("");
  const [longDesc2, setLongDesc2] = useState("");
  const [bcName, setBcName] = useState(null);
  const [bcId, setBcId] = useState(null);
  const [listName, setListName] = useState("");
  const [isPopoverOpen, setPopOpen] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isRaiseOpen, setRaiseOpen] = useState(false);

  const {
    isOpen: isMembersOpen,
    onToggle: onMembersToggle,
    onClose: onMembersClose
  } = useDisclosure();

  const { user } = useContext(userContext);
  const axiosInstance = useAxios();
  const { projectId } = useParams();
  // console.log(projectId);
  // const { isLoading, mutate, error } = useMutation(
  // "getProjectData",
  // data => axiosInstance({ method: "get", url: `project/${projectId}` }),
  // {
  //  	onSuccess: (data) => {
  // 			setProject(data.data.data);
  // 			setCategories(data.data.data.bugCategories)
  // 		},
  //   	onError: error => {
  // 			console.log(err);
  // 		}
  // });

  const { mutate: createBug } = useMutation(
    "postBug",
    () =>
      axiosInstance({
        method: "post",
        url: `/bug/new`,
        data: { bugName: shortDesc, bugCategoryId: bcId, description: longDesc }
      }),
    {
      onSuccess: () => {
        toast({
          description: "Created Successfully",
          status: "success"
        });
        queryClient.invalidateQueries("getProjectData");
      },
      onError: err => {
        console.log(err);
      }
    }
  );
  const { mutate: createList } = useMutation(
    "postList",
    () =>
      axiosInstance({
        method: "post",
        url: `/project/newBugCategory`,
        data: { listName, projectId }
      }),
    {
      onSuccess: () => {
        toast({
          description: "Created Successfully",
          status: "success"
        });
        queryClient.invalidateQueries("getProjectData");
      },
      onError: err => {
        console.log(err);
      }
    }
  );
  const { mutate: createBugRequest } = useMutation(
    "postBugRequest",
    () =>
      axiosInstance({
        method: "post",
        url: `/bug/new`,
        data: { bugName: shortDesc2, bugCategoryId: pendingId, description: longDesc2 }
      }),
    {
      onSuccess: () => {
        toast({
          description: "Raised Successfully",
          status: "success"
        });
        queryClient.invalidateQueries("getProjectData");
      },
      onError: err => {
        console.log(err);
      }
    }
  );

  // useEffect(()=>{
  // 	mutate();
  // },[])

  const { data: projectData } = useQuery("getProjectData", () =>
    axiosInstance({ method: "get", url: `project/${projectId}` })
  );
  // console.log(projectData?.data?.data)
  const project = projectData?.data?.data;
  const categories = projectData?.data?.data?.bugCategories;
  let pendingId,
    pendingBugs = [];
  categories &&
    categories.map(item => {
      if (item.name == "PENDING") {
        pendingId = item.id;
        pendingBugs = item.Bug;
      }
    });
  var isProjectAdmin = false;
  project?.admins?.forEach(admin => {
    if (admin.id == user.id) isProjectAdmin = true;
  });
  const openModal = (bugCategoryName, bugCategoryId) => {
    setBcName(bugCategoryName);
    setBcId(bugCategoryId);
    // console.log(bugCategoryName,bugCategoryId);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const addToProject = async email => {
    // await axiosInstance.post(`/project/${projectId}/add`, { email });
    console.log(email);
  };

  const removeFromProject = async userId => {
    console.log(userId);
  };

  const makeProjectAdmin = async userId => {
    console.log(userId);
  };

  return (
    <div>
      <Navbar />
      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <VStack spacing={"15px"} py={"20px"} px={"20px"}>
            <HStack width={"100%"} pb={"10px"}>
              <Text textAlign={"left"} fontWeight={"semibold"} fontSize={"x-large"}>
                Add a Bug
              </Text>
              <Spacer />
              <CloseButton onClick={closeModal} />
            </HStack>
            <FormLabel textAlign={"left"} width={"100%"} fontWeight={"semibold"}>
              Bug category
            </FormLabel>
            <Input value={bcName} disabled={true} type={"text"} />
            <FormLabel textAlign={"left"} width={"100%"} fontWeight={"semibold"}>
              Short description
            </FormLabel>
            <Input
              value={shortDesc}
              onChange={e => {
                setShortDesc(e.currentTarget.value);
              }}
              type={"text"}
            />
            <FormLabel width={"100%"} fontWeight={"semibold"} textAlign={"left"}>
              Description
            </FormLabel>
            <Textarea
              onChange={e => {
                setLongDesc(e.currentTarget.value);
              }}
              value={longDesc}
            />
            <Button
              onClick={() => {
                createBug();
                closeModal();
              }}
              alignSelf={"flex-end"}
            >
              Create
            </Button>
          </VStack>
        </ModalContent>
      </Modal>
      {project && categories ? (
        <Box mx={"5%"} pt={"100px"} className="headerTitle">
          <HStack spacing={"15px"} mb={"25px"}>
            <Link to={`/organizations/${project?.organization?.id}}`}>
              <Text fontSize={"3vh"} fontWeight={"bold"}>
                {project.organization.name}
              </Text>
            </Link>
            <Text fontSize={"3vh"} position={"relative"} top={"-5px"} fontWeight={"bold"}>
              {"→"}
            </Text>
            <Text fontSize={"3vh"} fontWeight={"bold"}>
              {project.name}
            </Text>
            <Spacer></Spacer>
            <Button
              onClick={() => {
                setRaiseOpen(true);
              }}
            >
              Raise a Bug
            </Button>
            <Button
              onClick={() => {
                setOpenModal(true);
              }}
            >
              Bug Requests
            </Button>
            <Modal
              motionPreset="slideInRight"
              onClose={() => {
                setOpenModal(false);
              }}
              isOpen={isOpenModal}
            >
              <ModalOverlay />
              <ModalContent pb={5} w={"100%"}>
                <ModalHeader>
                  <Heading textAlign={"center"}>Bug Requests</Heading>
                </ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                  <VStack>
                    {pendingBugs &&
                      pendingBugs.map(item => (
                        <Link key={item.id} to={"/bugs/" + item.id} style={{ width: "100%" }}>
                          <KanbanItem2 data={{ name: item.name }} />
                        </Link>
                      ))}
                  </VStack>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Modal
              motionPreset="slideInRight"
              onClose={() => {
                setRaiseOpen(false);
              }}
              isOpen={isRaiseOpen}
            >
              <ModalOverlay />
              <ModalContent pb={5} w={"100%"}>
                <ModalHeader>
                  <Heading textAlign={"center"}>Raise a bug</Heading>
                </ModalHeader>
                <Divider />
                <ModalCloseButton />
                <ModalBody>
                  <FormLabel textAlign={"left"} width={"100%"} fontWeight={"semibold"}>
                    Bug category
                  </FormLabel>
                  <Input value={"PENDING"} disabled={true} type={"text"} />
                  <FormLabel textAlign={"left"} width={"100%"} fontWeight={"semibold"} pt={"3"}>
                    Short description
                  </FormLabel>
                  <Input
                    value={shortDesc2}
                    onChange={e => {
                      setShortDesc2(e.currentTarget.value);
                    }}
                    type={"text"}
                  />
                  <FormLabel width={"100%"} fontWeight={"semibold"} textAlign={"left"} pt={"3"}>
                    Description
                  </FormLabel>
                  <Textarea
                    onChange={e => {
                      setLongDesc2(e.currentTarget.value);
                    }}
                    value={longDesc2}
                  />
                  <Button
                    onClick={() => {
                      setRaiseOpen(false);
                      shortDesc2 !== "" && longDesc2 !== "" && createBugRequest();
                    }}
                    mt={"3"}
                  >
                    Request
                  </Button>
                </ModalBody>
              </ModalContent>
            </Modal>
            {isProjectAdmin && (
              <Popover
                isOpen={isPopoverOpen}
                onOpen={() => {
                  setPopOpen(true);
                }}
                onClose={() => {
                  setPopOpen(false);
                }}
                closeOnBlur={true}
              >
                <PopoverTrigger>
                  <Button>+ Add List</Button>
                </PopoverTrigger>
                <PopoverContent padding={"4"}>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <FormLabel>Enter list name</FormLabel>
                  <Input
                    type={"text"}
                    value={listName}
                    onChange={e => {
                      setListName(e.target.value);
                    }}
                  ></Input>
                  <Button
                    colorScheme={"green"}
                    mt={"4"}
                    onClick={() => {
                      if (listName != "") {
                        createList();
                        setListName("");
                      }
                    }}
                  >
                    Add
                  </Button>
                </PopoverContent>
              </Popover>
            )}
            <Button onClick={onMembersToggle}>Members</Button>
          </HStack>
          <Box width={"100%"}>
            <Stack
              overflowX={"auto"}
              direction={["column", "column", "row", "row"]}
              spacing={"24px"}
              pb={"15px"}
            >
              {categories.map(item => (
                <KanbanCategory
                  isProjectAdmin={isProjectAdmin}
                  openModal={openModal}
                  key={item.id}
                  data={item}
                />
              ))}
            </Stack>
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
      <Drawer isOpen={isMembersOpen} placement="right" onClose={onMembersClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <MemberList
              isUserAdmin={project?.admins.some(owner => owner.id === user.id)}
              promoteFn={makeProjectAdmin}
              kickFn={removeFromProject}
              addMembersFn={addToProject}
              admins={project?.admins ?? []}
              members={project?.members ?? []}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Project;
