import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import type { UploadApiResponse } from "cloudinary";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 512 * 1024;

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];

const uploadBufferToCloudinary = async (
    buffer: Buffer,
): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "avatars",
                resource_type: "image",
                transformation: [
                    {
                        width: 400,
                        height: 400,
                        crop: "fill",
                        gravity: "face",
                        quality: "auto",
                        fetch_format: "auto",
                    },
                ],
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                if (!result) {
                    reject(new Error("Cloudinary upload failed"));
                    return;
                }

                resolve(result);
            },
        );

        uploadStream.end(buffer);
    });
};

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                { message: "File is required" },
                { status: 400 },
            );
        }

        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            return NextResponse.json(
                { message: "Only png, jpg and gif files are allowed" },
                { status: 400 },
            );
        }

        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json(
                { message: "File must be no more than 0.5MB" },
                { status: 400 },
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadResult = await uploadBufferToCloudinary(buffer);

        return NextResponse.json({
            url: uploadResult.secure_url,
            publicId: uploadResult.public_id,
        });
    } catch (error) {
        console.error("Avatar upload error:", error);

        return NextResponse.json(
            { message: "Failed to upload avatar" },
            { status: 500 },
        );
    }
}