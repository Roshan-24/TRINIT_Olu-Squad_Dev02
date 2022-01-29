import { Box, useColorModeValue } from "@chakra-ui/react";

function KanbanItem2({ data }) {
  const bgColor = useColorModeValue("#e3e6f0", "#22222d");
  const borderColor = useColorModeValue("#ccd", "#151515");

  return (
    <div style={{ width: "100%" }}>
      <Box
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
        width={"100%"}
      >
        {data.name}
      </Box>
    </div>
  );
}

export default KanbanItem2;
