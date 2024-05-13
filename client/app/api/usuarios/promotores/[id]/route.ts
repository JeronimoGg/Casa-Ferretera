import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request, { params }: { params: { id: number } }) {
    try {
        const { id } = params;
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch(`http://localhost:5000/api/users/promotor/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            }
        });
        if(!response.ok){
            const { error } = await response.json();
            return NextResponse.json(error, { status: 401 });
        }
        const informacion = await response.json();
        return NextResponse.json({
            informacion
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error
        }, {status: 400})
    }
}


export async function PUT(request: Request, { params }: { params: { id: number } }){
    try {
        const { id } = params;
        const { nombre, correo, calificacion } = await request.json();
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch(`http://localhost:5000/api/users/promotor/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${JWT}`
                },
                body: JSON.stringify({nombre, correo, calificacion})
            });
        if(!response.ok){
            const { error } = await response.json();
            return NextResponse.json(error, { status: 401 });
        }
        const { message } = await response.json();
        return NextResponse.json({
            mensaje: message
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            error
        }, {status: 400})
    }
    

}