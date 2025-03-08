import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const response = NextResponse.next();

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Se a requisição for do tipo OPTIONS (preflight CORS), retorna uma resposta vazia com status 200
    if (req.method === "OPTIONS") {
        return new NextResponse(null, { status: 200, headers: response.headers });
    }

    return response;
}

// Configurações para definir quais rotas o middleware deve ser aplicado
export const config = {
    matcher: "/api/:path*", // Aplica o middleware a todas as rotas dentro de /api
};
