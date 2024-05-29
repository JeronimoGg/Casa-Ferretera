import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function PUT(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch(`http://localhost:5000/api/promotoria/rechazar/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            }
        })

        if(!response.ok){
            const { error } = await response.json();
            return NextResponse.json(error, { status: 400 });
        }
        const { message } = await response.json();
        return NextResponse.json({
            mensaje: message
        }, { status: 202 })
    } catch (error) {
        return NextResponse.json({
            error
        }, { status: 400 });
    }
}