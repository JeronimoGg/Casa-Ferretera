import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
    try {
        
        const  { nombrePromotor, fecha, nombreSede, horaInicio, horaFinal } = await request.json();

        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch('http://localhost:5000/api/promotoria/agendarPromotor',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            },
            body: JSON.stringify({ nombrePromotor, fecha, nombreSede, horaInicio, horaFinal })
        })

        if(!response.ok){
            const error = await response.json();
            return NextResponse.json(error, { status: 401 });
        }

        const  promotoria  = await response.json();
        console.log(promotoria);
        return NextResponse.json({
            message: 'Agendado correctamente'
        }, { status: 202 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error
        }, { status: 400 });
    }
}