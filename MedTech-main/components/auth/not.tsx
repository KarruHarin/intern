import Image from "next/image";
import img from "@/app/images/logo.png";
import img1 from "@/app/images/img21.jpg";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa"; // Import icons

export default function Not() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex items-center mt-5">
                <Image alt="img" width={100} height={100} src={img} />
            </div>
            <div className="mt-5">
                <h1 className="text-4xl font-bold">WE ARE COMING SOON!!</h1>
                <p className="text-center">Stay tuned for something amazing</p>
            </div>
            <div className="flex items-center mt-5">
                <Image alt="img1" width={300} height={300} src={img1} />
            </div>
            <div className="flex flex-col mb-5">
                <div>
                    <p>Subscribe to our mail to get latest updates</p>
                </div>
                <div className="flex mt-5">
                    <Input />
                    <Button>Subscribe</Button>
                </div>
            </div>
            {/* Social Media Icons */}
            <div className="flex justify-center mt-5 space-x-20 mb-6">
                <FaFacebookF className="w-5 h-5 text-blue-600 hover:text-blue-800 cursor-pointer" />
                <FaTwitter className="w-5 h-5 text-blue-400 hover:text-blue-600 cursor-pointer" />
                <FaInstagram className="w-5 h-5 text-pink-600 hover:text-pink-800 cursor-pointer" />
                <FaLinkedinIn className="w-5 h-5 text-blue-700 hover:text-blue-900 cursor-pointer" />
                <FaYoutube className="w-5 h-5 text-red-600 hover:text-red-800 cursor-pointer" />
            </div>
        </div>
    );
}
