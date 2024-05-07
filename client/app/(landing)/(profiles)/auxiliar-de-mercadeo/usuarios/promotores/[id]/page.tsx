"use client";
import LayoutProfile from "@/app/(landing)/layout";
import FormularioProv from "@/components/formulario/editarPromotor";
import { useEffect, useState } from "react";






const editarPromotor = ({ params }: 
    { params: { id: number } 
}) => {
    const [data, setData] = useState<any>({});
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
                const { error } = await response.json();
                console.log(error);
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
    
    return(
        <LayoutProfile titulo={titulo}> 
            <h1 className="text-center pt-5 font-bold text-3xl">Esta editando La informacion del promotor { initialValues.nombre }</h1>
            {Object.keys(data).length > 0 && <FormularioProv initialValues={initialValues} id={data.id_promotor} />}
        </LayoutProfile>
    )
}

export default editarPromotor;