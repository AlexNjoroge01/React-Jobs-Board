import React from 'react'
import JobListings from '../components/JobListings'

// Reusable jobs page for both developers (browse) and employers (manage)
const JobsPage = ({ isEmployerMode = false }) => {
  return (
   <section className="bg-blue-50 px-4 py-6"> 
     <JobListings isEmployerMode={isEmployerMode} />
   </section>
  )
}

export default JobsPage