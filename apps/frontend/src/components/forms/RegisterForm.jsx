import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  useBoolean,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useMutation } from "react-query";
import { useAxios } from "../../config/axios";

const RegisterForm = ({ setLogin }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const [isVisible, setVisible] = useBoolean();

  const axiosInstance = useAxios();
  const toast = useToast();

  const { isLoading, mutate, error } = useMutation(
    "register",
    data => axiosInstance({ method: "post", url: "/register", data }),
    {
      onSuccess: () => {
        toast({
          description: "User registered successfully! You can now login with those credentials",
          status: "success"
        });
        setLogin();
      },
      onError: error => {
        error.response &&
          error.response.status !== 400 &&
          toast({
            description: "Something went wrong",
            status: "error"
          });
      }
    }
  );

  const formErrors = error?.response?.data.errors;
  const onSubmit = values => mutate(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <Heading fontSize={"3xl"}>Register</Heading>
        <FormControl isInvalid={errors.firstName}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<FiUser />} />
            <Input
              id="firstName"
              variant={"filled"}
              placeholder="Enter your first name"
              {...register("firstName", { required: "This field is required" })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.firstName && errors.firstName.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.lastName}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<FiUser />} />
            <Input
              id="lastName"
              variant={"filled"}
              placeholder="Enter your last name"
              {...register("lastName", { required: "This field is required" })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.lastName && errors.lastName.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email || formErrors?.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<FiMail />} />
            <Input
              id="email"
              variant={"filled"}
              placeholder="Enter your email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email address"
                }
              })}
            />
          </InputGroup>
          <FormErrorMessage>
            {errors.email && errors.email.message}
            {formErrors?.email && formErrors.email.msg}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password || formErrors?.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<FiLock />} />
            <Input
              id="password"
              variant={"filled"}
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              {...register("password", {
                required: "This field is required",
                minLength: { value: 6, message: "Password must be more than 6 characters" }
              })}
            />
            <InputRightElement onClick={setVisible.toggle}>
              {isVisible ? <FiEye /> : <FiEyeOff />}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>
            {errors.password && errors.password.message}
            {formErrors?.password && formErrors.password.msg}
          </FormErrorMessage>
        </FormControl>
        <Spacer />
        <Button
          type={"submit"}
          isLoading={isSubmitting || isLoading}
          colorScheme={"brand"}
          w={"full"}
        >
          Create Account
        </Button>
      </VStack>
    </form>
  );
};

export default RegisterForm;
