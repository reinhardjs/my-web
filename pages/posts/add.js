import axios from "axios";
import { useForm } from "react-hook-form";

const Login = () => {
  const form = useForm();
  const { handleSubmit, register } = form;

  const onSubmit = (data) => {
    data.title = "This-is-title";
    data.nickname = "reinhardjs";
    data.tags = "learn-kubernetes";
    data.url = "intro-to-kubernetes-2";

    axios.post("http://192.168.18.51:8080/posts", data).then(
      (response) => {
        const { data } = response;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <div className="grid h-screen place-items-center">
        <div className="min-w-full">
          <form
            className="m-auto mt-10 mb-10 max-w-6xl bg-white py-8 px-7"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="space-y-4 p-2 sm:p-4 md:space-y-6">
              <textarea
                id="message"
                rows="4"
                className="block p-2.5 w-full text-xs text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your thoughts here..."
                onChange={(e) => {
                  console.log(e.target.value);
                }}
                {...register("content", {
                  required: true,
                })}
              ></textarea>

              <div className="pt-2.5">
                <button
                  className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  type={"submit"}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
