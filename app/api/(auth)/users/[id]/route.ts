import { NextResponse } from "next/server";

export const DELETE = (request: Request) => {
    return 0;
}

export async function PUT(request: Request) {
    return new NextResponse("This is my first Api response");
}