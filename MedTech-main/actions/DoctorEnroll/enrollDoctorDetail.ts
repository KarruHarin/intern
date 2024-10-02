"use server";
import { docDeatail} from "@/schema";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";

export const EnrollDoctorDetails = async (id: string, values: any) => {
  try {    
    const validate = docDeatail.safeParse(values);
    if (!validate.success) {
      console.error("Validation errors:", validate.error.format());
      return { error: "Invalid input" };
    }

    const user = await getUserById(id);
    if (!user) {
      return { error: "User not found" };
    }

    const existingProfile = await db.doctorAvailabilityDetails.findFirst({
      where: { userId: id },
    });
    if (existingProfile) {
      return { error: "Doctor profile already exists for this user" };
    }

    await db.doctorAvailabilityDetails.create({
      data: {
        ...values,
        userId: id,
      },
    });

    return { success: "Saved" };
  } catch (error) {
    console.error("Error enrolling doctor:", error);
    throw error;
  }
};
