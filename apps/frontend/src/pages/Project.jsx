import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { useAxios } from "../config/axios";
import {
  Box,
  Text,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
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
  useDisclosure
} from "@chakra-ui/react";
import KanbanCategory from "../components/kanban/KanbanCategory";

function Project() {
  const toast = useToast();
  const queryClient = useQueryClient();
  // const [project, setProject] = useState(null);
  // const [categories, setCategories] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [bcName, setBcName] = useState(null);
  const [bcId, setBcId] = useState(null);
  const [listName, setListName] = useState("");
  const [isPopoverOpen, setPopOpen] = useState(false);

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
  const { mutate: createList } = useMutation("postList", () =>
    axiosInstance(
      { method: "post", url: `/project/newBugCategory`, data: { listName, projectId } },
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
    )
  );

  // useEffect(()=>{
  // 	mutate();
  // },[])

  const { data: projectData } = useQuery("getProjectData", () =>
    axiosInstance({ method: "get", url: `project/${projectId}` })
  );
  console.log(projectData);
  const project = projectData?.data?.data;
  const categories = projectData?.data?.data?.bugCategories;

  const openModal = (bugCategoryName, bugCategoryId) => {
    setBcName(bugCategoryName);
    setBcId(bugCategoryId);
    // console.log(bugCategoryName,bugCategoryId);
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
            <Text fontSize={"3vh"} fontWeight={"bold"}>
              {project.organization.name}
            </Text>
            <Text fontSize={"3vh"} position={"relative"} top={"-5px"} fontWeight={"bold"}>
              {"→"}
            </Text>
            <Text fontSize={"3vh"} fontWeight={"bold"}>
              {project.name}
            </Text>
            <Spacer></Spacer>
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
                    listName != "" && createList();
                  }}
                >
                  Add
                </Button>
              </PopoverContent>
            </Popover>
            <Button>Members</Button>
          </HStack>
          <Box width={"100%"}>
            <HStack overflowX={"auto"} spacing={"24px"} pb={"15px"}>
              {categories.map(item => (
                <KanbanCategory openModal={openModal} key={item.id} data={item} />
              ))}
            </HStack>
          </Box>
        </Box>
      ) : (
        <Box></Box>
      )}
    </div>
  );
}

export default Project;
