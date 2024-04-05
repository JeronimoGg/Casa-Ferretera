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
import Image from 'next/image'
export const CancelPromotorias   = ({ numero, nombreEmpresa, nombreProveedor,  sede, fecha, link}: {
    numero: string;
    nombreEmpresa: string;
    nombreProveedor: string;
    sede: string;
    fecha: string;
    link: string;
}) => {     
    return(
        <Card className="w-[350px] m-7">
           
            <CardHeader>
                <CardTitle>Promotoria # {numero}</CardTitle>
                <CardDescription>
                    <ul>
                        <li>Nombre empresa: {nombreEmpresa}</li>
                        <li>Nombre proveedor: {nombreProveedor}</li>
                        <li>Sede de la promotoria: {sede}</li>
                        <li>Fecha: {fecha}</li>
                    </ul>
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex flex-col items-center">
                <Button className="hover:bg-gray-200" variant="secondary">
                    <Link href={link}>Cancelar</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}  
