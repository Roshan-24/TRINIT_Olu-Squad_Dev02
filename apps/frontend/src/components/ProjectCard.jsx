import { Text, useColorModeValue, VStack } from "@chakra-ui/react";

const ProjectCard = ({ name, description, onClick }) => {
  const cardBg = useColorModeValue("gray.300", "gray.900");

  return (
    <VStack
      px={8}
      py={4}
      spacing={1}
      align={"start"}
      minW={100}
      rounded={"xl"}
      bgColor={cardBg}
      shadow={"sm"}
      transition={"all .2s ease"}
      _hover={{ shadow: "xl", cursor: "pointer" }}
      onClick={onClick}
    >
      <Text fontWeight={"semibold"}>{name}</Text>
      <Text>{description}</Text>
    </VStack>
  );
};

export default ProjectCard;
