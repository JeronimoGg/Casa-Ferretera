"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export const InfoPromotoria = ({ numero, nombreEmpresa, nombreProveedor,  sede, fecha, hora}: {
    numero: string;
    nombreEmpresa: string;
    nombreProveedor: string;
    sede: string;
    fecha: string;
    hora: string;
}) => {     

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
        </Card>
    )
}  
