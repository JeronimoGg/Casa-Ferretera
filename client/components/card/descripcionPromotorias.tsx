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

export const DescripcionPromotoria = ({ numero, nombreEmpresa, nombreProveedor,  sede, fecha, hora, link}: {
    numero: string;
    nombreEmpresa: string;
    nombreProveedor: string;
    sede: string;
    fecha: string;
    hora: string;
    link: string;
}) => {     
    const handleClick = async () => {
        console.log(numero);
    }


    return(
        <Card  className="w-[400px] m-7">
            <CardHeader>
              <CardTitle className="underline text-3xl">Promotoria #{numero}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-xl my-6">
                    <strong>Nombre empresa:</strong> {nombreEmpresa}
                </p>
                <p className="text-xl mb-6">
                    <strong>Nombre proveedor:</strong> {nombreProveedor}
                </p>
                <p className="text-xl mb-6">
                    <strong>Sede de la promotoria:</strong> {sede}
                </p>
                <p className="text-xl mb-6">
                    <strong>Fecha:</strong> {fecha}
                </p>
                <p className="text-xl mb-6">
                    <strong>Hora:</strong> {hora}
                </p>
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                <Button className=" bg-gray-600 hover:bg-gray-500" variant="secondary">
                    <Link onClick={handleClick} className="text-white" href={link}>Agregar descripcion</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}  
