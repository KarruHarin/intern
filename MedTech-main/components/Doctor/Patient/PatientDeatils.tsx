"use client"
import Image from "next/image";
import img from "@/app/images/doc1.png";
import { FaRegMessage } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { getPatientsByDoctorId } from "@/actions/patient/GetPatientsByDoctorId";
import { useUser } from "@/app/context/userContext";

export default function PatientDetails() {
   const {id}= useUser()
   const [patient,setPatient] = useState<any>([])
   useEffect(() => {
    const fetchPatients = async () => {
      try {
        const result = await getPatientsByDoctorId(id);        
        setPatient(result.data)
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
  
    fetchPatients();
  }, [id]);

    return (
        <div className="flex flex-col p-5 gap-5">
            <div className="pt-5 pb-5">
                <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">All Patients</h1>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {patient?.map((_:any, index:any) => (
                    <div
                        key={index}
                        className="flex flex-col md:flex-row gap-4 border-2 rounded-lg bg-gray-100 p-4"
                    >
                        <div className="w-full md:w-[40%] flex justify-center">
                            <Image src={img} alt="doc" className="rounded-lg" />
                        </div>
                        <div className="flex flex-col p-5 gap-3 w-full">
                            <div className="flex flex-col">
                                <h1 className="font-bold text-lg md:text-xl">{_.name}</h1>
                                <h1 className="text-purple-600 text-sm md:text-base">Pregnancy Patient</h1>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="border-2 bg-gray-300 rounded-lg p-2 text-xs md:text-sm">Patient</span>
                                <span className="border-2 bg-gray-300 rounded-lg p-2 text-xs md:text-sm">Pregnancy</span>
                                <span className="border-2 bg-gray-300 rounded-lg p-2 text-xs md:text-sm">Maternity</span>
                            </div>
                            <div>
                                <p className="text-xs md:text-sm">
                {_.purpose}                                </p>
                            </div>
                            <div className="flex gap-3">
                                <div className="flex border-2 rounded-sm w-[30%] md:w-[8vw] h-[8vw] md:h-[3vw] justify-center items-center text-center">
                                    <FaRegMessage />
                                </div>
                                <div className="flex border-2 rounded-sm w-full h-[8vw] md:h-[3vw] justify-center items-center text-center bg-purple-600 text-white">
                                    <p>See Details</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
