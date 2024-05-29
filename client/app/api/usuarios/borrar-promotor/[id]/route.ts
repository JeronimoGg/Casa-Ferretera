import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function DELETE(request: NextRequest,{ params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch(`http://localhost:5000/api/users/promotor/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
        })

        const respuesta  = await response.json();

        return NextResponse.json({
            respuesta
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            error
        }, { status: 400 });
    }
}