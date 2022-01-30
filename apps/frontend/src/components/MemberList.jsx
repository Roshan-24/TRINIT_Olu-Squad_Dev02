import {
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Popover
} from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const MemberList = ({ isUserAdmin, admins, members, promoteFn, kickFn, addMembersFn }) => {
  const [email, setEmail] = useState("");

  return (
    <VStack spacing={6} p={10} h={"full"} align={"stretch"}>
      <Popover>
        <PopoverTrigger>
          <Button colorScheme={"brand"}>Add members</Button>
        </PopoverTrigger>
        <PopoverContent p={4}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <VStack align={"strectch"} spacing={4}>
              <Input
                placeholder="Enter email of user"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <Button onClick={() => addMembersFn(email)}>Add to org</Button>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <Text fontWeight={"semibold"}>Admins</Text>
      {admins.map(admin => (
        <HStack key={admin.id} w={"full"}>
          <Box boxSize={10}>
            <Image
              borderRadius={"10px"}
              src={`http://gravatar.com/avatar/${admin.hashedEmail}?d=retro`}
              alt="User Avatar"
            />
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
              <Image
                borderRadius={"10px"}
                src={`http://gravatar.com/avatar/${member.hashedEmail}?d=retro`}
                alt="User Avatar"
              />
            </Box>
            <Text pl={4} key={member.id}>
              {member.firstName + " " + member.lastName}
            </Text>
            {isUserAdmin && (
              <Menu>
                <MenuButton as={IconButton} icon={<BsThreeDotsVertical />} />
                <MenuList>
                  <MenuItem onClick={() => promoteFn(member.id)}>Make admin</MenuItem>
                  <MenuItem onClick={() => kickFn(member.id)}>Remove from organization</MenuItem>
                </MenuList>
              </Menu>
            )}
          </HStack>
        ))}
    </VStack>
  );
};

export default MemberList;
