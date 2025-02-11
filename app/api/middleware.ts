import { NextRequest, NextResponse } from 'next/server';
import { authAdmin } from '../services/fbAdmin';
import Cors from 'cors';

export async function verifyToken(request: NextRequest) {
    const token = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decodedToken = await authAdmin.verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
}

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