import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Get Ready for the job you deserve!
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Upload your CV and let our AI-powered system match you with the perfect job opportunities.
            We analyze your skills and experience to find the best matches from LinkedIn.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/upload"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="bg-white/10 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home