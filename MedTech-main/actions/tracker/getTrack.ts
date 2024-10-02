"use server";
import { db } from "@/lib/db";

export async function GetTrack(userId: string) {
  try {    
    if (!userId) {
      return { error: "User ID not provided" };
    }

    const overview = await db.overview.findFirst({
      where: { userId: userId },
    });

    const healthExpected = await db.healthExpected.findFirst({
      where: { userId: userId },
    });

    const healthMonitoring = await db.healthMonitoring.findFirst({
      where: { userId: userId },
    });
    const tracks = await db.tracker.findFirst({
      where: { userId: userId },
    });

    if (!overview && !healthExpected && !healthMonitoring) {
      return { error: 'No data found for this user' };
    }   
    return {
      tracks,
      overview,
      healthExpected,
      healthMonitoring,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { error: 'Internal Server Error' };
  }
}

