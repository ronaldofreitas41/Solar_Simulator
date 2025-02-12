import { NextRequest, NextResponse } from 'next/server';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: '*', // Permite todas as origens, ajuste conforme necessário
});

// Helper para executar middleware
function runMiddleware(req: NextRequest, res: NextResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: any) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default cors;
export { runMiddleware };