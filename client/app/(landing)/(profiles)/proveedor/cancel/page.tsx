"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { CancelPromotorias }  from "@/components/card/cancelPromotorias";
import { useEffect, useState } from "react";


const AuxiliarDeMercadeoPage = () => {
     const [data, setData] = useState<any[]>([]); 
    
    const titulo = "Cancelar Promotorias";
    const getPromotorias = async () => {
      try {
        const token = localStorage.getItem('session');
        const response = await fetch('/api/promotorias/proveedor',{
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
              {/* <div className="flex flex-row justify-center mt-16">
                  <CancelPromotorias 
                      numero={"1"}
                      nombreEmpresa={"empresa 1"}
                      nombreProveedor={"juanito 123"}
                      sede={"palace"}
                      fecha={"01-02-2002"}
                      link={"/proveedor/formulario"}
                  />
              </div> */}
              <div className="flex flex-row justify-center mt-16">
              {data.map((item) => (
                  <CancelPromotorias 
                      numero={item.id_promotoria}
                      nombreEmpresa={item.nombre_empresa}
                      nombreProveedor={item.nombre_proveedor}
                      sede={item.nombre_sede}
                      fecha={item.fecha}
                      hora={`${item.horaInicio}-${item.horaFinal}`}
                      descripcion={item.descripcion}
                      link={"/proveedor/formulario"}
                  />
              ))}
                </div>
      </LayoutProfile>
    );
  };
  
  export default AuxiliarDeMercadeoPage;