import LayoutProfile from "@/app/(landing)/layout";
import confirm from "@/public/confirm.svg";
import social from "@/public/social.svg"
import cancel from "@/public/cancel.svg"
import { Servicio } from "@/components/card/servicio";


const informes = () => {
  // El título se define aquí y se pasa a LayoutProfile
  const titulo = "Auxiliar de Mercadeo";

  return (
    <LayoutProfile titulo={titulo}>
      <div>
                <h2 className="text-center text-5xl font-bold mt-9">Generar Informes</h2>
                <p className="text-center mt-8 text-xl">Bienvenid@, seleccione el servicio que desea utilizar</p>
            </div>
            <div className="flex flex-row justify-center mt-16">
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
            </div>
    </LayoutProfile>
  );
};

export default informes;