import { database } from "@/app/services/firebaseClient";
import { child, get, push, ref, set } from "firebase/database";
import { NextResponse, NextRequest } from "next/server";
import cors, { runMiddleware } from "../../middleware";
export async function GET(request: NextRequest) {
    const response = NextResponse.next();
    await runMiddleware(request, response, cors);
    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'Placas'));

        if (snapshot.exists()) {
            return NextResponse.json({ data: snapshot.val() }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'No data found' }, { status: 404 });
        }
    } catch (error: any) {
        console.error('Error fetching data:', error.message);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    const response = NextResponse.next();
    await runMiddleware(request, response, cors);
    try {
        const data = await request.json();
        console.log('Data received:', data);    
        const placaRef = push(ref(database, 'Placas'));
        await set(placaRef, data);

        return NextResponse.json({ message: 'Data saved successfully!' }, { status: 200 });
    } catch (error:any) {
        console.error('Error saving data:', error.message);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}