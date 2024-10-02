"use client"
import Image from "next/image";
import img from "@/app/images/doc1.png"
import { CgAwards } from "react-icons/cg";
import { IoMdPeople } from "react-icons/io";
import { useEffect, useState } from "react";
import Review from "./Review";
import About from "./About";
import Edit from "./Edit";
import Password from "./Password";
import { GetDoctorById } from "@/actions/consult/GetDoctorById";

export default function DocProfile({id}:any) {
   useEffect(()=>{
    getDetails()
   },[])
   const getDetails =async()=>{
    const resp=await GetDoctorById(id)
    setData(resp)
}
const[data,setData]=useState<any>([])
console.log(data)
    const [current, setCurrent] = useState(1);

    return (
        <div className="flex flex-col md:flex-row p-5 gap-10 md:pl-5">
            {/* Left Side: Profile Info */}
            <div className="h-full flex flex-col items-center justify-center text-center border-2 rounded-lg shadow-md p-5 md:p-10 bg-gray-200 w-full md:w-1/3">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-3">
                    <Image src={img} alt="doc" className="object-cover" />
                </div>
                <div className="flex flex-col gap-3">
                    <h1 className="text-lg md:text-xl font-semibold">{data?.name}</h1>
                    <h2 className="text-sm md:text-md">{data?.profile?.specialization}</h2>
                    <h2 className="text-sm md:text-md">⭐ 4.5 Stars</h2>
                    <div className="flex gap-5">
                        <div className="flex gap-2 items-center">
                            <CgAwards className="text-lg md:text-xl" />
                            <h3 className="text-sm md:text-md">{data?.profile?.experienceYears} Years</h3>
                        </div>
                        <div className="flex gap-2 items-center">
                            <IoMdPeople className="text-lg md:text-xl" />
                            <h3 className="text-sm md:text-md">700+ patients</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Tabs & Content */}
            <div className="flex flex-col gap-5 md:gap-10 md:pl-5 w-full">
                <div className="flex flex-col md:flex-row w-full border-2 rounded-lg bg-gray-200 justify-center items-center">
                    <div className="flex flex-col md:flex-row p-4 w-full gap-5 md:gap-10 justify-center items-center">
                        <h1 className={`cursor-pointer ${current === 1 ? 'text-blue-500' : ''}`} onClick={() => setCurrent(1)}>About Me</h1>
                        <h1 className={`cursor-pointer ${current === 2 ? 'text-blue-500' : ''}`} onClick={() => setCurrent(2)}>Reviews</h1>
                        <h1 className={`cursor-pointer ${current === 3 ? 'text-blue-500' : ''}`} onClick={() => setCurrent(3)}>Edit Profile</h1>
                        <h1 className={`cursor-pointer ${current === 4 ? 'text-blue-500' : ''}`} onClick={() => setCurrent(4)}>Change Password</h1>
                    </div>
                </div>

                {/* Conditional Rendering of Components */}
                <div className="w-full">
                    {current === 1 && <About id={id} refresh={getDetails} about={data?.about} />}
                    {current === 2 && <Review />}
                    {current === 3 && <Edit id={id} refresh={getDetails} data={data} />}
                    {current === 4 && <Password id={id} />}
                </div>
            </div>
        </div>
    )
}
