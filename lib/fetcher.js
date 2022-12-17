import useSWR from "swr";

const baseURL = process.env.NEXT_PUBLIC_API_HOST + "/";

const response = (...args) => fetch(...args).then((res) => res.json());

const useFetcher = (endpoint, props) => {
  var options = null;

  if (props) {
    options = {
      fallbackData: JSON.parse(props.response),
      revalidateOnMount: false,
    };
  }

  const { data, error } = useSWR(
    endpoint.endsWith("/undefined") ? null : `${baseURL}${endpoint}`,
    response,
    options
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useFetcher;
