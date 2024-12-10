import { database } from "@/app/services/fbConfig";
import { push, ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return new NextResponse("This is my first Api response");
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const userRef = push(ref(database, 'Users'));

        await set(userRef, data);

        console.log('Data saved successfully!');
        return NextResponse.json({ message: 'Data saved successfully!' }, { status: 200 });
    } catch (error: any) {
        console.error('Error saving data:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}



