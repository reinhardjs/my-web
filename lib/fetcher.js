import useSWR from "swr";

const baseURL = "http://192.168.18.51:8080/";

const response = (...args) => fetch(...args).then((res) => res.json());

const useFetcher = (endpoint) => {
  const { data, error } = useSWR(`${baseURL}${endpoint}`, response);
  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetcher;
