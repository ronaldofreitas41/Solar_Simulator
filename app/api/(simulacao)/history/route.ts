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
        const { user } = await request.json();
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, "Simulacoes"));
        console.log(user);
        if (snapshot.exists()) {
            // Traz os usuários do banco para realizar a comparação
            const itens = snapshot.val();
            console.log(user);
            console.log("Itens ",itens.user);
            const item = Object.values(itens).filter(
                (item: any) => item.user == user
            );

            if (item) {
                return NextResponse.json(item, { status: 200 });
            } else {
                return NextResponse.json({ message: "History does not exist" }, { status: 401 });
            }
        } else {
            return NextResponse.json({ message: "No data found" }, { status: 404 });
        }
    } catch (error: any) {
        console.error("Erro ao verificar usuário:", error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
