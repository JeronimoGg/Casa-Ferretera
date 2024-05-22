"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { useState, useEffect } from "react";
import { InfoPromotoria } from "@/components/card/infoPromotoria";

const RevisarAuxiliarDeMercadeoPage = () => {
  const titulo = "Auxiliar de Mercadeo";
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [rol, setRol] = useState<string | undefined>(undefined);

  const getPromotoriasActivas = async () => {
    const token = localStorage.getItem('session');
    try {
      const response = await fetch('/api/promotorias/activas-auxmercadeo',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if(!response.ok){
        const respuesta = await response.json();
        if(respuesta.message && respuesta.rol){
          setError(respuesta.message);
          setRol(respuesta.rol.toLowerCase());
        } else {
          setError(respuesta.message);
        }
      } else {
        const { promotorias } = await response.json();
        if(data.length === 0 && promotorias.length !== 0){
          
          setData(promotorias);
        }
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getPromotoriasActivas();
  }, []);

  return (
    <LayoutProfile titulo={titulo}>
      <div>
        <h2 className="text-center text-5xl font-bold mt-9">Revise las Promotorías</h2>
        <p className="text-center mt-8 text-xl">
          Revise las promotorías activas del dia
        </p>
      </div>
      <div className="flex flex-wrap justify-center mt-16 gap-4">
        {data.map((item) => (
          <InfoPromotoria 
            key={item.id_promotoria}
            numero={item.id_promotoria}
            nombreEmpresa={item.nombre_empresa}
            nombreProveedor={item.nombre_proveedor}
            sede={item.nombre_sede}
            fecha={item.fecha}
            hora={`${item.horaInicio}-${item.horaFinal}`}
          />
        ))}
      </div>
    </LayoutProfile>
  );
};

export default RevisarAuxiliarDeMercadeoPage;
