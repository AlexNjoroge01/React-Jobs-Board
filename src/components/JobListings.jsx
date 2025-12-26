'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JOBS_PER_PAGE = 6;

const JobListings = ({ isHome = false, isEmployerMode = false }) => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]); // Full list for pagination
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJobs = async () => {
      // For homepage, limit to 3 recent jobs (no pagination)
      const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (Array.isArray(data)) {
          if (isHome) {
            setJobs(data);
          } else {
            setAllJobs(data);
            setJobs(data.slice(0, JOBS_PER_PAGE));
          }
        } else {
          console.error('API returned non-array data:', data);
          setJobs([]);
          setAllJobs([]);
        }
      } catch (error) {
        console.log('Error fetching Data', error);
        setJobs([]);
        setAllJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  useEffect(() => {
    if (!isHome && allJobs.length > 0) {
      const start = (currentPage - 1) * JOBS_PER_PAGE;
      const end = start + JOBS_PER_PAGE;
      setJobs(allJobs.slice(start, end));
    }
  }, [currentPage, allJobs, isHome]);

  const totalPages = Math.ceil(allJobs.length / JOBS_PER_PAGE);

  // Removed TypeScript annotation to make it valid in .jsx files
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-cyan-700 mb-6 text-center">
          {isHome ? 'Recent Jobs' : isEmployerMode ? 'Manage Your Job Listings' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobListing key={job.id} job={job} isEmployerMode={isEmployerMode} />
              ))}
            </div>

            {/* Pagination - only show for Browse Jobs and Employer Mode */}
            {!isHome && totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <nav aria-label="Pagination">
                  <ul className="inline-flex items-center -space-x-px">
                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                    </li>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page}>
                        <button
                          onClick={() => handlePageChange(page)}
                          aria-current={page === currentPage ? 'page' : undefined}
                          className={`px-3 py-2 leading-tight border ${
                            page === currentPage
                              ? 'text-blue-600 bg-blue-50 border-blue-300'
                              : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      </li>
                    ))}

                    <li>
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

            {/* Optional: Show result count */}
            {!isHome && !loading && (
              <p className="text-center text-gray-600 mt-4">
                Showing {(currentPage - 1) * JOBS_PER_PAGE + 1} -{' '}
                {Math.min(currentPage * JOBS_PER_PAGE, allJobs.length)} of {allJobs.length} jobs
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default JobListings;