import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function PUT(request: NextRequest,{ params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const { descripcion } = await request.json();
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch(`http://localhost:5000/api/promotoria/agregarDescripcion/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
            body: JSON.stringify({descripcion})
        })

        const respuesta  = await response.json();

        return NextResponse.json({
            respuesta: respuesta
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error
        }, { status: 400 });
    }
}