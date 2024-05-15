"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { useEffect, useState } from "react";
import FormularioProv from "@/components/formulario/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormularioAgendar from "@/components/formulario/testForm";

const FormularioProveedor = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [rol, setRol] = useState<string | undefined>(undefined);
  const getPromotores = async () => {
    try {
        const token = localStorage.getItem('session');
        const response = await fetch("/api/usuarios/promotores-asignados", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            const respuesta = await response.json();
            if(respuesta.message && respuesta.rol){
              setError(respuesta.message);
              setRol(respuesta.rol.toLowerCase());
            } else {
              setError(respuesta);
            }
            return;
        }
        const { promotores } = await response.json();
        const nombres = promotores.map((objeto: any) => objeto.nombre);
        if(data.length === 0){
          setData(nombres);
        } 
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(() => {
      getPromotores();
  }, []);

  if (error && rol) {
    return(
        <LayoutProfile titulo={"Proveedor"}>
            
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



    return (
      <LayoutProfile titulo="Proveedor">
        {/* <FormularioProv /> */}
        {data.length > 0 && <FormularioAgendar nombres={data}/>}
      </LayoutProfile>
    );
};

export default FormularioProveedor;
