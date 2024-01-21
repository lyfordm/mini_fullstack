import React from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useDeleteServiceMutation } from '../../state/api/api';

const ServiceCard = ({item, refetchServices}) => {
    const [deleteService, {isLoading, isError}] = useDeleteServiceMutation()
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            await deleteService(item._id)
            // after deleting refetch
            refetchServices()
        } catch (error) {
            console.error("Error deleting Service:", error)
        }
    }
    const handleUpdate = () => {
        refetchServices()
        navigate(`/services/edit/${item._id}`)
    }
  return (
    <div className='py-7 px-3 lg:px-5 border border-solid border-borderColor rounded-md'>
        <h2 className="text-2xl text-center leading-9 text-headingColor font-bold">{item.title}</h2>
        <ul className='list-disc text-lg leading-7 font-medium mt-4 px-5'>
            {item.desc.map((point, index) => (
                <li key={index}>{point.point}</li>
            ))}
        </ul>
        <div className='flex gap-4 mt-2'>
            <CiEdit color='green' size={24} onClick={handleUpdate}/>
            <MdDelete color='red' size={24} onClick={handleDelete}/>
        </div>

    </div>
  )
}

export default ServiceCard