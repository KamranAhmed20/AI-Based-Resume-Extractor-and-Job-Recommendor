import React, { useState, useEffect } from 'react';

function JobRecommendations({ selectedCity, jobs }) {
  const [countdown, setCountdown] = useState(null);
  const [showJobs, setShowJobs] = useState(false);
  const [jobsToShow, setJobsToShow] = useState(5);

  // No filtering by city now - show all jobs
  const filteredJobs = jobs;

  const handleShowJobs = (e) => {
    e.preventDefault();
    if (!selectedCity) {
      alert('Please select a city first');
      return;
    }
    setShowJobs(true);
    setCountdown(10); // countdown from 10 seconds
  };

  // Countdown timer effect
  useEffect(() => {
    if (countdown === null || countdown === 0) return;

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <form onSubmit={handleShowJobs} className="mb-6">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Show Jobs for {selectedCity}
        </button>
      </form>

      {countdown !== null && countdown > 0 && (
        <p className="text-lg font-semibold text-gray-700 mb-4">
          Showing jobs in {selectedCity} in {countdown} second
          {countdown > 1 ? 's' : ''}...
        </p>
      )}

      {showJobs && countdown === 0 && filteredJobs.length === 0 && (
        <p className="text-red-500 font-semibold">
          No jobs found.
        </p>
      )}

      {showJobs && countdown === 0 && filteredJobs.length > 0 && (
        <div>
          <p className="mb-4 text-gray-800 font-semibold">
            Showing top {jobsToShow} jobs:
          </p>
          <ul>
            {filteredJobs.slice(0, jobsToShow).map((job, index) => (
              <li
                key={index}
                className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold">{job.title}</h3>
                <p className="text-gray-600">{job.description}</p>
                <p className="text-sm text-gray-500">Location: {job.city}</p>
              </li>
            ))}
          </ul>

          {jobsToShow < filteredJobs.length && (
            <button
              onClick={() => setJobsToShow(jobsToShow + 5)}
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
            >
              Load More
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default JobRecommendations;
