import { NextResponse } from "next/server";

export const DELETE = (request: Request) => {
    try {
        
        return NextResponse.json({messsage:'Registro deletado!'},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:'Internal Server Error'},{status:500});
    }
}

export async function PUT(request: Request) {
    try {
        return NextResponse.json({message:'ok'},{status:200})
    } catch (error:any) {
        return NextResponse.json({message:'ok'},{status:200})
    }
}