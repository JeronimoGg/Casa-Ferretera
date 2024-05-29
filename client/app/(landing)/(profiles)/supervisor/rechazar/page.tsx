"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { RechazarPromotoria }  from "@/components/card/rechazarPromotoria";
import { useEffect, useState } from "react";


const RechazarPromotorias = () => {
     const [data, setData] = useState<any[]>([]); 
    
    const titulo = "Rechazar Promotorias";
    const getPromotorias = async () => {
      try {
        const token = localStorage.getItem('session');
        const response = await fetch('/api/promotorias/rechazar-supervisor',{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if(!response.ok){
          const { error } = await response.json();
          console.log(error);
          return;
        }
        const { promotorias } = await response.json();
        if(data.length === 0){
          setData(promotorias);
        } 
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    }   
    useEffect(() => {
      getPromotorias(); 
    }, []);
  
    return (
      <LayoutProfile titulo={titulo}>
        <div>
          <h2 className="text-center text-5xl font-bold mt-9">Promotorias</h2>          
        </div>
              
        <div className="flex flex-wrap justify-center mt-16 gap-4">
            {data.length === 0 ? (
                <p className="text-3xl">No hay promotorias para cancelar</p>
            ) : (
                data.map((item) => (
                    <RechazarPromotoria 
                        key={item.id_promotoria}
                        numero={item.id_promotoria}
                        nombreEmpresa={item.nombre_empresa}
                        nombreProveedor={item.nombre_proveedor}
                        sede={item.nombre_sede}
                        fecha={item.fecha}
                        hora={`${item.horaInicio}-${item.horaFinal}`}
                        descripcion={item.descripcion}
                        link={"#"}
                    />
                ))
            )}
        </div>
      </LayoutProfile>
    );
  };
  
  export default RechazarPromotorias;