import { database } from "@/app/services/firebaseClient";
import { ref, child, get } from "firebase/database";
import { NextResponse, NextRequest } from "next/server";
import cors, { runMiddleware } from "../../middleware";

export async function POST(request: NextRequest) {
    // Configuração de CORS
    const response = NextResponse.next();
    await runMiddleware(request, response, cors);

    try {

        // Se a requisição for OPTIONS (preflight CORS), retorne resposta vazia com status 200
        if (request.method === "OPTIONS") {
            return new NextResponse(null, { status: 200 });
        }

        // Processamento normal da requisição
        const { email, password } = await request.json();
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'Users'));

        if (snapshot.exists()) {
            // Traz os usuários do banco para realizar a comparação
            const users = snapshot.val();
            const user = Object.values(users).find((user: any) => user.email === email && user.password == password);

            if (user) {
                return new NextResponse(JSON.stringify(user), { status: 200 });
            } else {
                return new NextResponse(JSON.stringify({ message: "User does not exist" }), { status: 401 });
            }
        } else {
            return new NextResponse(JSON.stringify({ message: "No data found" }), { status: 404 });
        }
    } catch (error: any) {
        console.error("Erro ao verificar usuário:", error.message);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
