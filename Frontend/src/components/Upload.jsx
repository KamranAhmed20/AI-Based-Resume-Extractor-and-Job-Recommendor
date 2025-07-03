import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function Upload({ setJobs, isLoggedIn, redirectToLogin, setSelectedCity }) {
  const [file, setFile] = useState(null);
  const [cityQuery, setCityQuery] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedCityLocal, setSelectedCityLocal] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [waitingMessage, setWaitingMessage] = useState('');  // <-- NEW
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (cityQuery.length < 3) {
      setCityOptions([]);
      return;
    }

    const timeoutId = setTimeout(() => {
      fetch(
        `http://api.geonames.org/searchJSON?username=jojasef289&q=${cityQuery}&maxRows=5&lang=en`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.geonames) {
            const options = data.geonames.map(
              (item) => `${item.name}, ${item.adminName1}, ${item.countryName}`
            );
            setCityOptions(options);
          }
        })
        .catch(() => setCityOptions([]));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cityQuery]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setLoginMessage('');
    setSubmitMessage('');
    setWaitingMessage(''); // clear waiting on new file selection
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      setLoginMessage('Please login');
      redirectToLogin();
      return;
    }

    if (!file) {
      alert('Please upload your CV');
      return;
    }

    const cityToSend = selectedCityLocal || cityQuery;
    if (!cityToSend) {
      alert('Please select or enter a city');
      return;
    }

    if (!userId || !password) {
      alert('Please enter your user ID and password');
      return;
    }

    setLoading(true);
    setSubmitMessage('');
    setLoginMessage('');
    setWaitingMessage('Please wait 2 to 3 minutes, working on your CV...');  // <-- SET waiting message here

    try {
      const formData = new FormData();
      formData.append('cv', file);
      formData.append('city', cityToSend);
      formData.append('user_id', userId);
      formData.append('password', password);

      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();

      if (data.jobs) {
        setJobs(data.jobs);
      } else {
        setJobs([]);
      }

      setSelectedCity(cityToSend);
      setSubmitMessage('Submitted successfully!');
      navigate('/results');
    } catch (error) {
      console.error('Upload error:', error);
      alert('There was an error submitting your file. Please try again.');
    } finally {
      setLoading(false);
      setWaitingMessage('');  // <-- CLEAR waiting message after done
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/50 rounded-xl p-8"
        >
          <h2 className="text-4xl font-bold mb-8">Let's get started!!!</h2>
          <p className="text-gray-300 mb-8">
            Upload your resume to receive personalized job recommendations based on your skills and city.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            {/* User ID */}
            <div>
              <label htmlFor="user-id" className="block mb-2 text-gray-300 font-semibold">
                Linkedin Email
              </label>
              <input
                id="user-id"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-800 text-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your Email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-gray-300 font-semibold">
                Linkedin Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border border-gray-600 bg-gray-800 text-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* City Input */}
            <div className="relative">
              <label htmlFor="city" className="block mb-2 text-gray-300 font-semibold">
                City
              </label>
              <input
                id="city"
                type="text"
                value={cityQuery}
                onChange={(e) => {
                  setCityQuery(e.target.value);
                  setSelectedCityLocal('');
                  setSubmitMessage('');
                  setWaitingMessage('');
                }}
                placeholder="Start typing your city..."
                className="block w-full rounded-md border border-gray-600 bg-gray-800 text-gray-300 px-3 py-2 focus:outline-none focus:border-indigo-500"
              />
              {cityOptions.length > 0 && (
                <ul className="absolute z-10 bg-gray-900 border border-gray-700 rounded-md mt-1 max-h-48 overflow-auto w-full text-gray-300 cursor-pointer">
                  {cityOptions.map((option, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        setSelectedCityLocal(option);
                        setCityQuery(option);
                        setCityOptions([]);
                      }}
                      className="px-4 py-2 hover:bg-indigo-600"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* File Upload */}
            <div>
              <label
                htmlFor="file-upload"
                className="block w-full text-center rounded-full border border-indigo-600 bg-indigo-600 px-6 py-2 text-white font-semibold cursor-pointer hover:bg-indigo-700"
              >
                Upload CV (PDF)
              </label>
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {file && (
              <div className="mt-2 text-gray-400">
                Selected file: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </div>
            )}

            {loginMessage && <div className="mt-2 text-red-500 font-semibold">{loginMessage}</div>}
            {submitMessage && <div className="mt-2 text-green-500 font-semibold">{submitMessage}</div>}

            <button
              type="submit"
              disabled={!file || loading}
              className={`bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors ${
                !file || loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
              }`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>

            {/* Waiting message below button */}
            {waitingMessage && (
              <p className="mt-4 text-blue-400 font-semibold">{waitingMessage}</p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Upload;
