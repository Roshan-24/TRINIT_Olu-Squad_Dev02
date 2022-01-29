import { Box, Text, Spacer, HStack, Button, useColorModeValue } from "@chakra-ui/react";
import KanbanItem from "./KanbanItem";
// import {Link} from 'react-router-dom'

function KanbanCategory({ openModal, data }) {
  const bgColor = useColorModeValue("#EDF2F7", "#171A25");

  return (
    <div>
      <Box
        height={"75vh"}
        borderRadius={10}
        p={"25px"}
        paddingRight={"15px"}
        width={"375px"}
        backgroundColor={bgColor}
      >
        <HStack>
          <Text userSelect={"none"} fontSize={"2.5vh"} fontWeight={"semibold"}>
            {data.name}
          </Text>
          <Spacer />
          <Button
            onClick={() => {
              openModal(data.name, data.id);
            }}
          >
            plus
          </Button>
        </HStack>
        <Box overflowY={"auto"} height={"93.5%"} mt={"10px"} paddingRight={"10px"}>
          {data.Bug.map(item => (
            <KanbanItem key={item.id} data={item} />
          ))}
          {data.Bug.map(item => (
            <KanbanItem key={item.id} data={item} />
          ))}
          {data.Bug.map(item => (
            <KanbanItem key={item.id} data={item} />
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default KanbanCategory;
