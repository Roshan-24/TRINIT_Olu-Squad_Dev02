import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";

const MemberList = ({ admins, members }) => {
  return (
    <VStack spacing={6} p={10} h={"full"}>
      <Text fontWeight={"semibold"}>Admins</Text>
      {admins.map(admin => (
        <HStack key={admin.id} w={"full"}>
          <Box boxSize={10}>
            <Image src={`http://gravatar.com/avatar/${admin.email}?d=retro`} alt="User Avatar" />
          </Box>
          <Text pl={4} key={admin.id}>
            {admin.firstName + " " + admin.lastName}
          </Text>
        </HStack>
      ))}
      <Text fontWeight={"semibold"}>Members</Text>
      {members
        .filter(member => !admins.some(admin => admin.id === member.id))
        .map(member => (
          <HStack key={member.id} w={"full"}>
            <Box boxSize={10}>
              <Image src={`http://gravatar.com/avatar/${member.email}?d=retro`} alt="User Avatar" />
            </Box>
            <Text pl={4} key={member.id}>
              {member.firstName + " " + member.lastName}
            </Text>
          </HStack>
        ))}
    </VStack>
  );
};

export default MemberList;
