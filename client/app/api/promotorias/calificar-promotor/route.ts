import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        
        const  { nombrePromotor, calificacion, comentario } = await request.json();

        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch('http://localhost:5000/api/promotoria/calificar',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
            body: JSON.stringify({ nombrePromotor, calificacion, comentario})
        })

        if(!response.ok){
            const error = await response.json();
            return NextResponse.json(error, { status: 401 });
        }

        const  { message }  = await response.json();
        
        return NextResponse.json({
            message
        }, { status: 202 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error
        }, { status: 400 });
    }
}