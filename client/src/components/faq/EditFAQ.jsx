import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form'
import { useGetFAQQuery, useUpdateFAQMutation, useGetAllFAQSQuery } from '../../state/api/api'
import { useNavigate, useParams } from 'react-router-dom'
import { data } from 'autoprefixer'


const EditFAQ = () => {
  const { id } = useParams()
  const { data: FAQData, isLoading: FAQloading, isError:FAQerror} = useGetFAQQuery(id)
  const [ updateFAQ, {isLoading, isError}] = useUpdateFAQMutation()
  const { refetch } = useGetAllFAQSQuery()
  const navigate = useNavigate()
  const {
    register, handleSubmit, setValue, formState: { errors}
  } = useForm()

  useEffect(() => {
    if(FAQData) {
      setValue("answer", FAQData.answer)
      setValue("question", FAQData.question)
    }
  }, [FAQData, setValue])

  const onSubmit = async ( data) => {
    try {
      // call the update mutation
      await updateFAQ(
        { id, ...data}
      )
      // Refetch 
      refetch()
      // navigate
      navigate("/faq")
    } catch (error) {
      console.error("faq error updating:", error)
    }
  }
  if(FAQloading) {
    return <p className='text-center text-2xl mt-4'> Loading..... </p>
  }
  if(FAQerror) {
    return <p className='text-center text-2xl mt-4'> Error loading FAQ. Please reload </p>
  }
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
      className="btn"
      disabled={isLoading}>
        {
          isLoading ? "Updating..." : "Submit"
        }
          
      </button>
    </form>
  </div>
  )
}

export default EditFAQ