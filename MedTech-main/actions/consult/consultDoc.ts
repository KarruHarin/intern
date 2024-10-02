"use server";

import { db } from "@/lib/db";

export const getAllDoctorsWithDetails = async () => {
    try {
      const doctors = await db.user.findMany({
        where: {
          role: 'DOCTOR',
        },
      });
  
      const userIds = doctors.map(doctor => doctor.id);
  
      const profiles = await
       db.doctorProfile.findMany({
        where: {
          userId: { in: userIds },
        },
      });
  
      const availabilityDetails = await db.doctorAvailabilityDetails.findMany({
        where: {
          userId: { in: userIds },
        },
      });      
  
      const doctorsWithDetails = doctors.map(doctor => {
        const profile = profiles.find(p => p.userId === doctor.id);
        const availability = availabilityDetails.find(a => a.userId === doctor.id);
        return {
          ...doctor,
          profile,
          availability,
        };
      });
  
      return doctorsWithDetails;
    } catch (error) {
      console.error('Error fetching doctors with details:', error);
      return null;
    }
  };
  