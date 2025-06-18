import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    if (body.email) {
        try {
            const projects = await prisma.project.findMany({
                where: {
                    userEmail: body.email,
                },
            });
            if (!projects || projects.length === 0) {
                return NextResponse.json({
                    message: 'No projects found for the provided email',
                    status: 404,
                });
            } else {
                return NextResponse.json({
                    message: 'Projects sent successfully',
                    status: 200,
                    data: projects,
                });
            }
        } catch {
            return NextResponse.json({
                message: 'Error fetching projects',
                status: 500,
            });
        }
    } else {
        return NextResponse.json({
            message: 'Missing email in request body',
            status: 400,
        });
    }
}
