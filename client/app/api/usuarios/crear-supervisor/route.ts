import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        
        const { nombre, correo, contrasena, sede } = await request.json();
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch('http://localhost:5000/api/auth/signupSupervisor',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
            body: JSON.stringify({ nombre, correo, contrasena, nombreSede: sede})
        })

        if(!response.ok){
            const error = await response.json();
            return NextResponse.json(error, { status: 401 });
        }

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