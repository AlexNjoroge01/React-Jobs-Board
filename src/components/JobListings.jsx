import React from 'react'
import {useState, useEffect} from 'react'
import JobListing from './JobListing'
import Spinner  from './Spinner'

const JobListings = ({isHome = false, isEmployerMode = false}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect( () => {
    const fetchJobs = async () => {
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs'
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          console.error('API returned non-array data:', data);
          setJobs([]);
        }

      } catch (error) {
        console.log('Error fetching Data', error);
        setJobs([]);
      } finally  {
        setLoading(false);
      }
      
    }

    fetchJobs();
  }, [])
 
   return (    
     <section className="bg-blue-50 px-4 py-10">
     <div className="container-xl lg:container m-auto">
       <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
        {isHome ? 'Recent Jobs' : isEmployerMode ? 'Manage Your Job Listings' : 'Browse Jobs'} 
       </h2>
      
        {loading ? (
          <Spinner loading={loading}/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">     
          {jobs.map((job) => (
            <JobListing key={job.id} job={job} isEmployerMode={isEmployerMode} />

              ))}
        </div>)}
        
                 
        
       
     </div>
   </section>


  )
}

export default JobListings