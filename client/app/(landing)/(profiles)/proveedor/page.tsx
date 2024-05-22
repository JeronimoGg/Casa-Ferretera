"use client";
import LayoutProfile from "../../layout";
import calendar from "@/public/calendar.svg";
import cancel from "@/public/cancel.svg";
import user from "@/public/social.svg";
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
                    link={"/proveedor/formulario"}
                />
                <Servicio 
                    titulo={"Cancelar Promotoria"}
                    descripcion={"Cancele una promotoria"}
                    icon={cancel}
                    boton={"Cancelar"}
                    link={"/proveedor/cancel"}
                />
                <Servicio 
                    titulo={"Administrar promotores"}
                    descripcion={"Cree, edite o elimine sus promotores"}
                    icon={user}
                    boton={"promotres"}
                    link={"/proveedor/promotores"}
                />
            </div>
        </LayoutProfile>
    )
}

export default ProveedorPage;
