import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useAxios } from "../../config/axios";

const Search = () => {
  const [queryResults, setQueryResults] = useState([]);
  const [query, setQuery] = useState("");
  const navbarBg = useColorModeValue("white", "gray.900");

  const axiosInstance = useAxios();

  const handleChange = async e => {
    const query = e.target.value;
    const response = await axiosInstance.post(`/project/search?q=${query}`);
    setQuery(query);
    if (query.length) setQueryResults(response.data.projects);
  };

  return (
    <Menu isOpen={queryResults.length && query.length}>
      <InputGroup w={"275px"}>
        <InputLeftElement pointerEvents={"none"} children={<FiSearch />} />
        <Input placeholder="Search projects..." value={query} onChange={handleChange} />
        {query.length && (
          <InputRightElement>
            <FiX cursor={"pointer"} onClick={() => setQuery("")} />
          </InputRightElement>
        )}
      </InputGroup>
      <MenuButton onClick={null} pt={0} pos={"absolute"} />
      <MenuList bg={navbarBg}>
        {queryResults.map(project => (
          <MenuItem key={project.id}>
            <Link to={`/project/${project.id}`}>
              <Text>{project.name}</Text>
            </Link>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Search;
