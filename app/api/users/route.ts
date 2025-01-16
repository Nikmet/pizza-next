import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const users = await prisma.user.findMany();

    return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const user = await prisma.user.create({
            data
        });

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
}
