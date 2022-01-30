import { Box, Text, HStack, Spacer, Image, useColorModeValue } from "@chakra-ui/react";
import { parseISO } from "date-fns";

function ThreadPost({ data }) {
  const bgColor = useColorModeValue("#EDF2F7", "#171A25");
  return (
    <div>
      <HStack spacing="15px" mb={"15px"}>
        <Image
          width={"30px"}
          borderRadius={"10px"}
          src={`https://gravatar.com/avatar/${data?.user?.hashedEmail}?d=retro`}
        />
        <Text fontSize={"2.3vh"} fontWeight={"bold"}>
          {data?.user?.firstName}
        </Text>
        <Spacer></Spacer>
        <Text>{"Commented at " + String(parseISO(data.createdAt)).substr(0, 33)}</Text>
      </HStack>
      <Box px={"30px"} py={"20px"} bgColor={bgColor} mb={"20px"} borderRadius={"7px"}>
        <Text fontSize={"1.7vh"}>{data?.content}</Text>
      </Box>
    </div>
  );
}

export default ThreadPost;
