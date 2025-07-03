// JobApp.jsx
import React, { useState } from 'react';
import Upload from './Upload';
import JobRecommendations from './JobRecommendations';

function JobApp() {
  const [jobs, setJobs] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume logged in, handle your auth logic
  const redirectToLogin = () => {
    alert('Redirecting to login...');
    // Your routing logic here
  };

  return (
    <div>
      <Upload
        setJobs={setJobs}
        isLoggedIn={isLoggedIn}
        redirectToLogin={redirectToLogin}
        setSelectedCity={setSelectedCity} // Pass city setter to update selectedCity
      />
      {/* Show job recommendations only if city selected */}
      {selectedCity && jobs.length > 0 && (
        <JobRecommendations selectedCity={selectedCity} jobs={jobs} />
      )}
    </div>
  );
}

export default JobApp;
