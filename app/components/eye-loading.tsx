'use client'

import { motion } from 'framer-motion'

export default function EyeLoader() {
  return (
    <div className="flex items-center justify-center">
      <motion.svg
        width="120"
        height="80"
        viewBox="0 0 120 80"
        className="w-24 h-16"
      >
        {/* Eyelashes */}
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 0, 1] }}
          transition={{
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {[0, 24, 48, 72, 96].map((x) => (
            <rect
              key={x}
              x={x}
              y="0"
              width="8"
              height="12"
              fill="black"
            />
          ))}
        </motion.g>

        {/* Eye Outline */}
        <path
          d="M10,40 C40,10 80,10 110,40 C80,70 40,70 10,40"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />

        {/* Eye Closing Animation */}
        <motion.path
          d="M10,40 C40,40 80,40 110,40 C80,40 40,40 10,40"
          fill="none"
          stroke="black"
          strokeWidth="3"
          initial={{ d: "M10,40 C40,40 80,40 110,40 C80,40 40,40 10,40" }}
          animate={{
            d: [
              "M10,40 C40,40 80,40 110,40 C80,40 40,40 10,40",
              "M10,40 C40,70 80,70 110,40 C80,70 40,70 10,40",
              "M10,40 C40,70 80,70 110,40 C80,70 40,70 10,40",
              "M10,40 C40,40 80,40 110,40 C80,40 40,40 10,40"
            ]
          }}
          transition={{
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Iris and Pupil */}
        <motion.g
          initial={{ opacity: 1 }}
          animate={{ opacity: [1, 0, 0, 1] }}
          transition={{
            duration: 2,
            times: [0, 0.3, 0.7, 1],
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <circle cx="60" cy="40" r="15" fill="none" stroke="black" strokeWidth="3"/>
          <circle cx="60" cy="40" r="7" fill="black"/>
        </motion.g>
      </motion.svg>
    </div>
  )
}

