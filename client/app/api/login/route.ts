import { NextResponse } from "next/server";
export async function POST(request: Request) {
    try {
        const { correo, contrasena } = await request.json();

        const response = await fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, contrasena })
        });
        
        if (!response.ok) {
            const errorMessage = await response.json();
            if (response.status === 401) {
                const message = errorMessage.message
                return NextResponse.json({
                    error: message
                }, {status: 401})
            } else {
              throw new Error("Error al realizar la solicitud");
            }
        }
        
        const { token, rol } = await response.json();

        return NextResponse.json({
            message: "Inicio de sesion correcto",
            token: token,
            rol: rol
        }, {status: 202 })
    } catch (error) {
        
        return NextResponse.json({ 
            error
        }, {status: 401})
    }
    
}