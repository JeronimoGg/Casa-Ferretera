"use client";
import LayoutProfile from "@/app/(landing)/layout";
import FormularioDescripcion from "@/components/formulario/agregarDescripcion";



const AgregarDescripcion = ({ params }: 
    { params: { id: number } 
}) => {
    const titulo = "Agregar descripcion";

    return(
        <LayoutProfile titulo={titulo}> 
            <h1 className="text-center pt-5 font-bold text-3xl">Esta agregando la descripcion a esta promotoria </h1>
            <FormularioDescripcion id={params.id}/>
        </LayoutProfile>
    )
}

export default AgregarDescripcion;