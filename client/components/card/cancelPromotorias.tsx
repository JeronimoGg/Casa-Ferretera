"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CancelarAlerta } from "../alertas/cancelar";

export const CancelPromotorias   = ({ numero, nombreEmpresa, nombreProveedor,  sede, fecha, hora, descripcion, link}: {
    numero: string;
    nombreEmpresa: string;
    nombreProveedor: string;
    sede: string;
    fecha: string;
    hora: string;
    descripcion: string;
    link: string;
}) => {     
    const handleClick = async () => {
        console.log(numero);
    }


    return(
        <Card className="w-[400px] m-7">
           
            <CardHeader>
                <CardTitle className="underline text-3xl">Promotoria #{numero}</CardTitle>
                <CardDescription>
                    <ul>
                        <li className="text-xl my-6">Nombre empresa: {nombreEmpresa}</li>
                        <li className="text-xl mb-6">Nombre proveedor: {nombreProveedor}</li>
                        <li className="text-xl mb-6">Sede de la promotoria: {sede}</li>
                        <li className="text-xl mb-6">Fecha: {fecha}</li>
                        <li className="text-xl mb-6">Hora: {hora}</li>
                        <li className="text-xl mb-6">Descripcion: {descripcion}</li>
                    </ul>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-center">
                {/* <Button className="bg-red-500 hover:bg-red-600" variant="secondary">
                    <Link onClick={handleClick} className="text-white" href={link}>Cancelar</Link>
                </Button> */}
                <CancelarAlerta numero={numero}/>
            </CardFooter>
        </Card>
    )
}  
