import LayoutProfile from "../../layout";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from 'next/image';
import calendar from "@/public/calendar.svg";
import cancel from "@/public/cancel.svg";
import { Servicio } from "@/components/card/servicio";

const ProveedorPage = () => {
    const titulo = "Proveedor";
    return (
        <LayoutProfile titulo={titulo}>
            <div>
                <h2 className="text-center text-5xl font-bold mt-9">Servicios</h2>
                <p className="text-center mt-8 text-xl">Bienvenid@, seleccione el servicio que desea utilizar</p>
            </div>
            <div className="flex flex-row justify-center mt-16">
                <Servicio 
                    titulo={"Agendar Promotoria"}
                    descripcion={"Agende una promotoria"}
                    icon={calendar}
                    boton={"Agendar"}
                />
                <Servicio 
                    titulo={"Cancelar Promotoria"}
                    descripcion={"Cancele una promotoria"}
                    icon={cancel}
                    boton={"Cancelar"}
                />
            </div>
        </LayoutProfile>
    )
}

export default ProveedorPage;