import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { PrismaClient } from "../../../generated/prisma"; // Adjust path to your Prisma client
import * as Minio from 'minio'

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'posts';

const minioClient = new Minio.Client({
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT, 10),
    useSSL: false,
    accessKey: process.env.MINIO_ACCESSKEY,
    secretKey: process.env.MINIO_SECRETKEY,
})
const prisma = new PrismaClient();
export const config = {
    api: {
        bodyParser: false, // Disable Next.js body parser for multipart/form-data
    },
};

/**
 * @swagger
 *  /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get posts by category and optional topic
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [NEWS, BLOG, RESEARCH]
 *         required: true
 *         description: The category of posts to retrieve
 *       - in: query
 *         name: topic
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter posts by topic name
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   title:
 *                     type: string
 *                     example: Example Post Title
 *                   description:
 *                     type: string
 *                     example: Short description of the post
 *                   imageUrl:
 *                     type: string
 *                     format: uri
 *                     example: https://example.com/image.jpg
 *                   postUrl:
 *                     type: string
 *                     format: uri
 *                     example: https://example.com/post
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2025-08-15T10:15:30.000Z
 *                   author:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: John Doe
 *                   topics:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Technology
 *                         baseColor:
 *                           type: string
 *                           example: "#000000"
 *       400:
 *         description: Post category is required
 *       500:
 *         description: Failed to fetch posts
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const topicName = searchParams.get("topic");

        if (!category) {
            return NextResponse.json(
                { error: "Post category is required" },
                { status: 400 }
            );
        }

        const whereClause: any = {
            category: category as "NEWS" | "BLOG" | "RESEARCH",
        };

        if (topicName) {
            whereClause.topics = {
                some: {
                    name: topicName,
                },
            };
        }

        const posts = await prisma.post.findMany({
            where: whereClause,
            select: {
                id: true,
                title: true,
                description: true,
                imageUrl: true,
                postUrl: true,
                createdAt: true, // <-- Added
                author: {
                    select: { name: true },
                },
                topics: {
                    select: { name: true, baseColor: true },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

/** 
 * @swagger 
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     description: Creates a new post. If the content format is PDF, a file must be uploaded.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - authorId
 *               - title
 *               - category
 *               - contentFormat
 *             properties:
 *               authorId:
 *                 type: string
 *                 description: The ID of the author creating the post.
 *                 example: "1"
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *                 example: "My New Research Paper"
 *               description:
 *                 type: string
 *                 description: Optional description for the post.
 *                 example: "This is a description of my new research paper."
 *               category:
 *                 type: string
 *                 enum: [NEWS, BLOG, RESEARCH]
 *                 example: "RESEARCH"
 *               contentFormat:
 *                 type: string
 *                 enum: [PDF, MARKDOWN]
 *                 example: "PDF"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The file to upload.
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file to upload.
 *               topics:
 *                 type: string
 *                 description: Comma-separated list of topic names.
 *                 example: "AI, Machine Learning"
 *               createdAt:
 *                 type: string
 *                 format: date-time
 *                 description: Optional custom creation date for the post.
 *                 example: "2025-08-14T10:30:00Z"
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 post:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: My New Research Paper
 *                     category:
 *                       type: string
 *                       example: RESEARCH
 *                     imageUrl:
 *                       type: string
 *                       example: /uploads/example.jpg
 *                     slug:
 *                       type: string
 *                       example: my-new-research-paper
 *       400:
 *         description: No file uploaded or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No file uploaded.
 */
export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const authorId = formData.get("authorId") as string; // Assuming authorId is passed in form data
        if (!authorId) {
            return NextResponse.json({ error: "Missing authorId" }, { status: 400 });
        }
        const author = await prisma.adminUser.findUnique({
            where: { id: parseInt(authorId) },
        });

        if (!author) {
            return NextResponse.json({ error: "Author not found" }, { status: 404 });
        }
        // Extract form data
        const title = formData.get("title") as string;
        const description = formData.get("description") as string | null; // SỬA ĐỔI: Thêm description
        const category = formData.get("category") as string;
        const contentFormat = formData.get("contentFormat") as string;
        const file = formData.get("file") as File | null;
        const image = formData.get("image") as File | null;
        const topicsStr = formData.get("topics") as string;
        const topics = topicsStr ? topicsStr.split(",").map((t) => t.trim()) : [];
        const createdAtStr = formData.get("createdAt") as string | null;
        let createdAt: Date | undefined = undefined;

        if (createdAtStr) {
            const parsedDate = new Date(createdAtStr);
            if (isNaN(parsedDate.getTime())) {
                return NextResponse.json({ error: "Invalid date format for createdAt" }, { status: 400 });
            }
            createdAt = parsedDate;
        }

        // Validation (match Swagger requirements)
        if (!title || !category || !contentFormat) {
            return NextResponse.json({ error: "Missing required fields: title, category, contentFormat" }, { status: 400 });
        }
        if (!["NEWS", "BLOG", "RESEARCH"].includes(category)) {
            return NextResponse.json({ error: "Invalid category. Must be NEWS, BLOG, or RESEARCH" }, { status: 400 });
        }
        if (!["PDF", "MARKDOWN"].includes(contentFormat)) {
            return NextResponse.json({ error: "Invalid contentFormat. Must be PDF or MARKDOWN" }, { status: 400 });
        }
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        let postUrl = null;
        let imageUrl = null;

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = file.name.replaceAll(" ", "_");
        const imagebuffer = Buffer.from(await image.arrayBuffer());
        const imagename = image.name.replaceAll(" ", "_");
        console.log("Bucket name: ", BUCKET_NAME)
        const exists = await minioClient.bucketExists(BUCKET_NAME)
        console.log(exists)
        if (exists) {
            console.log('Bucket ' + BUCKET_NAME + ' exists.')
        } else {
            await minioClient.makeBucket(BUCKET_NAME, 'us-east-1')
            console.log('Bucket ' + BUCKET_NAME + ' created in "us-east-1".')
            const policy = {
                Version: "2012-10-17",
                Statement: [
                    {
                        Effect: "Allow",
                        Principal: { AWS: ["*"] },
                        Action: ["s3:GetObject"],
                        Resource: [`arn:aws:s3:::${BUCKET_NAME}/*`]
                    }
                ]
            };
            await minioClient.setBucketPolicy(BUCKET_NAME, JSON.stringify(policy));
            console.log(`Bucket "${BUCKET_NAME}" is now public.`);

        }

        await minioClient.putObject(BUCKET_NAME, filename, buffer,
            buffer.length,
            {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline'
            })
        postUrl = `${process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${filename}`
        await minioClient.putObject(BUCKET_NAME, imagename, imagebuffer,
            imagebuffer.length,
            {
                'Content-Type': 'image/jpeg',
                'Content-Disposition': 'inline'
            })
        imageUrl = `${process.env.MINIO_USE_SSL === 'true' ? 'https' : 'http'}://${process.env.MINIO_ENDPOINT}:${process.env.MINIO_PORT}/${BUCKET_NAME}/${imagename}`

        const newPost = await prisma.post.create({
            data: {
                title,
                description,
                imageUrl,
                postUrl,
                category: category as "NEWS" | "BLOG" | "RESEARCH",
                contentFormat: contentFormat as "PDF" | "MARKDOWN",
                authorId: parseInt(authorId),
                topics: {
                    connectOrCreate: topics.map(name => ({
                        where: { name },
                        create: { name, baseColor: "#000000" }
                    })),
                },

                ...(createdAt && { createdAt }), // <-- only set if provided
            }
        });

        const responsePost = {
            id: newPost.id,
            title: newPost.title,
            description: newPost.description,
            imageUrl: newPost.imageUrl,
            category: newPost.category,
            postUrl: newPost.postUrl,
        };

        return NextResponse.json({ success: true, post: responsePost }, { status: 201 });
    }
    catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}

/**
 * @swagger
 * /api/posts:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete the "posts" bucket
 *     description: Removes the entire "posts" bucket from MinIO storage. The bucket must be empty before deletion.
 *     responses:
 *       200:
 *         description: Bucket deleted successfully
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
 *                   example: Bucket "posts" deleted successfully.
 *       404:
 *         description: Bucket not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Bucket "posts" does not exist.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Failed to delete bucket.
 */
export async function DELETE(req: NextRequest) {
    return await minioClient.removeBucket(BUCKET_NAME);
}