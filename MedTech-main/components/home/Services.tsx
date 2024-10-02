"use client"
import { motion } from "framer-motion"

export const Services = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 1,
        },
      }}
      viewport={{ once: true }}
    >
    <div className="mx-auto h-full w-full max-w-7xl px-2 lg:px-8 lg:mb-10 bg-purple-200">
      <div className="grid grid-cols-1 gap-y-8 text-center sm:grid-cols-2 sm:gap-12 lg:grid-cols-3 py-12">
        <div className="bg-white py-10 px-6 rounded-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
            <svg
              className="h-9 w-9 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Fetel Parameters</h3>
          <p className="mt-4 text-sm text-gray-600">
            Fetel Parameter like fetel heart rate can be monitored continously and in real time
          </p>
        </div>
        <div className="bg-white py-10 px-6 rounded-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
            <svg
              className="h-9 w-9 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Maternal Parameters</h3>
          <p className="mt-4 text-sm text-gray-600">
            Maternal parameters like maternal heart rate uterine contractions,monitored in real time
          </p>
        </div>
        <div className="bg-white py-10 px-6 rounded-md">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-600">
            <svg
              className="h-9 w-9 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
          </div>
          <h3 className="mt-8 text-lg font-semibold text-black">Doctor Consultation</h3>
          <p className="mt-4 text-sm text-gray-600">
            Enable seamless healthcare collaboration by instantly sharing real-time patient date with docors for prommpt checkups and consulations
          </p>
        </div>

      </div>
    </div>
    </motion.div>
  )
}
