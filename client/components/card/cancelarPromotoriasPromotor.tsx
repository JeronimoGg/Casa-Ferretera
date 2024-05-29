"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CancelarAlertaPromotor } from "../alertas/cancelarPromotor";

export const CancelPromotoriasPromotor   = ({ numero, nombreEmpresa, nombreProveedor,  sede, fecha, hora, descripcion, link}: {
    numero: string;
    nombreEmpresa: string;
    nombreProveedor: string;
    sede: string;
    fecha: string;
    hora: string;
    descripcion: string;
    link: string;
}) => {     
    


    return(
        <Card className="w-[400px] m-7">
           
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
                <p className="text-xl mb-6">
                    <strong>Descripcion:</strong> {descripcion}
                </p>     
            </CardContent>
            <CardFooter className="flex flex-col items-center">
                {/* <Button className="bg-red-500 hover:bg-red-600" variant="secondary">
                    <Link onClick={handleClick} className="text-white" href={link}>Cancelar</Link>
                </Button> */}
                <CancelarAlertaPromotor numero={numero}/>
            </CardFooter>
        </Card>
    )
}  
