import path from "path";
import DatauriParser from "datauri/parser";
import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";

export async function POST(req: Request) {
  const formData = await req.formData();
  const image = formData.get("image") as File;
  const userId = formData.get("userId");

  if (!image) {
    return NextResponse.json(
      { error: "Image is required", data: null },
      { status: 400 }
    );
  }

  const parser = new DatauriParser();

  try {
    if (!userId || typeof userId !== "string") {
      return NextResponse.json(
        { error: "User ID is required and must be a string", data: null },
        { status: 400 }
      );
    }

    const user = await getUserById(userId);

    if (user) {
      // Check if user already has an image
      if (user.image) {
        // Extract the publicId from the existing image URL
        const publicId = user.image.split("/").pop()?.split(".")[0];

        if (publicId) {
          // Delete the existing image from Cloudinary
          await cloudinary.uploader.destroy(publicId, {
            resource_type: "image",
          });
        }
      }

      // Convert ArrayBuffer to Buffer
      const buffer = Buffer.from(await image.arrayBuffer());

      // Upload the new image
      const base64Image = parser.format(
        path.extname(image.name).toString(),
        buffer
      );

      if (!base64Image.content) {
        return NextResponse.json({ error: null, message: "Failed to parse" });
      }

      const createdImage = await cloudinary.uploader.upload(
        base64Image.content,
        {
          resource_type: "image",
        }
      );

      // Update the user's image URL in the database
      const updatedUser = await db.user.update({
        where: { id: user.id },
        data: { image: createdImage.secure_url },
      });

      return NextResponse.json({
        error: null,
        message: "Image updated successfully",
      });
    }

    return NextResponse.json({ error: "User not found" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error || "Error uploading image", data: null },
      { status: 500 }
    );
  }
}
