"use server"
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const EnrollDoctorCretificate = async (id: string, data: any) => {
  try {

    const user = await getUserById(id);
    if (!user) {
      return { error: "User not found" };
    }

    const existingProfile = await db.doctorLicense.findFirst({
      where: { userId: id },
    });
    if (existingProfile) {
      return { error: "Doctor profile already exists for this user" };
    }

    const result= await db.doctorLicense.create({
      data: {
        ...data,
        userId: id,
      },
    });
  console.log(result);    
    return { success: "Saved" };
  } catch (error) {
    console.error("Error enrolling doctor:", error);
    throw error;
  }
};
