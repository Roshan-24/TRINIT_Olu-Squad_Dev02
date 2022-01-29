import {
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useColorModeValue,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAxios } from "../../config/axios";

const Search = props => {
  const [queryResults, setQueryResults] = useState([]);

  const hoverBgColor = useColorModeValue("gray.300", "gray.500");

  const axiosInstance = useAxios();

  const handleChange = async e => {
    const query = e.target.value;
    const response = await axiosInstance.post(`/project/search?q=${query}`);
    setQueryResults(response.data.projects);
  };

  return (
    <Popover {...props}>
      <PopoverTrigger>
        <FiSearch />
      </PopoverTrigger>
      <PopoverContent p={4}>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>
          <VStack align={"stretch"} maxH={"300px"} overflow={"auto"}>
            <Input p={4} placeholder="Search projects" onChange={handleChange} />
            {queryResults.map(project => (
              <Link key={project.id} to={`/project/${project.id}`}>
                <Text
                  px={4}
                  py={2}
                  rounded={"lg"}
                  transition={"all .3s ease"}
                  _hover={{ bgColor: hoverBgColor }}
                >
                  {project.name}
                </Text>
              </Link>
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default Search;
