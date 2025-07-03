import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Results({ selectedCity }) {
  const [jobs, setJobs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const MAX_VISIBLE = 3;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:8000/jobs');
        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setJobs([]);
      }
    };

    fetchJobs();
  }, []);

  if (!jobs || jobs.length === 0) {
    return (
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">No Results Yet</h2>
            <p className="text-gray-400">
              Please upload your CV to see job recommendations.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const visibleJobs = showAll ? jobs : jobs.slice(0, MAX_VISIBLE);

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-8">
            Our Suggestions For You
          </h2>

          <div className="space-y-6">
            {visibleJobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900/70 transition-colors relative group"
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Save job"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <h3 className="text-xl font-bold mb-2">{job.company}</h3>
                <p className="text-gray-400 text-sm mb-2">{job.location}</p>
                <h4 className="text-lg font-semibold mb-4 text-indigo-400">{job.title}</h4>
                <p className="text-gray-300 text-sm mb-4">{job.description}</p>
                
                {job.job_url ? (
                  <a
                    href={job.job_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors"
                  >
                    Apply Now
                  </a>
                ) : (
                  <span className="text-gray-500 text-sm">No application link available</span>
                )}
              </motion.div>
            ))}
          </div>

          {jobs.length > MAX_VISIBLE && !showAll && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="text-indigo-500 hover:text-indigo-400 font-medium transition-colors"
              >
                Show More Jobs
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Results;
