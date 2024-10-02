"use server"
import { db } from "@/lib/db";

export const getAllAppointment = async (id: string,role:string) => {
  let appointments
  try {    
    if (typeof id !== 'string' || !id.trim()) {
      throw new Error('Invalid ID format');
    }
    console.log("Role = ",role)
if(role!='DOCTOR'){
    appointments = await db.BookedAppointment.findMany({
      where: { userId: id },
    });
  }
  else{
     appointments = await db.BookedAppointment.findMany({
      where: { doctor_id: id },
    });
  }
  console.log("appointments = ",appointments)
    if (!appointments || appointments?.length === 0) {
      return { success: true, message: "No appointments found for this user." };
    }

    return { success: true, data: appointments };
  } catch (err) {
    console.error("Error fetching appointments:", err);
    return { error: "Internal server error" };
  }
};
