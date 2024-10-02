"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/app/images/logo.png"
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      viewport={{ once: true }}
    >
      <footer id="footer" className="w-full bg-[#F3E8FF] text-black">
        <div className="mx-auto flex flex-col px-4 py-8 max-w-full lg:max-w-[90%] space-y-8 md:space-y-0 md:flex-row md:justify-between">
          {/* Section with Social Icons and Facebook Embed */}
          <div className="flex flex-col items-center md:items-start md:w-1/2">
            <Image alt="logo" src={logo} height={150} width={100} />
            <iframe allowFullScreen={true} src="https://www.youtube.com/embed/_Y66177Gtg8" className="text-md font-medium max-w-sm text-center md:text-left mb-4">
            </iframe> 
            <Button variant='link' className="px-0 uppercase font-semibold">Get in touch &gt;</Button>
            {/* <div className="w-full">
              <div className="relative pb-[56.25%] h-[60vh]"> 
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100090014336935&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                  title="Facebook Page"
                  loading="lazy"
                  width={300}
                  height={300}
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div> */}
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:w-3/5">
            <div>
              <p className="text-lg font-semibold">Helpful Links</p>
              <hr className="my-4 border-t-2 border-blue-800 w-16" />
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold">Support</p>
              <hr className="my-4 border-t-2 border-blue-800 w-16" />
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-lg font-semibold">Contact Us</p>
              <hr className="my-4 border-t-2 border-blue-800 w-16" />
              <ul className="space-y-4 text-sm font-medium">
                <li>
                  <a
                    href="https://www.google.com/maps/place/Technology+Innovation+Park+(TIP)/@17.588988,78.121867,13z/data=!4m6!3m5!1s0x3bcbf12e326be7e1:0x1b5bca249531e1a0!8m2!3d17.5889875!4d78.1218672!16s%2Fg%2F11t79vbbpt?hl=en&entry=tts&g_ep=EgoyMDI0MDcyMy4wKgBIAVAD"
                    className="hover:underline"
                  >
                    C/O The Foundation for Center for Healthcare Entrepreneurship, Indian Institute of Technology, IIT Hyderabad Kandi, TG 502285
                  </a>
                  <div className="relative overflow-hidden pt-[70%] mt-4"> {/* Increased height */}
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15213.15289780603!2d78.10387285541992!3d17.589043100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf12e326be7e1%3A0x1b5bca249531e1a0!2sTIP%20Building!5e0!3m2!1sen!2sin!4v1705916013050!5m2!1sen!2sin"
                      title="Google Maps"
                      loading="lazy"
                      frameBorder="0"
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <hr className="my-4 border-gray-600" />
        <div className="mx-auto max-w-6xl px-4 pt-2 pb-6 flex flex-col-reverse lg:flex-row justify-between">
          <p className="text-sm font-medium">Copyright © 2024. All rights reserved.</p>
          <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/kaustubha-medtech-private-limited" aria-label="LinkedIn">
                <FaLinkedin className="text-2xl hover:text-blue-600" />
              </a>
              <a href="https://www.facebook.com/people/Kaustubha-Medtech/pfbid02riyqk8ErVMNeVKMZTdkPSLLtkHPpXX99mVnzMZbU9ak8MdZbv4acbvpdkQYSQnpBl/" aria-label="Facebook">
                <FaFacebook className="text-2xl hover:text-blue-500" />
              </a>
              <a href="https://www.instagram.com/kaustubhamedtech/" aria-label="Instagram">
                <FaInstagram className="text-2xl hover:text-pink-600" />
              </a>
              <a href="https://x.com/i/flow/login?redirect_after_login=%2FKaustubhamedtec" aria-label="Twitter">
                <FaTwitter className="text-2xl hover:text-blue-400" />
              </a>
              <a href="https://www.youtube.com/@kaustubhamedtech" aria-label="YouTube">
                <FaYoutube className="text-2xl hover:text-red-500" />
              </a>
            </div>
        </div>
      </footer>
    </motion.div>
  );
};
