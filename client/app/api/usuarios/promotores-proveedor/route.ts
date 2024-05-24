import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET(request: Request) {
    console.log("si entro al route de promotores proveedor")
    try {
        const JWT = headers().get('Authorization')?.replace('Bearer ', '');
        const response = await fetch('http://localhost:5000/api/users/proveedor/promotores',{
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
        const data = await response.json();
        return NextResponse.json({
            promotores: data
        }, { status: 200 });


    } catch (error) {
        return NextResponse.json({
            error
        }, {status: 400})
    }
}