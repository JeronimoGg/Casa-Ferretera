"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CalificarPromotorForm from "@/components/formulario/calificarPromotor";

const CalificarPromotor = () => {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [rol, setRol] = useState<string | undefined>(undefined);
  const getPromotores = async () => {
    try {
        const token = localStorage.getItem('session');
        const response = await fetch("/api/usuarios/promotores-sede", {
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
        if(data.length === 0){
          setData(promotores);
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
    return (
      <LayoutProfile titulo="Supervisor">
        <CalificarPromotorForm nombres={data}/>
      </LayoutProfile>
    );
};

export default CalificarPromotor;
