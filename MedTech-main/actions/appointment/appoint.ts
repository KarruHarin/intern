"use server";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export const BookAppointment = async (data: any) => {
  try {
    const user = await getUserById(data.userId);
    if (!user) {
      return { error: "User not found." };
    }

    const doctor = await db.user.findUnique({
      where: { id: data.doctor_id },
    });
    if (!doctor) {
      return { error: "Doctor not found." };
    }


    const details = {
      userId: user.id,
      doctor_id: doctor.id,
      time: data.time as string, 
      date: data.date, 
      slot: data.slot, 
      doctorName: doctor.name?? "",
      purpose: data.purpose as string, 
      reschedule: "false",
      status: "Not confirmed",
      mode: data.mode || "both", 
      age: data.age, 
      name: data.name as string, 
      gender: data.gender as string,
    };
   
    const appointment = await db.bookedAppointment.create({
      data: details,
    });
    if(appointment){
      return { success: "Appointment successfully booked.",user:appointment };
    }
    return { error: "Failed to book." };
  } catch (error) {
    console.log(error);
    
    return { error: "Failed to book the appointment." };
  }
};
