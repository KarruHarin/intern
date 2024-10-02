"use server"
import { db } from '@/lib/db';


export const IsDoctorEnrolled = async (id:any) => {
    if (id) {
    const profile = await db.doctor_profiles.findFirst({
        where: {
          userId:id,
        },
      });
  
      const availability = await db.doctor_availability_details.findFirst({
        where: {
          userId:id,
        },
      });
      const license = await db.doctor_licenses.findFirst({
        where: {
          userId:id,
        },
      });
      if(availability&&license&&profile) {
        return true
      }
    return false;
  } 
  else {
    return false;
  }
};