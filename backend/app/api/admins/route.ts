import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/admins:
 *   get:
 *     tags:
 *       - Admin Management
 *     description: Returns the list of admins
 *     responses:
 *       200:
 *         description: List of admins
 *       500:
 *         description: Internal server error
 *   post:
 *     tags:
 *       - Admin Management
 *     summary: Create a new admin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Admin's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Admin's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Admin's password
 *     responses:
 *       201:
 *         description: Admin user created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 lastLogin:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       400:
 *         description: Missing email or password
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Admin Management
 *     summary: Delete an admin user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:  
 *               id:
 *                 type: integer
 *                 description: The ID of the admin user to delete
 *     responses:
 *       200:
 *         description: Admin user deleted successfully
 *       400:
 *         description: Admin ID is required
 *       500:
 *         description: Internal server error
 *   patch:
 *     tags:
 *       - Admin Management
 *     summary: Update an admin user’s email and/or password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the admin user to update
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email address (optional)
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password (optional)
 *     responses:
 *       200:
 *         description: Admin user updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 lastLogin:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       400:
 *         description: Admin ID and at least one field (email or password) are required
 *       500:
 *         description: Internal server error
 */


const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        const admins = await prisma.adminUser.findMany({
            select: {
                id: true,
                email: true,
                createdAt: true,
                lastLogin: true,
                name: true,
            },
        });
        return NextResponse.json(admins, { status: 200 });
    }
    catch (error) {
        console.error("Error fetching admins:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password, name } = body;

        // Basic validation
        if (!email || !password || !name) {
            return NextResponse.json(
                { error: "Email, password, and name are required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingAdmin = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (existingAdmin) {
            return NextResponse.json(
                { error: "Email is already registered" },
                { status: 409 }
            );
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create admin user
        const newAdmin = await prisma.adminUser.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        // It's best not to return password field in response
        const { password: _, ...adminWithoutPassword } = newAdmin;

        return NextResponse.json(adminWithoutPassword, { status: 201 });
    } catch (error) {
        console.error("Error creating admin:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(req: Request) {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json(
                { error: "Admin ID is required" },
                { status: 400 }
            );
        }

        // Delete admin user
        await prisma.adminUser.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Admin deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting admin:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json();
        const { id, email, password, name } = body;

        if (!id || (!email && !password && !name)) {
            return NextResponse.json(
                { error: "Admin ID and at least one field to update are required" },
                { status: 400 }
            );
        }

        // Prepare data for update
        const updateData: any = {};
        if (email) {
            updateData.email = email;
        }
        if (password) {
            const saltRounds = 10;
            updateData.password = await bcrypt.hash(password, saltRounds);
        }
        if (name) {
            updateData.name = name;
        }

        // Update admin user
        const updatedAdmin = await prisma.adminUser.update({
            where: { id },
            data: updateData,
        });

        // It's best not to return password field in response
        const { password: _, ...adminWithoutPassword } = updatedAdmin;

        return NextResponse.json(adminWithoutPassword, { status: 200 });
    } catch (error) {
        console.error("Error updating admin:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}