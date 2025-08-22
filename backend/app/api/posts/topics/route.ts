import { NextResponse } from 'next/server';
import { PrismaClient } from "../../../../generated/prisma";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/posts/topics:
 *   get:
 *     summary: Retrieves all topics
 *     description: Returns a complete list of all available topics in the database.
 *     tags: 
 *       - Topics
 *     responses:
 *       200:
 *         description: A JSON array of topics.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Topic'
 */
export async function GET() {
    const topics = await prisma.topic.findMany();
    return NextResponse.json(topics);
}

/**
 * @swagger
 * /api/posts/topics:
 *   post:
 *     summary: Creates a new topic
 *     description: Adds a new topic to the database with a unique name and an associated color.
 *     tags:
 *       - Topics
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               baseColor:
 *                 type: string
 *     responses:
 *       201:
 *         description: The newly created topic.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       400:
 *         description: Bad request, likely due to missing or invalid data.
 */
export async function POST(request: Request) {
    const body = await request.json();
    const { name, baseColor } = body;

    if (!name || !baseColor) {
        return NextResponse.json({ error: 'Name and baseColor are required' }, { status: 400 });
    }

    const newTopic = await prisma.topic.create({
        data: {
            name,
            baseColor,
        },
    });
    return NextResponse.json(newTopic, { status: 201 });
}
