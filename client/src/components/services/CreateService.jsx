import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateServiceMutation, useGetAllServicesQuery } from "../../state/api/api";

const CreateService = () => {
  const [ create, {isLoading, isError} ] = useCreateServiceMutation()
  const { refetch } = useGetAllServicesQuery()
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "desc", // name of field in our database
  });

  const OnSubmit = async (data) => {
    try {
      await create(data)
      console.log("service data", data);
      // reset the form
      reset();
      // refetch after creation
      refetch()
      //navigate to services page
      navigate("/services")
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-sm shadow-md">
        <h3 className="text-2xl font-bold mb-4">Service form</h3>
      <form onSubmit={handleSubmit(OnSubmit)}>
        {/* title field */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            {...register("title", {
              required: "Title is required",
            })}
            className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
          />
          <p className="text-red-500 text-xs mt-1">{errors.title?.message}</p>
        </div>
        <div className="mb-4">
          <label
            htmlFor="Description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          {fields.map((point, index) => (
            <div key={point.id} className="flex items-center space-x-2 mb-2">
              <input
                {...register(`desc.${index}.point`, {
                  required: "point is required",
                })}
                className="w-full p-2 border rounded focus:outline-none focus:ring focus:border-blue-300 resize-none"
              />
              <button type="button" className="bg-red-500 py-2 px-4 rounded-sm text-white font-semibold capitalize" onClick={() => remove(index)}>
                remove
              </button>
            </div>
          ))}
          <button type="button" className="btn" onClick={() => append({point: ""})}>Add a point</button>
          {errors.desc && (
            <p className="text-red-500 text-xs mt-1">
                At least one point is required
            </p>
          )}
        </div>
        <button
        type="submit"
        className="btn"
        disabled={fields.length === 0}>
            Submit
        </button>
      </form>
    </div>
  );
};

export default CreateService;
