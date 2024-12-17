import { NextRequest, NextResponse } from 'next/server';
import { authAdmin } from '../services/fbAdmin' ;

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