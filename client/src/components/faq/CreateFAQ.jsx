import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateFAQMutation, useGetAllFAQSQuery } from "../../state/api/api";

const CreateFAQ = () => {
  const [ create, {isLoading, isError}] = useCreateFAQMutation()
  const { refetch: refetchFAQs } = useGetAllFAQSQuery()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      //call the createFAQ mutation
      await create(data)
      console.log("faq data", data);
      // refetch FAQs after creation
      refetchFAQs()
      //reset form
      reset()
      // if successful navigate to /faq
      navigate("/faq")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-sm shadow-md border border-solid border-borderColor">
      <h2 className="text-2xl font-bold mb-4">FAQ form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* question field */}
        <div className="mb-4">

        <label
          htmlFor="question"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Question
        </label>
        <input type="text" id="question" name="question"
        {...register("question", {
            required: "Question is required",
        })}
   className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
        />
        <p className="text-red-500 text-xs mt-1">{errors.question?.message}</p>
        </div>
        {/* answer field */}
        <div className="mb-4">
            
        <label
          htmlFor="answer"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Answer
        </label>
        <textarea  id="answer" name="answer"
        {...register("answer", {
            required: "Answer is required",
        })}
        className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
        ></textarea>
        <p className="text-red-500 text-xs mt-1">{errors.answer?.message}</p>
        </div>
        <button
        type="submit"
        className="btn">
            Submit
        </button>
      </form>
    </div>
  );
};

export default CreateFAQ;
