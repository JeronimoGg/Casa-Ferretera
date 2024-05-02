import LayoutProfile from "@/app/(landing)/layout";
import calendar from "@/public/calendar.svg";
import svgReport from "@/public/report.svg";
import userEdit from "@/public/user-edit.svg";
import { Servicio } from "@/components/card/servicio";


const AuxiliarDeMercadeoPage = () => {
  // El título se define aquí y se pasa a LayoutProfile
  const titulo = "Auxiliar de Mercadeo";

  return (
    <LayoutProfile titulo={titulo}>
      <div>
        <h2 className="text-center text-5xl font-bold mt-9">Servicios</h2>
        <p className="text-center mt-8 text-xl">Bienvenid@, seleccione el servicio que desea utilizar</p>
      </div>
      <aside className="flex flex-row justify-center mt-16">
        <Servicio 
          titulo={"Revisar Promotorías"}
          descripcion={"Verifique el estado de las promotorías."}
          icon={calendar}
          boton={"Revisar"}
          link={"/auxiliar-de-mercadeo/revisar"}
        />
        <Servicio 
          titulo={"Administrar Usuarios"}
          descripcion={"Maneje los usuarios del sistema"}
          icon={userEdit}
          boton={"Administrar"}
          link={"/auxiliar-de-mercadeo/usuarios"}
        />
        <Servicio 
          titulo={"Generar Informes"}
          descripcion={"Genere informes de las promotorias"}
          icon={svgReport}
          boton={"Generar"}
          link={"/auxiliar-de-mercadeo/informes"}
        />
      </aside>
    </LayoutProfile>
  );
};

export default AuxiliarDeMercadeoPage;
