    import { NextRequest, NextResponse } from "next/server";
    import path from "path";
    import fs from "fs/promises";
    import { PrismaClient } from "../../../../generated/prisma"; // Adjust path to your Prisma client
    import * as Minio from 'minio'

    const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'posts';

    const minioClient = new Minio.Client({
        endPoint: process.env.MINIO_ENDPOINT,
        port: parseInt(process.env.MINIO_PORT, 10),
        useSSL: false,
        accessKey: process.env.MINIO_ACCESSKEY,
        secretKey: process.env.MINIO_SECRETKEY,
    })

    /**
     * @swagger
     * /api/posts/{id}:
     *   get:
     *     tags:
     *       - Posts
     *     summary: Get a pre-signed URL for a post's content file
     *     description: Fetches a post by its ID, identifies its content file, and generates a temporary, secure URL to download it from storage. The URL is valid for one hour.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The unique integer ID of the post.
     *         example: 43
     *     responses:
     *       200:
     *         description: Pre-signed URL generated successfully.
     *       404:
     *         description: Post not found or it has no associated file.
     */



    const prisma = new PrismaClient();
    export async function GET(
        req: NextRequest,
        context: { params: Promise<{ id: string }> }
    ) {
        const { id } = await context.params;
        const postId = parseInt(id, 10);
        if (isNaN(postId)) {
            return NextResponse.json({ error: "Invalid post ID provided." }, { status: 400 });
        }

        try {
            const post = await prisma.post.findUnique({
                where: { id: postId },
                include: {
                    author: {
                        select: { name: true }, // Lấy tên tác giả để hiển thị
                    },
                    topics: {
                        select: { name: true, baseColor: true }, // Lấy tên các topic để hiển thị
                    },
                },
            });

            if (!post || !post.postUrl) {
                return NextResponse.json({ error: "Post not found or it has no downloadable file." }, { status: 404 });
            }

            // Extract the object name from the full URL
            const postObjectName = new URL(post.postUrl).pathname.split('/').pop();

            if (!postObjectName) {
                return NextResponse.json({ error: "Could not determine filename from post URL." }, { status: 500 });
            }

            return NextResponse.json({post});

        } catch (error) {
            console.error("Error creating pre-signed URL:", error);
            return NextResponse.json({ error: "File not found in storage or an error occurred." }, { status: 404 });
        }
    }

    /**
     * @swagger
     * /api/posts/{id}:
     *   delete:
     *     tags:
     *       - Posts
     *     summary: Delete a post by its ID
     *     description: Deletes a post from the database and its associated files (e.g., PDF content and cover image) from MinIO storage.
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: The unique integer ID of the post to delete.
     *         example: 42
     *     responses:
     *       200:
     *         description: Post and associated files were deleted successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 message:
     *                   type: string
     *                   example: "Post and associated files deleted successfully."
     *       400:
     *         description: Invalid or missing post ID.
     *       404:
     *         description: Post with the specified ID was not found.
     *       500:
     *         description: Internal server error.
     */
    export async function DELETE(
        req: NextRequest,
        { params }: { params: { id: string } }
    ) {
        const postId = parseInt(params.id, 10);
        console.log("Deleting post with ID:", postId);
        if (isNaN(postId)) {
            return NextResponse.json({ error: "Invalid post ID provided." }, { status: 400 });
        }

        try {
            // 1. Tìm bài post trong database dựa trên tên tệp
            //    Sử dụng 'endsWith' để đảm bảo tìm đúng ngay cả khi URL đầy đủ được lưu
            const postToDelete = await prisma.post.findUnique({
                where: { id: postId },
            });

            if (!postToDelete) {
                return NextResponse.json({ error: "Post not found in database" }, { status: 404 });
            }
            const objectsToRemove: string[] = [];

            if (postToDelete.postUrl) {
                try {
                    const postUrlObject = new URL(postToDelete.postUrl);
                    // Get the last part of the path, removing the leading '/'
                    const postObjectName = postUrlObject.pathname.substring(postUrlObject.pathname.lastIndexOf('/') + 1);
                    if (postObjectName) {
                        objectsToRemove.push(postObjectName);
                    }
                } catch (e) {
                    console.warn(`Could not parse postUrl for deletion: ${postToDelete.postUrl}`);
                }
            }

            if (postToDelete.imageUrl) {
                try {
                    const imageUrlObject = new URL(postToDelete.imageUrl);
                    const imageObjectName = imageUrlObject.pathname.substring(imageUrlObject.pathname.lastIndexOf('/') + 1);
                    if (imageObjectName) {
                        objectsToRemove.push(imageObjectName);
                    }
                } catch (e) {
                    console.warn(`Could not parse imageUrl for deletion: ${postToDelete.imageUrl}`);
                }
            }
            // 4. If there are objects to remove, delete them from MinIO
            if (objectsToRemove.length > 0) {
                await minioClient.removeObjects(BUCKET_NAME, objectsToRemove);
                console.log(`Successfully removed objects from MinIO: ${objectsToRemove.join(', ')}`);
            }
            await prisma.post.delete({
                where: { id: postToDelete.id },
            });

            return NextResponse.json({
                success: true,
                message: "Post and associated files deleted successfully.",
            });
        } catch (error) {
            console.error("Error deleting post:", error);
            // Check for specific MinIO or Prisma errors if needed
            return NextResponse.json({ error: "Failed to delete post." }, { status: 500 });
        }
    }


/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Update an existing post
 *     description: Updates an existing post identified by its ID. All form fields are optional. If a new file or image is uploaded, the old one is replaced.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the post to update.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               authorId:
 *                 type: string
 *               description:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [NEWS, BLOG, RESEARCH]
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: A new content file to replace the old one.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: A new image to replace the old one.
 *               topics:
 *                 type: string
 *                 description: Comma-separated list of topic names to replace existing ones.
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Post updated successfully.
 *       400:
 *         description: Invalid post ID.
 *       404:
 *         description: Post not found.
 */

    export async function PUT(
        req: NextRequest,
        { params }: { params: { id: string } }
    ) {
        const postId = parseInt(params.id, 10);
        if (isNaN(postId)) {
            return NextResponse.json({ error: "Invalid post ID provided." }, { status: 400 });
        }

        try {
            const formData = await req.formData();

            const existingPost = await prisma.post.findUnique({
                where: { id: postId },
            });

            if (!existingPost) {
                return NextResponse.json({ error: "Post not found" }, { status: 404 });
            }

            const dataToUpdate: any = {};
            const file = formData.get("file") as File | null;
            const image = formData.get("image") as File | null;

            if (formData.has("title")) dataToUpdate.title = formData.get("title") as string;
            if (formData.has("description")) dataToUpdate.description = formData.get("description") as string;
            if (formData.has("category")) dataToUpdate.category = formData.get("category") as "NEWS" | "BLOG" | "RESEARCH";
            if (formData.has("createdAt")) {
                const createdAtStr = formData.get("createdAt") as string;
                if (createdAtStr) { // Check if the string is not empty
                    const newDate = new Date(createdAtStr);
                    // Validate that the provided string is a valid date
                    if (isNaN(newDate.getTime())) {
                        return NextResponse.json({ error: "Invalid createdAt date format provided." }, { status: 400 });
                    }
                    dataToUpdate.createdAt = newDate;
                }
            }
            if (formData.has("authorId")) {
                const authorId = parseInt(formData.get("authorId") as string, 10);
                if (!isNaN(authorId)) {
                    dataToUpdate.authorId = authorId;
                }
            }
            if (file) {
                if (existingPost.postUrl) {
                    try {
                        const oldFileName = new URL(existingPost.postUrl).pathname.split('/').pop();
                        if(oldFileName) await minioClient.removeObject(BUCKET_NAME, oldFileName);
                    } catch (e) { console.error("Could not remove old file:", e); }
                }
                const buffer = Buffer.from(await file.arrayBuffer());
                const filename = `${file.name.replaceAll(" ", "_")}`;
                await minioClient.putObject(BUCKET_NAME, filename, buffer);
                dataToUpdate.postUrl = `${process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${filename}`;
            }

            if (image) {
                if (existingPost.imageUrl) {
                    try {
                        const oldImageName = new URL(existingPost.imageUrl).pathname.split('/').pop();
                        if(oldImageName) await minioClient.removeObject(BUCKET_NAME, oldImageName);
                    } catch (e) { console.error("Could not remove old image:", e); }
                }
                const imagebuffer = Buffer.from(await image.arrayBuffer());
                const imagename = `${image.name.replaceAll(" ", "_")}`;
                await minioClient.putObject(BUCKET_NAME, imagename, imagebuffer);
                dataToUpdate.imageUrl = `${process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${imagename}`;
            }

            if (formData.has("topics")) {
                const topicsStr = formData.get("topics") as string;
                const topicNames = topicsStr ? topicsStr.split(',').map(t => t.trim()).filter(t => t) : [];
                dataToUpdate.topics = {
                    set: [], // Disconnect all old topics
                    connectOrCreate: topicNames.map(name => ({
                        where: { name },
                        create: { name, baseColor: "#000000" },
                    })),
                };
            }

            const updatedPost = await prisma.post.update({
                where: { id: postId },
                data: dataToUpdate,
                include: { topics: true, author: true }
            });

            return NextResponse.json({ success: true, post: updatedPost }, { status: 200 });
        } catch (error) {
            console.error("Error updating post:", error);
            return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
        }
    }
