"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { useState, useEffect } from "react";
import { DescripcionPromotoria } from "@/components/card/descripcionPromotorias";

const PromotoriasSinDescripcion = () => {
    const titulo = 'Portal Promotor';
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [rol, setRol] = useState<string | undefined>(undefined);
    const getPromotoriasSinDescripcion = async () => {
        const token = localStorage.getItem('session');
        try {
            const response = await fetch('/api/promotorias/sin-descripcion',{
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
            if(response.status === 204){
                console.log('no hay promotorias sin descripcion');
                return
            }
            const { promotorias } = await response.json();
            
            if (promotorias.length === 0) {
                console.log('No hay promotorias sin descripción');
            } else {
                setData(promotorias);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPromotoriasSinDescripcion();
    }, []);
    
    
    return(
        <LayoutProfile titulo={titulo}>
            <div>
                <h2 className="text-center text-5xl font-bold mt-9">Promotorias sin descripcion</h2>          
            </div>
            <div className="flex flex-row justify-center mt-16">
                {data.map((item) => (
                    <DescripcionPromotoria 
                        key={item.id_promotoria}
                        numero={item.id_promotoria}
                        nombreEmpresa={item.nombre_empresa}
                        nombreProveedor={item.nombre_proveedor}
                        sede={item.nombre_sede}
                        fecha={item.fecha}
                        hora={`${item.horaInicio}-${item.horaFinal}`}
                        link={`/promotor/descripcion/${item.id_promotoria}`}
                    />
                ))}
            </div>
        </LayoutProfile>
    )
}

export default PromotoriasSinDescripcion;