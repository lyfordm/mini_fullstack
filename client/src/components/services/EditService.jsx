import { useEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useGetServiceQuery, useUpdateServiceMutation, useGetAllServicesQuery } from '../../state/api/api'
import { useNavigate, useParams } from 'react-router-dom'

const EditService = () => {
    const { id } = useParams()
    const { data: ServiceData, isLoading, isError } = useGetServiceQuery(id)
    const [ updateService, { isLoading: updateLoading, isError: updateError} ] = useUpdateServiceMutation()
    const { refetch } = useGetAllServicesQuery()
    const navigate = useNavigate()

    const { register, control, handleSubmit, formState: { errors, isSubmitting}, setValue} = useForm({
        defaultValues: {
            title: ServiceData?.title || '', // set initial value from api
            desc: ServiceData?.desc || [], // set initial value from api
        }
    })
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'desc'
    })

    useEffect(() => {
        if(ServiceData) {
            setValue('title', ServiceData.title)
            setValue('desc', ServiceData.desc)
        }
    }, [ServiceData, setValue])

    const onSubmit = async (data) => {
        try {
            // call the update mutation
            await updateService({id, ...data})
            // refetch 
            refetch()
            // navigate
            navigate('/services')
        } catch (error) {
            console.error("Error updating", error)
        }
    }
   if (isError) {
    return (
        <div className='text-center text-2xl mt-4'>
            Error getting service. Please reload
        </div>
    )
   }
  return (
    <div  className="max-w-md mx-auto mt-8 p-6 bg-white rounded-sm shadow-md border border-solid border-borderColor">
    <h2 className="text-2xl font-bold mb-4">Edit service</h2>
    {isLoading ? ( <p className='text-center text-2xl'>Loading</p>) : (
        <form onSubmit={handleSubmit(onSubmit)}>
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
        disabled={updateLoading || fields.length === 0}>
            {updateLoading ? "Updating" : "Submit"}
           
        </button>
        </form>
    )}

    </div>
  )
}

export default EditService