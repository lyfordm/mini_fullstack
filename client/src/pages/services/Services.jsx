import { Link } from "react-router-dom"
import { useGetAllServicesQuery } from "../../state/api/api"
import ServiceCard from "../../components/services/ServiceCard"

const Services = () => {
  const { data, isLoading, isError, refetch: refetchServices} = useGetAllServicesQuery()
  return (
    <div className='section__width mt-5'>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="heading"> <h3>Our Service</h3></div>
          <div>
            <Link to="/services/create">
              <button className='btn'>Create Service</button>
            </Link>
          </div>
        </div>
        <div className="section__width grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7 mt-7 lg:mt-12">
          {data?.map((item, index) => (
            <ServiceCard item={item} key={index} refetchServices={refetchServices}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services