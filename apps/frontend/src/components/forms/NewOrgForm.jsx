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
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useAxios } from "../../config/axios";

const NewOrgForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const axiosInstance = useAxios();
  const toast = useToast();

  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = useMutation(
    "createOrg",
    data => axiosInstance({ method: "post", url: "/org/new", data }),
    {
      onSuccess: data => {
        toast({
          description: `Organization ${data.data.organization.name} successfully created`,
          status: "success"
        });
        queryClient.invalidateQueries("userOrgs");
      }
    }
  );

  const formErrors = error?.response?.data.errors;
  const onSubmit = values => mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack>
        <Heading fontSize={"3xl"}>Create new Organization</Heading>
        <Spacer />
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<HiOutlineOfficeBuilding />} />
            <Input
              id="name"
              placeholder="Enter the name of the organization"
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
            <InputLeftElement pointerEvents={"none"} children={<HiOutlineOfficeBuilding />} />
            <Input
              id="description"
              placeholder="Enter the description of the organization"
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

export default NewOrgForm;
