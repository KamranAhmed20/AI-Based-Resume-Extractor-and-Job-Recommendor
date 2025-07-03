import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  LightBulbIcon, 
  ClockIcon, 
  SparklesIcon 
} from '@heroicons/react/24/outline'

function Features() {
  const features = [
    {
      icon: ChartBarIcon,
      title: "AI-Powered Analysis",
      description: "Our advanced AI algorithms analyze your CV to understand your skills and experience."
    },
    {
      icon: LightBulbIcon,
      title: "Smart Matching",
      description: "Get matched with jobs that align with your expertise and career goals."
    },
    {
      icon: ClockIcon,
      title: "Real-time Updates",
      description: "Receive instant job recommendations as soon as new opportunities arise."
    },
    {
      icon: SparklesIcon,
      title: "Personalized Results",
      description: "Get tailored job suggestions based on your unique profile and preferences."
    }
  ]

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Job Rec Sys?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900/50 rounded-xl p-6 hover:bg-gray-900 transition-colors">
                <feature.icon className="h-12 w-12 text-indigo-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Features