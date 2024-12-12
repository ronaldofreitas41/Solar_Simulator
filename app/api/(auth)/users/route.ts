import { database } from "@/app/services/fbConfig";
import { child, get, push, ref, set } from "firebase/database";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'Users'));

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



