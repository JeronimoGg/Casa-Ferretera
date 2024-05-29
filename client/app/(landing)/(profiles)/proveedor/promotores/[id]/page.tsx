"use client";
import LayoutProfile from "@/app/(landing)/layout";
import FormularioProv from "@/components/formulario/editarPromotor";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const editarPromotor = ({ params }: 
    { params: { id: number } 
}) => {
    const [data, setData] = useState<any>({})
    const [error, setError] = useState<string | undefined>(undefined);
    const [rol, setRol] = useState<string | undefined>(undefined);
    const titulo = "Editar promotor";
    const getInfoPromotor = async (id: number) => {
        try {
            const token = localStorage.getItem('session');
            const response = await fetch(`/api/usuarios/promotores/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                const respuesta = await response.json();
                setError(respuesta.message);
                setRol(respuesta.rol.toLowerCase());
                return;
            }
            const { informacion } = await response.json();
        
            if(Object.keys(data).length === 0){        
                setData(informacion);
              } 
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        getInfoPromotor(params.id);
    }, [params.id]);

    const initialValues = {
        nombre: data.nombre,
        correo: data.correo,
        calificacion: data.calificacion
    }
    
    if (error) {
        return(
            <LayoutProfile titulo={titulo}>
                
                    <div className="flex flex-col items-center justify-center mt-80">
                        <h1 className="text-5xl font-bold text-gray-700 dark:text-gray-200">Error</h1>
                        <p className="text-gray-700 text-xl dark:text-gray-200 pb-12 pt-6">{error}</p>
                        <Button >
                            <Link href={`/${rol}`}>
                                {`Volver al portal ${rol}`}
                            </Link>
                        </Button>
                    </div>
                
            </LayoutProfile>
        )
    }

    return(
        <LayoutProfile titulo={titulo}> 
            <h1 className="text-center pt-5 font-bold text-3xl">Esta editando La informacion del promotor { initialValues.nombre }</h1>
            {Object.keys(data).length > 0 && <FormularioProv initialValues={initialValues} id={data.id_promotor} />}
        </LayoutProfile>
    )
}

export default editarPromotor;