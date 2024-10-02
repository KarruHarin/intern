"use client"
import { SignOut } from "@/actions/auth/signout";

export default function Signout(){

    const handleLogout = async (e: React.FormEvent) => {
        e.preventDefault();
        await SignOut(); // Sign out the user
    };

    return(
        <div className="flex justify-center ">
            <div className="rounded-3xl flex justify-center text-center items-center w-[60vw] h-[70vh] bg-gradient-to-t from-purple-500">
                <div className="flex flex-col justify-center  items-center">
                    <h1 className="font-bold text-3xl">You are attempting to Logout kaustubha</h1>
                    <span className="mt-10 text-lg">Are you sure ?</span>
                    <button onClick={handleLogout} className="mt-10 w-[10vw] bg-purple-600 flex gap-2 py-2 px-3 justify-center items-center text-center rounded hover:bg-primary hover:text-white">Logout</button>
                </div>
            </div>      
        </div>
    )
}