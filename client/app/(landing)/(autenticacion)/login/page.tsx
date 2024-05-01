"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { useState } from 'react';
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()
    const titulo = "Login";
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState<string | undefined>(undefined);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ correo, contrasena })
                });
                
                if(!response.ok) {
                    const { error } = await response.json();
                    setError(error); // Aquí obtienes el mensaje de error del JSON devuelto por el servidor
                    return
                }
                
                const { token, rol } = await response.json();
                localStorage.setItem('session', token);
                switch (rol) {
                    case 'AuxMercadeo':
                        router.push('/auxiliar-de-mercadeo');
                        break;
                    case 'Proveedor':
                        router.push('/proveedor');
                        break;
                    case 'Promotor':
                        router.push('/promotor');
                        break;
                    case 'Supervisor':
                        router.push('/supervisor');
                        break;
                    
                }
                setError(undefined);

        } catch (error) {
            console.log('Error al iniciar sesión:', error);
        }
    };
    

    return(
        <LayoutProfile titulo={titulo}>
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-gray-50 dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Ingreso al sistema</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="correo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Correo Eletronico</label>
                            <input type="email" id="correo" value={correo} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={e => setCorreo(e.target.value)} />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="contraseña" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Contraseña</label>
                            <input type="password" id="contraseña" value={contrasena} className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" onChange={e => setContrasena(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Iniciar sesion</button>
                    </form>
                    {error && 
                    <p className="text-red-500 text-lg mt-4 text-center">
                    {error}
                    </p>}
                </div>
            </div>
        </LayoutProfile>
    )
}

export default Login;