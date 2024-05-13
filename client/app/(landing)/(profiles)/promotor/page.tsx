"use client";
import LayoutProfile from "@/app/(landing)/layout";
import { Servicio } from "@/components/card/servicio";
import calendar from "@/public/calendar.svg";
import cancel from "@/public/cancel.svg";
import edit from "@/public/edit-button.svg";

const PromotorPage = () => {
    const titulo = "Promotor";

    return (
        <LayoutProfile titulo={titulo}>
            <div>
                <h2 className="text-center text-5xl font-bold mt-9">Servicios</h2>
                <p className="text-center mt-8 text-xl">Bienvenid@, seleccione el servicio que desea utilizar</p>
            </div>
            <div className="flex flex-row justify-center mt-16">
                <Servicio 
                    titulo={"Revisar Promotorias"}
                    descripcion={"Revisa tus promotorias agendadas"}
                    icon={calendar}
                    boton={"Revisar"}
                    link={"/promotor/promotorias"}
                />
                <Servicio 
                    titulo={"Agregue una descripcion"}
                    descripcion={"Agregue una breve descripcion de que sera la promotoria"}
                    icon={edit}
                    boton={"Agregar"}
                    link={"/promotor/descripcion"}
                />
                <Servicio 
                    titulo={"Cancelar Promotoria"}
                    descripcion={"Cancele una promotoria"}
                    icon={cancel}
                    boton={"Cancelar"}
                    link={"/promotor/cancelar"}
                />
            </div>
        </LayoutProfile>
    )
}

export default PromotorPage;