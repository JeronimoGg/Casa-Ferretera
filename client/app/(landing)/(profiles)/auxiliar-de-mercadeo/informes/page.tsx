"use client";
import LayoutProfile from "@/app/(landing)/layout";
import confirm from "@/public/confirm.svg";
import social from "@/public/social.svg"
import cancel from "@/public/cancel.svg"
import { Servicio } from "@/components/card/servicio";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Informes = () => {
  const router = useRouter();
  const titulo = "Auxiliar de Mercadeo";

  const handleVolver = () => {
    router.back();
  };

  return (
    <LayoutProfile titulo={titulo}>
      {/* <div>
        <h2 className="text-center text-5xl font-bold mt-9">Generar Informes</h2>
        <p className="text-center mt-8 text-xl">Seleccione el tipo de informe que desea generar.</p>
      </div>
          <aside className="flex flex-row justify-center mt-16">
            <Servicio 
              titulo={"Promotorias realizadas"}
              descripcion={"Generar un informe de las promotorias realizadas"}
              icon={confirm}
              boton={"Generar"}
              link={""}
            />
            <Servicio 
              titulo={"Promotorias Activas"}
              descripcion={"Genere informes de las promotorias activas"}
              icon={social}
              boton={"Generar"}
              link={""}
            />
            <Servicio 
              titulo={"Promotorias Canceladas"}
              descripcion={"Genere informes de las promotorias canceladas"}
              icon={cancel}
              boton={"Generar"}
              link={""}
            />
          </aside> */}
          <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
            <h1 className="text-4xl font-bold mb-4">Esta función está en desarrollo</h1>
            <Button onClick={handleVolver}>
              Volver
            </Button>
          </div>
    </LayoutProfile>
  );
};

export default Informes;