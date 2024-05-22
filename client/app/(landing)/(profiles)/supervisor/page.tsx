"use client"
import LayoutProfile from "../../layout";
import { Servicio } from "@/components/card/servicio";
import cancel from "@/public/cancel.svg";
import review from "@/public/review.svg";
const SupervisorPage = () => {

    const titulo = "Supervisor";

    return (
        <LayoutProfile titulo={titulo}>
            <div>
                <h2 className="text-center text-5xl font-bold mt-9">Servicios</h2>
                <p className="text-center mt-8 text-xl">Bienvenid@, seleccione el servicio que desea utilizar</p>
            </div>
            <div className="flex flex-row justify-center mt-16">
                <Servicio 
                    titulo={"Rechazar Promotorías"}
                    descripcion={"Módulo para rechazar promotorías activas."}
                    icon={cancel}
                    boton={"Entrar"}
                    link={"/supervisor/rechazar"}
                />
                <Servicio 
                    titulo={"Crear Reseña sobre Promotor"}
                    descripcion={"Cree una reseña de una promotoría ya realizada."}
                    icon={review}
                    boton={"Crear"}
                    link={"/supervisor/calificacion"}
                />
            </div>
        </LayoutProfile>
    )
}

export default SupervisorPage;