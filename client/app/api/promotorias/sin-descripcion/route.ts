import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    try {
        
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch('http://localhost:5000/api/promotoria/descripcion',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JWT}`
            }
        })

        const  promotorias  = await response.json();

        return NextResponse.json({
            promotorias: promotorias
        }, { status: 202 })
    } catch (error) {
        return NextResponse.json({
            error
        }, { status: 400 });
    }
}