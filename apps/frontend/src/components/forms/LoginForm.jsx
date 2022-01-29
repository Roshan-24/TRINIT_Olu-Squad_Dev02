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
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../config/axios";
import { userContext } from "../../contexts/UserContext";

const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const { login } = useContext(userContext);
  const axiosInstance = useAxios();
  const toast = useToast();
  const navigate = useNavigate();

  const { mutate: loginUser, isLoading } = useMutation(
    "login",
    data => axiosInstance({ method: "post", url: "/login", data }),
    {
      onSuccess: data => {
        toast({
          description: "Logged in successfully",
          status: "success"
        });
        login(data.data.accessToken);
        navigate("/");
      },
      onError: error => {
        error.response &&
          error.response.status !== 500 &&
          toast({
            description: error.response.data,
            status: "error"
          });
      }
    }
  );

  const [isVisible, setVisible] = useBoolean();

  const onSubmit = values => loginUser(values);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4}>
        <Heading fontSize={"3xl"}>Login</Heading>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<FiMail />} />
            <Input
              id="email"
              placeholder="Enter your email"
              variant={"filled"}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Must be a valid email address"
                }
              })}
            />
          </InputGroup>
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents={"none"} children={<FiLock />} />
            <Input
              id="password"
              placeholder="Enter your password"
              type={isVisible ? "text" : "password"}
              variant={"filled"}
              {...register("password", { required: "This field is required" })}
            />
            <InputRightElement onClick={setVisible.toggle}>
              {isVisible ? <FiEye /> : <FiEyeOff />}
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
        </FormControl>
        <Spacer />
        <Button
          type={"submit"}
          isLoading={isSubmitting || isLoading}
          colorScheme={"brand"}
          w={"full"}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default LoginForm;
