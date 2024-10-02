"use client"
import { FaRegCheckCircle } from "react-icons/fa";
import Image from "next/image";
import doc from "@/app/images/preg.png";
import { motion } from "framer-motion";

export const TextCard = () => {
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
    <div id="product" className="w-full h-full bg-white">
      <div className="max-w-7xl mx-auto lg:flex lg:gap-x-8 lg:px-8">
        {/* Text Content */}
        <div className="flex flex-col justify-center lg:flex-1 px-6 sm:px-0 py-12">
          <h1 className="mt-8 text-4xl lg:text-left text-center sm:text-2xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            Bhrunomatra: Smart Wearable Pregnancy Monitoring Device
          </h1>
          <p className="mt-8 sm:text-left text-center text-lg text-gray-700">
            Pregnancy-related complications are a global issue, especially in developing countries. In 2017, about 29,50,000 women died during and following pregnancy and childbirth. Every year, about 2 million babies are stillborn, of which 40 percent occur during labor.
          </p>
          <p className="mt-8 sm:text-left text-center text-lg text-gray-700">
            To reduce the global burden, Kaustubha Medtech Pvt. Ltd. proposes a wearable pregnancy device, Bhrunomatra, for monitoring pregnancy, labor, delivery, and post-pregnancy, especially for people in low-resource settings.
          </p>
        </div>

        {/* Image */}
        {/* <div className="relative lg:flex-1 h-[500px] lg:h-[500px] sm:mt-[100px] mt-0">
          <Image
            className="object-fill"
            src={doc}
            alt="Illustration of the wearable pregnancy monitoring device"
            layout="fill"
          />
        </div> */}

        {/* Features List */}
        <div className="lg:flex-1 sm:mt-[200px] mt-10 mb-12 pb-5 px-4 h-full bg-white shadow-lg rounded-lg">
          {[
            "Continuous monitoring for pregnancy",
            "Helps in photo charting",
            "Nonstress test (NST) & Contraction Stress Test (CST)",
            "Multiple parameter detection",
            "Real-world evidence. Cloud computing "
          ].map((feature, index) => (
            <div key={index} className="flex items-center mb-4">
              <FaRegCheckCircle size={22} className="text-blue-600 mr-2" />
              <p className="text-sm text-gray-800 font-bold">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </motion.div>
  );
};
