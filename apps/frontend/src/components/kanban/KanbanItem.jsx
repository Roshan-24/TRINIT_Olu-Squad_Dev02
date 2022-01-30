import { Box, HStack, Spacer, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function KanbanItem({ data }) {
  const bgColor = useColorModeValue("#e3e6f0", "#22222d");
  const borderColor = useColorModeValue("#ccd", "#151515");

  const priorityColor = data.bugPriority > 7 ? "red" : data.bugPriority > 4 ? "yellow" : "green";

  return (
    <div>
      <Link to={`/bug/${data.id}`}>
        <HStack
          _hover={{ borderColor: borderColor }}
          borderWidth={1}
          borderColor={bgColor}
          userSelect={"none"}
          cursor={"pointer"}
          borderRadius={"7px"}
          backgroundColor={bgColor}
          px={"20px"}
          py={"15px"}
          my={"5px"}
        >
          <Box>{data.name}</Box>
          <Spacer />
          <Box bg={priorityColor} boxSize={2.5} rounded={"2xl"} />
        </HStack>
      </Link>
    </div>
  );
}

export default KanbanItem;
