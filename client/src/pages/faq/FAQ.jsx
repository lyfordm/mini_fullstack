import React from 'react'
import { Link } from 'react-router-dom'
import { useGetAllFAQSQuery } from '../../state/api/api'
import FaqItem from '../../components/faq/FaqItem'

const FAQ = () => {
  const { data, isLoading, isError, refetch: refetchFAQs} = useGetAllFAQSQuery()
  return (
    <div className='section__width mt-5'>
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="heading"> <h3>Our FAQs</h3></div>
          <div>
            <Link to="/faq/create">
              <button className='btn'>Create FAQ</button>
            </Link>
          </div>
        </div>
        <ul className='mt-4'>
        {data?.map((item, index) => <FaqItem item={item} key={index} refetchFAQs={refetchFAQs}/>)}
        </ul>
      </div>
    </div>
  )
}

export default FAQ