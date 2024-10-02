import { useEffect } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";

export default function Appoint3({user,Submit}:any){
    
    useEffect(()=>{
        Submit()
    },[])

    return(
        <div className="flex flex-col p-5 text-center">
            <div className="pb-3">
                <h1>Appointment Tentatively Confirmed on </h1>
            </div>
            <hr/>
            <div className="flex flex-col pt-3">
                <h1>Your Appointment ID is </h1>
                <p className="text-purple-500 text-5xl font-bold">1037</p>
            </div>
            <div className="p-3">
                <h1>We have sent email to {user.email} and SMS to {user.phone} with details</h1>
            </div>
            <hr/>
            <div className="flex flex-col p-3">
                <h1 className="text-lg font-bold">You are one step away from Online Consultaion</h1>
                <p className="text-gray-700">Select Your consultaion type</p>
            </div>
            <div className="flex flex-col p-3 gap-4">
                <div className="p-3 flex justify-between border-2 rounded-md">
                    <div className="flex gap-4">
                        <FaPhoneAlt />
                        <h1>Tele Consultaion</h1>
                    </div>
                    <div>
                        800
                    </div>
                </div>
                <div className="p-3 flex justify-between border-2 rounded-md">
                    <div className="flex gap-4">
                        <FaVideo />
                        <h1>Video Consultaion</h1>
                    </div>
                    <div>
                        800
                    </div>
                </div>
            </div>
        </div>
    )
}