import { motion } from 'framer-motion'

function About() {
  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-8">About Job Rec Sys.</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-gray-300">
                Job Rec Sys. is an innovative AI-powered platform that helps job seekers find their perfect career match. Our advanced algorithms analyze your CV and match it with relevant job opportunities from LinkedIn.
              </p>
              <p className="text-gray-300">
                We understand that finding the right job can be challenging, which is why we've developed a sophisticated system that takes into account your skills, experience, and career goals to provide personalized job recommendations.
              </p>
            </div>
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-100">
                To revolutionize the job search process by connecting talented individuals with their dream careers through innovative AI technology and data-driven insights.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About