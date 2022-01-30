import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import { useAxios } from "../config/axios";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Text,
  HStack,
  Button,
  Textarea,
  Spacer,
  Image,
  useColorModeValue,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Container
} from "@chakra-ui/react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import ThreadPost from "../components/ThreadPost";
import { HiOutlineFire, HiOutlineHand } from "react-icons/hi";
import { FaHandshake } from "react-icons/fa";
import { userContext } from "../contexts/UserContext";
import EditBugForm from "../components/forms/EditBugForm";

function Bug() {
  const [comment, setComment] = useState("");
  const { user } = useContext(userContext);

  const {
    isOpen: isEditBugOpen,
    onClose: onEditBugClose,
    onToggle: onEditBugToggle
  } = useDisclosure();

  const bgColor = useColorModeValue("#EDF2F7", "#171A25");
  const borderColor = useColorModeValue("#ccc", "#171A25");
  const borderTopColor = useColorModeValue("#ccc", "#555");
  const axiosInstance = useAxios();
  const queryClient = useQueryClient();
  const { bugId } = useParams();

  const { data: bugData } = useQuery("getBugData", () =>
    axiosInstance({ method: "get", url: `/bug/${bugId}` })
  );

  const thread = bugData?.data?.thread;
  const posts = thread?.Post;
  const bug = bugData?.data?.bug;
  const bugCategory = bugData?.data?.bug?.bugCategory;
  const project = bugCategory?.project;
  const raisedBy = bug?.raisedBy;
  const organization = project?.organization;

  const isProjectAdmin = project?.admins?.some(admin => admin.id === user.id);

  const { mutate: postComment } = useMutation(
    "postComment",
    () =>
      axiosInstance({
        method: "post",
        url: `/post/new`,
        data: { content: comment, threadId: thread.id }
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getBugData");
      },
      onError: err => {
        console.log(err);
      }
    }
  );

  const statusIconRenderer = () => {
    switch (bug?.bugStatus) {
      case "PENDING": {
        return <HiOutlineHand fontSize={"25px"} />;
      }
      case "APPROVED": {
        return <FaHandshake fontSize={"25px"} />;
      }
      case "ASSIGNED": {
        return <HiOutlineFire fontSize={"25px"} />;
      }
      case "RESOLVED": {
        return <HiOutlineFire fontSize={"25px"} />;
      }
      case "CLOSED": {
        return <HiOutlineFire fontSize={"25px"} />;
      }
      default:
        return <HiOutlineFire />;
    }
  };

  const createComment = () => {
    postComment();
    setComment("");
  };

  return (
    <div>
      <Navbar />
      <Container maxW={"container.lg"} className="headerTitle">
        <Box h={"100px"} w={"full"} />
        <HStack spacing={"10px"} mb={"25px"}>
          <Link to={`/organizations/${organization?.id}}`}>
            <Text fontSize={"3vh"} fontWeight={"bold"}>
              {organization?.name}
            </Text>
          </Link>
          <Text fontSize={"3vh"} position={"relative"} top={"-5px"} fontWeight={"bold"}>
            {"→"}
          </Text>
          <Link to={`/project/${project?.id}}`}>
            <Text fontSize={"3vh"} fontWeight={"bold"}>
              {project?.name}
            </Text>
          </Link>
          <Text fontSize={"3vh"} position={"relative"} top={"-5px"} fontWeight={"bold"}>
            {"→"}
          </Text>
          <Text fontSize={"3vh"} pr={"15px"} fontWeight={"bold"}>
            {bug?.name}
          </Text>
          {statusIconRenderer()}

          <Spacer></Spacer>

          {isProjectAdmin && (
            <>
              <Button onClick={onEditBugToggle}>Edit</Button>
              {bug?.bugStatus == "PENDING" && <Button>Approve</Button>}
            </>
          )}
          <Text fontSize={"2.5vh"} pr={"10px"}>
            {"Raised by"}
          </Text>
          <Image
            width={"40px"}
            borderRadius={"10px"}
            src={`https://gravatar.com/avatar/${raisedBy?.hashedEmail}?d=retro`}
          />
          <Text fontSize={"2.5vh"} fontWeight={"bold"}>
            {raisedBy?.firstName}
          </Text>
        </HStack>
        <Text fontSize={"2.5vh"} mb={"10px"}>
          Description
        </Text>
        <Box px="30px" py="20px" mb={"40px"} bgColor={bgColor} borderRadius={"7px"}>
          <Text fontSize={"1.8vh"}>{bug?.description}</Text>
        </Box>
        <Box>
          {posts?.map(post => (
            <ThreadPost key={post.id} data={post} />
          ))}
        </Box>
        <Box py={"20px"} borderTopColor={borderTopColor} borderTopWidth={"1px"}>
          <Textarea
            value={comment}
            onChange={e => {
              setComment(e.target.value);
            }}
            placeholder="Comment here"
            bgColor={bgColor}
            borderColor={borderColor}
          />
          <Button
            colorScheme={"green"}
            disabled={comment == ""}
            onClick={createComment}
            mt="15px"
            mb="50px"
            float={"right"}
          >
            Comment
          </Button>
        </Box>
      </Container>
      <Modal isOpen={isEditBugOpen} onClose={onEditBugClose}>
        <ModalOverlay />
        <ModalContent p={5} pb={10}>
          <ModalHeader>Edit Bug</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditBugForm
              bug={bug}
              bugCategories={project?.bugCategories}
              onSuccess={() => {
                queryClient.invalidateQueries("getBugData");
                onEditBugClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default Bug;
