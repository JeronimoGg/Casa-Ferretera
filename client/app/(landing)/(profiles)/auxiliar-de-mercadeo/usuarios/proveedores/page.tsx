"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import editIcon from '@/public/edit-button.svg';
import trashCan from '@/public/trash-can.svg';

const manageProveedores = () => {
    const titulo = "Lista proveedores";
    const [data, setData] = useState<any[]>([]);
    const [error, setError] = useState<string | undefined>(undefined);
    const [rol, setRol] = useState<string | undefined>(undefined);

    const getProveedores = async () => {
        try {
            const token = localStorage.getItem('session');
            const response = await fetch("/api/usuarios/proveedores", {
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
            const { proveedores } = await response.json();
            if(data.length === 0){
                setData(proveedores);
              } 
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getProveedores();
    }, []);

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
            <div className="max-w-screen-lg mx-auto mt-12">
            <div className="mb-8">
                <Button>
                    <Link href="proveedores/agregar-proveedor">Agregar proveedor</Link>
                </Button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-center text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 w-1/7"> ID </th>
                            <th scope="col" className="px-6 py-3 w-1/7"> Nombre </th>
                            <th scope="col" className="px-6 py-3 w-1/7"> Correo </th>
                            <th scope="col" className="px-6 py-3 w-1/7"> Empresa </th>
                            <th scope="col" className="px-6 py-3 w-1/7"> Editar </th>
                            <th scope="col" className="px-6 py-3 w-1/7"> Eliminar </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((usuario, index) => (
                            <tr key={usuario.id_proveedor} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900">{usuario.id_proveedor}</th>
                                <td className="px-6 py-4 text-gray-800">{usuario.nombre}</td>
                                <td className="px-6 py-4 text-gray-800">{usuario.correo}</td>
                                <td className="px-6 py-4 text-gray-800">{usuario.empresa}</td>
                                <td className="px-6 py-4 text-gray-800">
                                    <div className="flex justify-center">
                                        <Link href={`/auxiliar-de-mercadeo/usuarios/proveedores/${usuario.id_proveedor}`}>
                                            <Image src={editIcon} alt="boton editar" width={25} height={25} />
                                        </Link>
                                    </div>    
                                </td>
                                <td className="px-6 py-4 text-gray-800">
                                    <div className="flex justify-center">
                                        <Link href="#">
                                            <Image src={trashCan} alt="boton borrar" width={25} height={25} />
                                        </Link>
                                    </div> 
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            </div>
        </LayoutProfile>
    )
    
}

export default manageProveedores;