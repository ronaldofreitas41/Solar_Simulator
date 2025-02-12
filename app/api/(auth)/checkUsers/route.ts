import { database } from "@/app/services/firebaseClient";
import { ref, child, get } from "firebase/database";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        // Se a requisição for OPTIONS (preflight CORS), retorne resposta vazia com status 200
        if (request.method === "OPTIONS") {
            return new NextResponse(null, { status: 200 });
        }

        // Processamento normal da requisição
        const { email, password } = await request.json();
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "Users"));

        if (snapshot.exists()) {
            // Traz os usuários do banco para realizar a comparação
            const users = snapshot.val();
            const user = Object.values(users).find(
                (user: any) => user.email === email && user.password === password
            );

            if (user) {
                return NextResponse.json(user, { status: 200 });
            } else {
                return NextResponse.json({ message: "User does not exist" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    } catch (error: any) {
        console.error("Erro ao verificar usuário:", error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
