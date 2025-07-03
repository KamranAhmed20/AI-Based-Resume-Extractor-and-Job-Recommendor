import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [jobList, setJobList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please choose a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("cv", file);

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.jobs) {
        setJobList(response.data.jobs);
      } else {
        setJobList([]);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload your CV</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      <div>
        <h2>Job Listings:</h2>
        {jobList.length > 0 ? (
          <ul>
            {jobList.map((job, index) => (
              <li key={index}>
                <strong>{job.title}</strong> at {job.company}
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
