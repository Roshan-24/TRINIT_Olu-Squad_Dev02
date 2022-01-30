import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Spacer,
  useToast,
  VStack
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useAxios } from "../../config/axios";

const EditBugForm = ({ bug, onSuccess, bugCategories }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm();

  const [sliderValue, setSliderValue] = useState(bug.bugPriority);

  const axiosInstance = useAxios();
  const toast = useToast();

  const { mutate, isLoading, error } = useMutation(
    "createProject",
    data => axiosInstance({ method: "put", url: `/bug/${bug.id}`, data }),
    {
      onSuccess: () => {
        onSuccess();
        toast({
          description: `Edited successfully`,
          status: "success"
        });
      }
    }
  );

  const formErrors = error?.response?.data.errors;
  const onSubmit = values => {
    mutate({ ...values, priority: sliderValue });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={5}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            defaultValue={bug.name}
            placeholder="Enter the name of the bug"
            variant={"filled"}
            {...register("name", {
              required: "This field is required"
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
            {formErrors?.name && formErrors.name.msg}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.description}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Input
            id="description"
            defaultValue={bug.description}
            placeholder="Enter the description of the bug"
            variant={"filled"}
            {...register("description", {
              required: "This field is required"
            })}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
            {formErrors?.description && formErrors.description.msg}
          </FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="priority">Bug priority</FormLabel>
          <Slider
            id="priority"
            defaultValue={bug.bugPriority}
            onChangeEnd={value => setSliderValue(value)}
            min={1}
            max={10}
            {...register("priority")}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="category">Bug category</FormLabel>
          <Select
            defaultValue={bug?.bugCategory.id}
            {...register("bugCategoryId", {
              required: "This field is required"
            })}
          >
            {bugCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </FormControl>
        <Spacer />
        <Button
          type={"submit"}
          isLoading={isSubmitting || isLoading}
          colorScheme={"brand"}
          w={"full"}
        >
          Save changes
        </Button>
      </VStack>
    </form>
  );
};

export default EditBugForm;
