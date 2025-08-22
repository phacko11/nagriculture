import { NextResponse } from 'next/server';
import { PrismaClient } from "../../../../../generated/prisma";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/posts/topics/{id}:
 *   get:
 *     summary: Retrieves a single topic by ID
 *     description: Fetches the details of a specific topic using its unique identifier.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the topic.
 *     responses:
 *       200:
 *         description: The requested topic object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic with the specified ID was not found.
 */
export async function GET(request: Request, { params }: { params: { id: string } }) {
    const topic = await prisma.topic.findUnique({
        where: { id: parseInt(params.id) },
    });
    if (!topic) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
    return NextResponse.json(topic);
}

/**
 * @swagger
 * /api/posts/topics/{id}:
 *   put:
 *     summary: Updates a topic completely
 *     description: Replaces all fields of an existing topic with new data.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the topic to update.
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
 *       200:
 *         description: The updated topic object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found.
 */
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    const { name, baseColor } = body;
    try {
        const updatedTopic = await prisma.topic.update({
            where: { id: parseInt(params.id) },
            data: { name, baseColor },
        });
        return NextResponse.json(updatedTopic);
    } catch (error) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
}

/**
 * @swagger
 * /api/posts/topics/{id}:
 *   patch:
 *     summary: Partially updates a topic
 *     description: Modifies one or more fields of an existing topic.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the topic to patch.
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
 *       200:
 *         description: The partially updated topic object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Topic'
 *       404:
 *         description: Topic not found.
 */
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    const body = await request.json();
    try {
        const updatedTopic = await prisma.topic.update({
            where: { id: parseInt(params.id) },
            data: body,
        });
        return NextResponse.json(updatedTopic);
    } catch (error) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
}

/**
 * @swagger
 * /api/posts/topics/{id}:
 *   delete:
 *     summary: Deletes a topic
 *     description: Permanently removes a topic from the database.
 *     tags: [Topics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The unique ID of the topic to delete.
 *     responses:
 *       204:
 *         description: No content, indicating successful deletion.
 *       404:
 *         description: Topic not found.
 */
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.topic.delete({
            where: { id: parseInt(params.id) },
        });
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }
}
