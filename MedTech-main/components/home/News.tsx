"use client"
import Image from 'next/image';
import p1 from "@/app/images/gallery-3.jpg";
import p2 from "@/app/images/gallery-4.jpg";
import p3 from "@/app/images/gallery-1.jpg";
import p4 from "@/app/images/gallery-2.jpg";
import p5 from "@/app/images/p5.png";
import p6 from "@/app/images/p6.png";
import { motion } from 'framer-motion';

export default function News() {
    const images = [p1, p2, p3, p4,];

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
            <div id="news" className="flex flex-col items-center sm:h-screen sm:p-4  p-6">
                <h1 className="text-5xl font-bold mb-8 text-center">
                    Latest News
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 w-full max-w-4xl">
                    {images.map((image, index) => (
                        <div key={index} className="relative w-full h-0 pb-[35vh]"> {/* 16:9 Aspect Ratio */}
                            <Image
                                src={image}
                                alt={`Photo ${index + 1}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
