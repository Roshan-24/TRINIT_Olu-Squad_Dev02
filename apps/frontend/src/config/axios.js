import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../contexts/UserContext";

export const useAxios = () => {
  const { accessToken } = useContext(userContext);
  const toast = useToast();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_ORIGIN,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      if (!error.response)
        toast({
          description: "Unable to receive a response from the server"
        });
      else if (error.response.status === 500)
        toast({
          description: "Something went wrong!",
          status: "error"
        });
      throw error;
    }
  );

  return axiosInstance;
};
