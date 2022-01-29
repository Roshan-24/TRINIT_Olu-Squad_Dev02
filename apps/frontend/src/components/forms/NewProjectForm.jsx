import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  useToast,
  VStack
} from "@chakra-ui/react";
import { AiOutlineProject } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAxios } from "../../config/axios";

const NewProjectForm = ({ orgId, refetchProjects }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const axiosInstance = useAxios();
  const toast = useToast();

  const { mutate, isLoading, error } = useMutation(
    "createProject",
    data => axiosInstance({ method: "post", url: "/project/new", data }),
    {
      onSuccess: data => {
        toast({
          description: `Project ${data.data.project.name} successfully created`,
          status: "success"
        });
        refetchProjects();
      }
    }
  );

  const formErrors = error?.response?.data.errors;
  const onSubmit = values => mutate({ ...values, orgId });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Heading fontSize={"3xl"}>Create new Project</Heading>
        <Spacer />
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<AiOutlineProject />} />
            <Input
              id="name"
              placeholder="Enter the name of the project"
              variant={"filled"}
              {...register("name", {
                required: "This field is required"
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.name && errors.name.message}
            {formErrors?.name && formErrors.name.msg}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<AiOutlineProject />} />
            <Input
              id="description"
              placeholder="Enter the description of the project"
              variant={"filled"}
              {...register("description", {
                required: "This field is required"
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.description && errors.description.message}
            {formErrors?.description && formErrors.description.msg}
          </FormErrorMessage>
        </FormControl>
        <Spacer />
        <Button
          type={"submit"}
          isLoading={isSubmitting || isLoading}
          colorScheme={"brand"}
          w={"full"}
        >
          Create
        </Button>
      </VStack>
    </form>
  );
};

export default NewProjectForm;
