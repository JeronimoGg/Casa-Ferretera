"use client";
import LayoutProfile from "@/app/(landing)/layout";
import SignUpPromotor from "@/components/formulario/agregarPromotorProveedor";
import SignUpProveedor from "@/components/formulario/agregarProveedor";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const CrearProveedor = () => {
    const [error, setError] = useState<string | undefined>(undefined);
    const [rol, setRol] = useState<string | undefined>(undefined);
    const titulo = 'Portal proveedor';
    const validarPermisos = async () => {
        const token = localStorage.getItem('session');
        const response = await fetch('/api/usuarios/info',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          })
        if(!response.ok){
            const { error } = await response.json();
            console.log(error);
            return;
        }
        const { message }  = await response.json();
        if(message !== 'AuxMercadeo'){
            setError(`Esta pagina solo la pueden ver Auxiliares de mercadeo y tu rol es ${message}`)
            setRol(message.toLowerCase());
        }
    }
    useEffect(() => {
        validarPermisos();
    }, []);
    if (error) {
        return(
            <LayoutProfile titulo={"Supervisor"}>
                <div className="flex flex-col items-center justify-center mt-80">
                    <h1 className="text-5xl font-bold text-gray-700 dark:text-gray-200">Error</h1>
                    <p className="text-gray-700 text-xl dark:text-gray-200 pb-12 pt-6">{error}</p>
                    {rol === 'auxmercadeo' ? (
                      <Button>
                        <Link href={`/auxiliar-de-mercadeo`}>
                          Volver al portal {rol}
                        </Link>
                      </Button>
                        ) : 
                      <Button >
                        <Link href={`/${rol}`}>
                            {`Volver al portal ${rol}`}
                        </Link>
                      </Button>
                    }
                </div>
            </LayoutProfile>
        )
    }

    return(
        <LayoutProfile titulo={titulo}> 
            <h1 className="text-center pt-5 font-bold text-3xl">Esta creando un nuevo proveedor</h1>
            <SignUpProveedor />
        </LayoutProfile>
    )
}

export default CrearProveedor;