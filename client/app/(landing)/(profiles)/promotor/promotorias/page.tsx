"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { useState, useEffect } from "react";
import { InfoPromotoria } from "@/components/card/infoPromotoria";

const PromotoriasActivas = () => {
    const titulo = 'Promotorias activas';
    const [data, setData] = useState<any[]>([]);
    const getPromotorias = async () => {
        const token = localStorage.getItem('session');
        try {
            const response = await fetch('/api/promotorias/promotor',{
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
            const { promotorias } = await response.json();
            console.log(promotorias);
            if(data.length === 0){
                setData(promotorias);
              }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getPromotorias();
    }, []);
    return(
        <LayoutProfile titulo={titulo}>
            <div>
                <h2 className="text-center text-5xl font-bold mt-9">Estan son tus promotorias programadas</h2>          
            </div>
            <div className="flex flex-row justify-center mt-16">
                {data.length === 0 ? (
                    <p className="text-3xl">No Tienes promotorias activas</p>
                ) : (
                    data.map((item) => (
                        <InfoPromotoria 
                            key={item.id_promotoria}
                            numero={item.id_promotoria}
                            nombreEmpresa={item.nombre_empresa}
                            nombreProveedor={item.nombre_proveedor}
                            sede={item.nombre_sede}
                            fecha={item.fecha}
                            hora={`${item.horaInicio}-${item.horaFinal}`}
                        />
                    ))
                )}
            </div>
        </LayoutProfile>
    )
}

export default PromotoriasActivas;