import { useState } from "react";
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
  useColorModeValue
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import ThreadPost from "../components/ThreadPost";

function Bug() {
  const [comment, setComment] = useState("");
  const bgColor = useColorModeValue("#EDF2F7", "#171A25");
  const borderColor = useColorModeValue("#ccc", "#171A25");
  const borderTopColor = useColorModeValue("#ccc", "#555");
  const axiosInstance = useAxios();
  const { bugId } = useParams();
  const { data: bugData } = useQuery("getBugData", () =>
    axiosInstance({ method: "get", url: `/bug/${bugId}` })
  );
  console.log(bugData?.data?.thread);
  const thread = bugData?.data?.thread;
  const posts = thread?.Post;
  const bug = bugData?.data?.bug;
  const bugCategory = bugData?.data?.bug?.bugCategory;
  const project = bugCategory?.project;
  const raisedBy = bug?.raisedBy;
  const organization = project?.organization;

  // const { mutate: postComment } = useMutation(
  //   "postComment",
  //   () =>
  //     axiosInstance({
  //       method: "post",
  //       url: `/post/new`,
  //       data: { bugName: shortDesc, bugCategoryId: bcId, description: longDesc }
  //     }),
  //   {
  //     onSuccess: () => {},
  //     onError: err => {
  //       console.log(err);
  //     }
  //   }
  // );

  const createComment = () => {};

  return (
    <div>
      <Navbar />
      <Box mx={"15%"} pt={"100px"} className="headerTitle">
        <HStack spacing={"10px"} mb={"25px"}>
          <Link to={`/org/${organization?.id}}`}>
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
          <Text fontSize={"3vh"} fontWeight={"bold"}>
            {bug?.name}
          </Text>
          <Spacer></Spacer>
          <Image
            width={"40px"}
            borderRadius={"10px"}
            src={`https://gravatar.com/avatar/${raisedBy?.email}?d=retro`}
          />
          <Text fontSize={"2.5vh"} fontWeight={"bold"}>
            {raisedBy?.firstName}
          </Text>

          {/* <Button>Members</Button> */}
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
            float={"right"}
          >
            Comment
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default Bug;
