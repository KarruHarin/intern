"use client"
import Image from "next/image";
import c10 from "@/app/images/p1.png";
import c11 from "@/app/images/p2.png";
import { motion } from "framer-motion";

export default function Narrative() {
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
            <div className="flex flex-col sm:flex-row items-center sm:min-h-screen bg-purple-100 px-4 md:px-[150px] py-10">
                <div className="text-center md:text-left mb-10 sm:mb-0 sm:flex-1">
                    <p className="text-purple-700 font-bold mb-2">Our Testimonial</p>
                    <h1 className="text-3xl md:text-5xl font-bold mb-5">Healing Narrative</h1>
                    <button className="bg-purple-700 w-[200px] h-[50px] rounded-lg text-white font-bold">
                        See All Reviews
                    </button>
                </div>
                <div className="flex flex-col items-center sm:flex-1 sm:ml-10">
                    <div className="flex flex-col sm:flex-row w-full bg-white mb-10 shadow-md rounded-lg overflow-hidden">
                        <div className="p-6 flex-1">
                            <p className="mb-4">Far away behind the world of mountains far from the country Volkalia and Consonatia, there live the blind text.</p>
                            <div className="font-bold text-xl mb-2">Gabby Smith</div>
                            <p className="text-gray-500">Customer</p>
                        </div>
                        <div className="w-full sm:w-[120px] h-[120px] relative">
                            <Image src={c10} alt="Gabby Smith" layout="fill" objectFit="cover" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row w-full bg-white mb-10 shadow-md rounded-lg overflow-hidden">
                        <div className="p-6 flex-1">
                            <p className="mb-4">Far away behind the world of mountains far from the country Volkalia and Consonatia, there live the blind text.</p>
                            <div className="font-bold text-xl mb-2">Flyod Weather</div>
                            <p className="text-gray-500">Customer</p>
                        </div>
                        <div className="w-full sm:w-[120px] h-[120px] relative">
                            <Image src={c11} alt="Flyod Weather" layout="fill" objectFit="cover" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
